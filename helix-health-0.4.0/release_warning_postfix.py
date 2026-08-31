#!/usr/bin/env python3
from pathlib import Path
import shutil

ROOT = Path('/tmp/helix/helix-health-bridge')
WEAR_RES = ROOT / 'wear/src/main/res'
MANIFEST = ROOT / 'wear/src/main/AndroidManifest.xml'


def read(path: Path) -> str:
    return path.read_text(encoding='utf-8')


def write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding='utf-8')


# minSdk is 30: adaptive icon resources do not need a v26 qualifier.
legacy_anydpi = WEAR_RES / 'mipmap-anydpi-v26'
anydpi = WEAR_RES / 'mipmap-anydpi'
if legacy_anydpi.exists():
    shutil.copytree(legacy_anydpi, anydpi, dirs_exist_ok=True)
    shutil.rmtree(legacy_anydpi)

# Android 13+ themed icon mask. Keep this intentionally simple and single-color.
write(WEAR_RES / 'drawable/ic_launcher_monochrome.xml', '''<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="108dp"
    android:height="108dp"
    android:viewportWidth="108"
    android:viewportHeight="108">
    <path
        android:fillColor="#FFFFFFFF"
        android:pathData="M54,82s-31,-19.3 -41.3,-35.8C4.1,32.3 10.2,13.3 27.3,9.1 36.9,6.8 45.2,11.1 54,20c8.8,-8.9 17.1,-13.2 26.7,-10.9 17.1,4.2 23.2,23.2 14.6,37.1C85,62.7 54,82 54,82z" />
</vector>
''')

for name in ('ic_launcher.xml', 'ic_launcher_round.xml'):
    path = anydpi / name
    text = read(path)
    if '<monochrome ' not in text:
        text = text.replace(
            '    <foreground android:drawable="@drawable/ic_launcher_foreground" />\n',
            '    <foreground android:drawable="@drawable/ic_launcher_foreground" />\n'
            '    <monochrome android:drawable="@drawable/ic_launcher_monochrome" />\n'
        )
    write(path, text)

# API 30 still knows the legacy backup attribute; explicitly disable it as well.
manifest = read(MANIFEST)
if 'android:fullBackupContent=' not in manifest:
    manifest = manifest.replace(
        '        android:dataExtractionRules="@xml/data_extraction_rules"\n',
        '        android:dataExtractionRules="@xml/data_extraction_rules"\n'
        '        android:fullBackupContent="false"\n'
    )
write(MANIFEST, manifest)

assert not legacy_anydpi.exists()
assert (anydpi / 'ic_launcher.xml').exists()
assert '<monochrome android:drawable="@drawable/ic_launcher_monochrome" />' in read(anydpi / 'ic_launcher.xml')
assert '<monochrome android:drawable="@drawable/ic_launcher_monochrome" />' in read(anydpi / 'ic_launcher_round.xml')
assert 'android:fullBackupContent="false"' in read(MANIFEST)
print('HELIX_RELEASE_WARNING_POSTFIX=PASS')
