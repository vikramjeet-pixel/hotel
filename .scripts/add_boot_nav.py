import os
import glob

html_files = glob.glob('/Users/vikramjeetsingh/Desktop/work/starsupermarket/hotel/*.html')

for html_file in html_files:
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Desktop Nav
    target1 = '<li><a href="dining.html" class="nav__link">Dining</a></li>'
    replacement1 = '<li><a href="dining.html" class="nav__link">Dining</a></li>\n            <li><a href="twisted-boot-bar.html" class="nav__link">Twisted Boot Bar</a></li>'
    
    # Mobile Nav
    target2 = '<a href="dining.html" class="nav__mobile-link">Dining</a>'
    replacement2 = '<a href="dining.html" class="nav__mobile-link">Dining</a>\n        <a href="twisted-boot-bar.html" class="nav__mobile-link">Twisted Boot Bar</a>'
    
    updated = False
    
    if target1 in content and 'twisted-boot-bar.html" class="nav__link' not in content:
        content = content.replace(target1, replacement1)
        updated = True
        
    if target2 in content and 'twisted-boot-bar.html" class="nav__mobile-link' not in content:
        content = content.replace(target2, replacement2)
        updated = True
        
    if updated:
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated: {os.path.basename(html_file)}')
