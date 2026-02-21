import os
import re

gallery_dir = "assets/images/gallery"
html_files = [f for f in os.listdir(".") if f.endswith(".html")]

# Map old filenames to new ones
renames = {}
for filename in os.listdir(gallery_dir):
    new_filename = filename.replace(" ", "-").replace("(", "").replace(")", "").replace("\\", "")
    if new_filename != filename:
        renames[filename] = new_filename
        os.rename(os.path.join(gallery_dir, filename), os.path.join(gallery_dir, new_filename))

# Update HTML files
for html_file in html_files:
    with open(html_file, "r") as f:
        content = f.read()
    
    modified = False
    for old_name, new_name in renames.items():
        # Handle the case where user might have used encoded versions or backslashes
        old_name_escaped = old_name.replace(" ", r"\\? ") # match optional backslash
        # Actually it's easier to just match what was there:
        
        # Exact match old name
        if old_name in content:
            content = content.replace(old_name, new_name)
            modified = True
            
        # Match old name with %20
        old_enc = old_name.replace(" ", "%20")
        if old_enc in content:
            content = content.replace(old_enc, new_name)
            modified = True
            
        # Match old name with backslash (like KINGS\ COURT)
        old_slash = old_name.replace(" ", r"\ ")
        if old_slash in content:
            content = content.replace(old_slash, new_name)
            modified = True

    if modified:
        with open(html_file, "w") as f:
            f.write(content)
        print(f"Updated {html_file}")

