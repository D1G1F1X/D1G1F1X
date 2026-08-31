#!/usr/bin/env python3
from pathlib import Path
import re

ROOT = Path('/tmp/helix/helix-health-bridge')
TARGET_CODE = 100
TARGET_NAME = '1.0.0'

for rel in ('app/build.gradle.kts', 'wear/build.gradle.kts'):
    p = ROOT / rel
    s = p.read_text(encoding='utf-8')
    s, n_code = re.subn(r'versionCode\s*=\s*\d+', f'versionCode = {TARGET_CODE}', s, count=1)
    s, n_name = re.subn(r'versionName\s*=\s*"[^"]+"', f'versionName = "{TARGET_NAME}"', s, count=1)
    assert n_code == 1, f'{rel}: versionCode not uniquely replaced'
    assert n_name == 1, f'{rel}: versionName not uniquely replaced'
    p.write_text(s, encoding='utf-8')
    verify = p.read_text(encoding='utf-8')
    assert f'versionCode = {TARGET_CODE}' in verify
    assert f'versionName = "{TARGET_NAME}"' in verify

print(f'HELIX_RELEASE_VERSION={TARGET_NAME}')
print(f'HELIX_RELEASE_CODE={TARGET_CODE}')
