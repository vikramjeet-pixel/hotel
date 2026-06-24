import os

for root, dirs, files in os.walk('.'):
    # Skip standard folders
    if any(p in root for p in ['.git', '.venv', 'node_modules']):
        continue
    for f in files:
        if f in ['rooms.html', 'twisted-boot-bar.html']:
            print(os.path.join(root, f))
