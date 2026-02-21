import os
import shutil

rooms_dir = "assets/images"
folders = ["single room", "standard double room", "king room", "twin room", "quad room"]

for f in folders:
    old_path = os.path.join(rooms_dir, f)
    new_path = os.path.join(rooms_dir, f.replace(" ", "-"))
    if os.path.exists(old_path):
        os.rename(old_path, new_path)
        print(f"Renamed {f} to {f.replace(' ', '-')}")

