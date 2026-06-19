import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

desired_desktop_nav = """        <ul class="nav__links" role="list">
            <li><a href="rooms.html" class="nav__link">Rooms</a></li>
            <li><a href="dining.html" class="nav__link">Dining</a></li>
            <li><a href="twisted-boot-bar.html" class="nav__link">Twisted Boot Bar</a></li>
            <li><a href="weddings.html" class="nav__link">Weddings</a></li>
            <li><a href="events.html" class="nav__link">Events</a></li>
            <li><a href="conferences.html" class="nav__link">Conferences</a></li>
            <li><a href="gallery.html" class="nav__link">Gallery</a></li>
            <li><a href="blog.html" class="nav__link">Blog</a></li>
            <li><a href="contact.html" class="nav__link">Contact</a></li>
        </ul>"""

desired_mobile_nav = """    <div class="nav__mobile" id="nav-mobile" role="dialog" aria-label="Mobile navigation">
        <button class="nav__mobile-close" id="nav-mobile-close" aria-label="Close menu">
            <i class="fa-solid fa-xmark"></i>
        </button>
        <a href="rooms.html" class="nav__mobile-link">Rooms</a>
        <a href="dining.html" class="nav__mobile-link">Dining</a>
        <a href="twisted-boot-bar.html" class="nav__mobile-link">Twisted Boot Bar</a>
        <a href="weddings.html" class="nav__mobile-link">Weddings</a>
        <a href="events.html" class="nav__mobile-link">Events</a>
        <a href="conferences.html" class="nav__mobile-link">Conferences</a>
        <a href="gallery.html" class="nav__mobile-link">Gallery</a>
        <a href="contact.html" class="nav__mobile-link">Contact</a>
        <div class="nav__mobile-divider" aria-hidden="true"></div>
        <a href="blog.html" class="nav__mobile-link">Blog</a>
        <a href="location.html" class="nav__mobile-link">Location</a>
        <a href="booking.html" class="btn btn--primary" style="margin-top:1rem;">Book Your Stay</a>
    </div>"""

# Ensure whitespace alignment looks good. We use raw strings or re.DOTALL to replace from <ul class="nav__links" to </ul>
nav_links_pattern = re.compile(r'^[ \t]*<ul class="nav__links" role="list">.*?</ul>', re.MULTILINE | re.DOTALL)
nav_mobile_pattern = re.compile(r'^[ \t]*<div class="nav__mobile" id="nav-mobile"[^>]*>.*?</div>\s*<!-- ═══════════════════════════════════════', re.MULTILINE | re.DOTALL)

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = content
    
    # Replace desktop nav
    new_content = nav_links_pattern.sub(desired_desktop_nav, new_content)
    
    # Replace mobile nav. Note: Because of how HTML files differ in their next comment, we'll do a simpler replacement.
    # Find start to the end of the mobile nav div.
    # The div id="nav-mobile" ends after the "Book Your Stay</a>\n    </div>"
    mobile_regex = re.compile(r'[ \t]*<div class="nav__mobile" id="nav-mobile" role="dialog" aria-label="Mobile navigation">.*?(?:Book Your Stay.*?</a>\r?\n[ \t]*</div>)', re.DOTALL)
    new_content = mobile_regex.sub(desired_mobile_nav, new_content)
    
    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated navigation in {file}")

print("All navigations standardized successfully!")
