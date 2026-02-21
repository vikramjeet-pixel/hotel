import os
import re
import subprocess

gallery_dir = "assets/images/gallery"
html_files = [f for f in os.listdir(".") if f.endswith(".html")]

# Map old filenames to new lowercase filenames
renames = {}
for filename in os.listdir(gallery_dir):
    if filename.startswith(".git") or filename.startswith(".DS_Store"):
        continue
    
    new_filename = filename.lower()
    if new_filename != filename:
        renames[filename] = new_filename
        
        # Git case-insensitive rename trick: move to temp name, then move to lowercase name
        # Actually it's easier to just os.rename and let 'git add -A' figure it out, but git mv is safer for case-only changes.
        temp_filename = "temp_" + filename
        
        old_path = os.path.join(gallery_dir, filename)
        temp_path = os.path.join(gallery_dir, temp_filename)
        new_path = os.path.join(gallery_dir, new_filename)
        
        # Execute git mv commands
        subprocess.run(["git", "mv", old_path, temp_path])
        subprocess.run(["git", "mv", temp_path, new_path])

# Update HTML files
for html_file in html_files:
    with open(html_file, "r") as f:
        content = f.read()
    
    modified = False
    for old_name, new_name in renames.items():
        if old_name in content:
            content = content.replace(old_name, new_name)
            modified = True

    if modified:
        with open(html_file, "w") as f:
            f.write(content)
        print(f"Updated {html_file}")

# Commit and push
subprocess.run(["git", "add", "-A"])
subprocess.run(["git", "commit", "-m", "fix: lowercase image paths for case-sensitive deployment"])
subprocess.run(["git", "push"])
