import os
import re

html_files = [f for f in os.listdir(".") if f.endswith(".html")]

def fix_path(match):
    prefix = match.group(1)
    filename = match.group(2)
    new_filename = filename.replace(" ", "-").replace("(", "").replace(")", "").replace("\\", "")
    return f'{prefix}{new_filename}'

for html_file in html_files:
    with open(html_file, "r") as f:
        content = f.read()
    
    # We look for assets/images/gallery/<anything>.jpg or .png
    # But it must handle quoted strings, backslashes, percent encodings, etc.
    # Pattern: (assets/images/gallery/)([^"'\?#&]+)
    # Then we replace the capturing group inside
    
    new_content = re.sub(r'(assets/images/gallery/)([^"\'\?#&]+)', fix_path, content)
    
    if new_content != content:
        with open(html_file, "w") as f:
            f.write(new_content)
        print(f"Updated {html_file}")
