#!/usr/bin/env python3
from pathlib import Path

manifest = Path('/tmp/helix/helix-health-bridge/wear/src/main/AndroidManifest.xml')
s = manifest.read_text(encoding='utf-8')
name = 'com.google.android.wearable.standalone'
if name not in s:
    marker = '</application>'
    assert marker in s, 'Wear manifest missing </application>'
    meta = '        <meta-data android:name="com.google.android.wearable.standalone" android:value="false" />\n'
    s = s.replace(marker, meta + '    ' + marker, 1)
    manifest.write_text(s, encoding='utf-8')

s = manifest.read_text(encoding='utf-8')
assert name in s
assert 'android:value="false"' in s
print('WEAR_STANDALONE_FLAG=false')
