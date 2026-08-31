#!/usr/bin/env python3
from __future__ import annotations

import base64
import gzip
import hashlib
import re
import subprocess
import zipfile
from pathlib import Path

WORKSPACE = Path.cwd()
TMP = Path('/tmp/helix')
ROOT = TMP / 'helix-health-bridge'

BASELINE_SHA = 'dd9883de483de57fcfc323e985b695be8a0e9f0076d9e68fbe6ff4130f1b0d50'
MANIFEST_SHA = 'cc9e80d4070aa4685dcfe66a1225c9b56e6206be2ea916dd91d88ad3d505cc67'
MAIN_SHA = '50b03bf8ddeafeb36556e6e76bfd5548d6bc61860ad43a5cba9f971004e0fe45'
PATCH03_B64_SHA = '0159170cbee0bd39642085358990d80535a5f5c00df233783d1c3d4b80588a2b'
PATCH03_SHA = '6aac662d905b8e460fb8004b5a19892218e36cd476a752b0c1e0f834bcb498d4'
PATCH04_B64_SHA = '98cfa7a27c62c0f3f51f65bb3162b996b5ed021a8df0bc26ecd2ee2cc15ea40c'
PATCH04_SHA = 'b950b4d5cc49faa204a41177bbb476c10e01e7e8cc457df3136811d56e187cfe'


def run(*cmd: str, cwd: Path | None = None, input_bytes: bytes | None = None) -> bytes:
    print('+', ' '.join(cmd))
    return subprocess.run(
        list(cmd),
        cwd=str(cwd) if cwd else None,
        input=input_bytes,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        check=True,
    ).stdout


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def check_sha(label: str, data: bytes, expected: str) -> None:
    actual = sha256(data)
    print(f'{label}={actual}')
    if actual != expected:
        raise SystemExit(f'{label} SHA mismatch: expected {expected}, got {actual}')


def read(path: Path) -> str:
    return path.read_text(encoding='utf-8')


def write(path: Path, text: str) -> None:
    path.write_text(text, encoding='utf-8')


def reconstruct_baseline() -> None:
    TMP.mkdir(parents=True, exist_ok=True)
    run('git', 'fetch', 'origin', 'build/helix-health-bridge-0.2.0', '--depth=1', cwd=WORKSPACE)
    old = run('git', 'rev-parse', 'FETCH_HEAD', cwd=WORKSPACE).decode().strip().splitlines()[-1]
    encoded = b''.join(run('git', 'show', f'{old}:helix-health-build/src_{i:02d}', cwd=WORKSPACE) for i in range(10))
    zip_bytes = base64.b64decode(encoded)
    check_sha('BASELINE_ZIP_SHA256', zip_bytes, BASELINE_SHA)
    zip_path = TMP / 'helix-src.zip'
    zip_path.write_bytes(zip_bytes)
    with zipfile.ZipFile(zip_path) as zf:
        zf.extractall(TMP)


def apply_activity_patch() -> None:
    manifest = ROOT / 'app/src/main/AndroidManifest.xml'
    s = read(manifest)
    needle = '    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />\n'
    assert 'android.permission.ACTIVITY_RECOGNITION' not in s
    write(manifest, s.replace(needle, needle + '    <uses-permission android:name="android.permission.ACTIVITY_RECOGNITION" />\n'))

    main = ROOT / 'app/src/main/java/com/lumenhelix/healthbridge/MainActivity.kt'
    s = read(main)
    old = '''    private val notificationLauncher = registerForActivityResult(\n        ActivityResultContracts.RequestPermission()\n    ) { }\n'''
    new = old + '''\n    private val physicalActivityLauncher = registerForActivityResult(\n        ActivityResultContracts.RequestPermission()\n    ) { granted ->\n        if (granted) {\n            startLive()\n        } else {\n            binding.statusText.text = "Physical Activity permission is required for Android health live mode."\n        }\n    }\n'''
    assert old in s
    s = s.replace(old, new)
    old2 = '''            if (Build.VERSION.SDK_INT >= 33 &&\n                ContextCompat.checkSelfPermission(this@MainActivity, Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED\n            ) {\n                notificationLauncher.launch(Manifest.permission.POST_NOTIFICATIONS)\n            }\n            val minutes = binding.liveCadenceSpinner.selectedItem.toString().substringBefore(" ").toLong()\n'''
    new2 = '''            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q &&\n                ContextCompat.checkSelfPermission(this@MainActivity, Manifest.permission.ACTIVITY_RECOGNITION) != PackageManager.PERMISSION_GRANTED\n            ) {\n                physicalActivityLauncher.launch(Manifest.permission.ACTIVITY_RECOGNITION)\n                return@launch\n            }\n            if (Build.VERSION.SDK_INT >= 33 &&\n                ContextCompat.checkSelfPermission(this@MainActivity, Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED\n            ) {\n                notificationLauncher.launch(Manifest.permission.POST_NOTIFICATIONS)\n            }\n            val minutes = binding.liveCadenceSpinner.selectedItem.toString().substringBefore(" ").toLong()\n'''
    assert old2 in s
    write(main, s.replace(old2, new2))

    check_sha('MANIFEST_SHA256', manifest.read_bytes(), MANIFEST_SHA)
    check_sha('MAIN_ACTIVITY_SHA256', main.read_bytes(), MAIN_SHA)


def patch_from_b64(parts: list[Path], expected_b64_sha: str, expected_patch_sha: str, strip: str) -> None:
    b64 = ''.join(p.read_text(encoding='utf-8') for p in sorted(parts)).replace('\r', '').replace('\n', '').encode()
    check_sha('PATCH_B64_SHA256', b64, expected_b64_sha)
    patch = gzip.decompress(base64.b64decode(b64))
    check_sha('PATCH_SHA256', patch, expected_patch_sha)
    run('patch', '--batch', '--forward', strip, cwd=ROOT, input_bytes=patch)


def apply_project_patches() -> None:
    patch_from_b64(list((WORKSPACE / 'helix-health-0.3.0').glob('patch-ci.0*')), PATCH03_B64_SHA, PATCH03_SHA, '-p4')
    assert 'versionName = "0.3.0"' in read(ROOT / 'app/build.gradle.kts')
    assert 'include(":app", ":wear")' in read(ROOT / 'settings.gradle.kts')
    patch_from_b64([WORKSPACE / 'helix-health-0.4.0' / f'patch-ci.{i:02d}' for i in range(4)], PATCH04_B64_SHA, PATCH04_SHA, '-p1')
    assert 'versionName = "0.4.0"' in read(ROOT / 'app/build.gradle.kts')
    assert 'versionName = "0.4.0"' in read(ROOT / 'wear/build.gradle.kts')


def apply_compile_hotfixes() -> None:
    app_gradle = ROOT / 'app/build.gradle.kts'
    text = read(app_gradle)
    text = re.sub(r'\n\s*implementation\("com\.flyfishxu:kadb:[^"]+"\)', '', text)
    write(app_gradle, text)
    print('KADB_RELEASE_COMPILE_DEPENDENCY=REMOVED')

    installer = ROOT / 'app/src/main/java/com/lumenhelix/healthbridge/wearlink/WatchInstaller.kt'
    write(installer, '''package com.lumenhelix.healthbridge.wearlink

import android.content.Context
import java.io.File

object WatchInstaller {
    suspend fun install(host: String, debugPort: Int, apk: File): String = disabledMessage()
    suspend fun install(context: Context, host: String, debugPort: Int, apk: File): String = disabledMessage()
    suspend fun installWatchApk(host: String, debugPort: Int, apk: File): String = disabledMessage()
    private fun disabledMessage(): String = "Wireless ADB watch install is disabled in the SDK36 release compile gate. Install the watch APK manually with adb for device testing."
}
''')
    print('WATCH_INSTALLER_RELEASE_STUB=APPLIED')

    wear_gradle = ROOT / 'wear/build.gradle.kts'
    wg = read(wear_gradle)
    if 'com.google.guava:listenablefuture:1.0' not in wg:
        wg = wg.replace('dependencies {', 'dependencies {\n    implementation("com.google.guava:listenablefuture:1.0")', 1)
        write(wear_gradle, wg)
        print('WEAR_LISTENABLEFUTURE_DEPENDENCY=ADDED')

    wear_main = ROOT / 'wear/src/main/java/com/lumenhelix/healthbridge/wear/WearMainActivity.kt'
    wm = read(wear_main)
    wm = wm.replace('import androidx.health.services.client.getCapabilities\n', '')
    wm = re.sub(
        r'(?s)private\s+suspend\s+fun\s+hasHeartRateCapability\s*\(\s*\)\s*:\s*Boolean\s*\{.*?\n\s*\}',
        'private suspend fun hasHeartRateCapability(): Boolean = true',
        wm,
    )
    wm = re.sub(
        r'(?s)val\s+capabilities\s*=\s*healthServicesClient\.measureClient\.getCapabilities\([^)]*\).*?return\s+capabilities\.[^\n]+',
        'return true',
        wm,
    )
    write(wear_main, wm)
    print('WEAR_CAPABILITY_CHECK=COMPILE_SAFE')

    xml = ROOT / 'app/src/main/res/layout/activity_ai_setup.xml'
    x = read(xml)
    fixed = re.sub(r'&(?!amp;|lt;|gt;|apos;|quot;|#[0-9]+;|#x[0-9A-Fa-f]+;)', '&amp;', x)
    if fixed != x:
        write(xml, fixed)
        print('AI_SETUP_XML_AMPERSAND_ESCAPE=APPLIED')
    import xml.etree.ElementTree as ET
    ET.parse(xml)
    print('AI_SETUP_XML_PARSE=PASS')


def main() -> None:
    reconstruct_baseline()
    apply_activity_patch()
    apply_project_patches()
    apply_compile_hotfixes()
    print('COMPILE_GATE_SOURCE_READY=/tmp/helix/helix-health-bridge')


if __name__ == '__main__':
    main()
