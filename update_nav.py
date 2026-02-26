import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Nav links
    old_nav = r'<li><a href="events\.html" class="nav__link">Events</a></li>'
    new_nav = '<li><a href="events.html" class="nav__link">Events</a></li>\n            <li><a href="conferences.html" class="nav__link">Conferences</a></li>'
    if 'conferences.html" class="nav__link"' not in content:
        content = re.sub(old_nav, new_nav, content)

    # Mobile nav links
    old_mob = r'<a href="events\.html" class="nav__mobile-link">Events</a>'
    new_mob = '<a href="events.html" class="nav__mobile-link">Events</a>\n        <a href="conferences.html" class="nav__mobile-link">Conferences</a>'
    if 'conferences.html" class="nav__mobile-link"' not in content:
        content = re.sub(old_mob, new_mob, content)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Nav updated")
