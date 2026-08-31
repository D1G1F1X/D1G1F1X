#!/usr/bin/env python3
from pathlib import Path
import shutil

ROOT = Path('/tmp/helix/helix-health-bridge')
APP_RES = ROOT / 'app/src/main/res'
WEAR_RES = ROOT / 'wear/src/main/res'


def read(path: Path) -> str:
    return path.read_text(encoding='utf-8')


def write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding='utf-8')


# Reuse the already-audited HELIX launcher artwork on Wear OS.
for dirname in ('mipmap-anydpi-v26', 'mipmap-mdpi', 'mipmap-hdpi', 'mipmap-xhdpi', 'mipmap-xxhdpi', 'mipmap-xxxhdpi'):
    src = APP_RES / dirname
    if src.exists():
        shutil.copytree(src, WEAR_RES / dirname, dirs_exist_ok=True)
for rel in ('drawable/ic_launcher_foreground.xml', 'values/ic_launcher_background.xml'):
    src = APP_RES / rel
    if src.exists():
        dst = WEAR_RES / rel
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dst)

# Explicit backup/transfer rules: health bridge state is not migrated from the watch.
write(WEAR_RES / 'xml/data_extraction_rules.xml', '''<?xml version="1.0" encoding="utf-8"?>
<data-extraction-rules>
    <cloud-backup>
        <exclude domain="root" path="." />
        <exclude domain="file" path="." />
        <exclude domain="database" path="." />
        <exclude domain="sharedpref" path="." />
        <exclude domain="external" path="." />
    </cloud-backup>
    <device-transfer>
        <exclude domain="root" path="." />
        <exclude domain="file" path="." />
        <exclude domain="database" path="." />
        <exclude domain="sharedpref" path="." />
        <exclude domain="external" path="." />
    </device-transfer>
</data-extraction-rules>
''')

manifest = ROOT / 'wear/src/main/AndroidManifest.xml'
ms = read(manifest)
ms = ms.replace('''    <application
        android:allowBackup="false"
        android:label="HELIX Health"
        android:theme="@style/Theme.HELIXWear">''', '''    <application
        android:allowBackup="false"
        android:dataExtractionRules="@xml/data_extraction_rules"
        android:icon="@mipmap/ic_launcher"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:label="@string/app_name"
        android:theme="@style/Theme.HELIXWear">''')
ms = ms.replace('''        <activity
            android:name=".WearMainActivity"
            android:exported="true">''', '''        <activity
            android:name=".WearMainActivity"
            android:exported="true"
            android:taskAffinity="">''')
write(manifest, ms)

write(WEAR_RES / 'values/strings.xml', '''<resources>
    <string name="app_name">HELIX Health</string>
    <string name="brand_title">HELIX</string>
    <string name="watch_subtitle">Watch4 Live</string>
    <string name="heart_rate_placeholder">— bpm</string>
    <string name="heart_rate_format">%1$d bpm</string>
    <string name="status_checking_sensors">Checking sensors…</string>
    <string name="action_start_live">Start live telemetry</string>
    <string name="action_stop_live">Stop live telemetry</string>
    <string name="action_test_phone_link">Test phone link</string>
    <string name="live_mode_note">Foreground live HR • background passive HR • Samsung raw-sensor adapter follows in Lab mode</string>
    <string name="status_permission_required">Heart sensor permission required</string>
    <string name="status_sensor_format">Heart sensor: %1$s</string>
    <string name="status_live_linked">Live • linked to phone</string>
    <string name="status_live_connected">Live heart sensor connected</string>
    <string name="status_sensor_error_format">Sensor error: %1$s</string>
    <string name="status_capability_unavailable">Heart-rate capability not available</string>
    <string name="status_ready_both">Live + background heart sensor ready</string>
    <string name="status_ready_live">Live heart sensor ready</string>
    <string name="status_ready_background">Background heart sensor ready</string>
    <string name="status_measurement_unavailable">Heart-rate measurement unavailable</string>
    <string name="status_background_armed">Background heart telemetry armed</string>
    <string name="status_background_error_format">Background telemetry error: %1$s</string>
    <string name="status_live_stopped">Live telemetry stopped</string>
    <string name="status_testing_link">Testing phone link…</string>
    <string name="status_phone_not_connected">Phone not connected</string>
</resources>
''')

write(WEAR_RES / 'layout/activity_wear_main.xml', '''<?xml version="1.0" encoding="utf-8"?>
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:scrollbars="vertical">
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:gravity="center_horizontal"
        android:orientation="vertical"
        android:padding="14dp">
        <TextView android:layout_width="wrap_content" android:layout_height="wrap_content" android:text="@string/brand_title" android:textSize="22sp" android:textStyle="bold" />
        <TextView android:layout_width="wrap_content" android:layout_height="wrap_content" android:text="@string/watch_subtitle" />
        <TextView android:id="@+id/hrText" android:layout_width="wrap_content" android:layout_height="wrap_content" android:layout_marginTop="12dp" android:text="@string/heart_rate_placeholder" android:textSize="34sp" android:textStyle="bold" />
        <TextView android:id="@+id/statusText" android:layout_width="match_parent" android:layout_height="wrap_content" android:gravity="center" android:text="@string/status_checking_sensors" />
        <Button android:id="@+id/liveButton" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="@string/action_start_live" />
        <Button android:id="@+id/testButton" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="@string/action_test_phone_link" />
        <TextView android:layout_width="match_parent" android:layout_height="wrap_content" android:gravity="center" android:text="@string/live_mode_note" android:textSize="11sp" />
    </LinearLayout>
</ScrollView>
''')

activity = ROOT / 'wear/src/main/java/com/lumenhelix/healthbridge/wear/WearMainActivity.kt'
s = read(activity)
replacements = {
    'statusText.text = "Heart sensor permission required"': 'statusText.text = getString(R.string.status_permission_required)',
    'statusText.text = "Heart sensor: $availability"': 'statusText.text = getString(R.string.status_sensor_format, availability)',
    'hrText.text = "${bpm.toInt()} bpm"': 'hrText.text = getString(R.string.heart_rate_format, bpm.toInt())',
    'statusText.text = "Live • linked to phone"': 'statusText.text = getString(R.string.status_live_linked)',
    'statusText.text = "Live heart sensor connected"': 'statusText.text = getString(R.string.status_live_connected)',
    'statusText.text = "Sensor error: ${throwable.javaClass.simpleName}"': 'statusText.text = getString(R.string.status_sensor_error_format, throwable.javaClass.simpleName)',
    'liveButton.text = "Start live telemetry"': 'liveButton.text = getString(R.string.action_start_live)',
    'statusText.text = "Heart-rate capability not available"': 'statusText.text = getString(R.string.status_capability_unavailable)',
    'liveSupported && passiveSupported -> "Live + background heart sensor ready"': 'liveSupported && passiveSupported -> getString(R.string.status_ready_both)',
    'liveSupported -> "Live heart sensor ready"': 'liveSupported -> getString(R.string.status_ready_live)',
    'passiveSupported -> "Background heart sensor ready"': 'passiveSupported -> getString(R.string.status_ready_background)',
    'else -> "Heart-rate measurement unavailable"': 'else -> getString(R.string.status_measurement_unavailable)',
    'statusText.text = "Background heart telemetry armed"': 'statusText.text = getString(R.string.status_background_armed)',
    'statusText.text = "Background telemetry error: ${it.javaClass.simpleName}"': 'statusText.text = getString(R.string.status_background_error_format, it.javaClass.simpleName)',
    'liveButton.text = "Stop live telemetry"': 'liveButton.text = getString(R.string.action_stop_live)',
    'statusText.text = if (passiveSupported) "Background heart telemetry armed" else "Live telemetry stopped"': 'statusText.text = if (passiveSupported) getString(R.string.status_background_armed) else getString(R.string.status_live_stopped)',
    'if (type == "link_test") statusText.text = "Testing phone link…"': 'if (type == "link_test") statusText.text = getString(R.string.status_testing_link)',
    'if (nodes.isEmpty()) statusText.text = "Phone not connected"': 'if (nodes.isEmpty()) statusText.text = getString(R.string.status_phone_not_connected)',
}
for old, new in replacements.items():
    if old not in s:
        raise SystemExit(f'missing expected WearMainActivity text: {old}')
    s = s.replace(old, new)
write(activity, s)

assert 'android:icon="@mipmap/ic_launcher"' in read(manifest)
assert 'android:taskAffinity=""' in read(manifest)
assert 'android:dataExtractionRules="@xml/data_extraction_rules"' in read(manifest)
assert 'android:label="@string/app_name"' in read(manifest)
assert 'android:text="HELIX"' not in read(WEAR_RES / 'layout/activity_wear_main.xml')
assert 'statusText.text = "' not in read(activity)
assert 'liveButton.text = "' not in read(activity)
print('HELIX_RELEASE_POLISH_POSTFIX=PASS')
