import os

gallery_dir = "assets/images/gallery"
html_files = [f for f in os.listdir(".") if f.endswith(".html")]

renames = {}
# Generate renames map
for filename in os.listdir(gallery_dir):
    new_filename = filename.replace(" ", "-").replace("(", "").replace(")", "").replace("\\", "")
    if new_filename != filename:
        renames[filename] = new_filename

for html_file in html_files:
    with open(html_file, "r") as f:
        content = f.read()
    
    modified = False
    for old_name, new_name in renames.items():
        # Match EXACT old name string representation in source
        if old_name in content:
            content = content.replace(old_name, new_name)
            modified = True
            
        old_enc = old_name.replace(" ", "%20")
        if old_enc in content:
            content = content.replace(old_enc, new_name)
            modified = True
            
        # specifically if it had backslashes
        old_slash = old_name.replace(" ", r"\ ")
        if old_slash in content:
            content = content.replace(old_slash, new_name)
            modified = True

    if modified:
        with open(html_file, "w") as f:
            f.write(content)
        print(f"Updated {html_file}")
