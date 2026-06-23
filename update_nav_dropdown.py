import os

# Define the new navigation HTML block
new_nav_block = """    <nav class="nav nav--transparent" id="main-nav" role="navigation" aria-label="Main navigation">
        <a href="index.html" class="nav__logo" aria-label="Kings Court Hotel Home">
            <span class="nav__logo-name">Kings Court</span>
            <span class="nav__logo-tagline">Hotel</span>
        </a>

        <ul class="nav__links" role="list">
            <li><a href="rooms.html" class="nav__link">Rooms</a></li>
            <li class="nav__dropdown">
                <a href="#" class="nav__link nav__dropdown-trigger" aria-haspopup="true" aria-expanded="false">
                    Stay <i class="fa-solid fa-chevron-down"></i>
                </a>
                <ul class="nav__dropdown-menu" role="menu">
                    <li><a href="conferences.html#groups" role="menuitem">Groups</a></li>
                    <li><a href="conferences.html" role="menuitem">Corporate</a></li>
                </ul>
            </li>
            <li class="nav__dropdown">
                <a href="#" class="nav__link nav__dropdown-trigger" aria-haspopup="true" aria-expanded="false">
                    Dining <i class="fa-solid fa-chevron-down"></i>
                </a>
                <ul class="nav__dropdown-menu" role="menu">
                    <li><a href="dining.html" role="menuitem">The Restaurant</a></li>
                    <li><a href="twisted-boot-bar.html" role="menuitem">Twisted Boot Pub</a></li>
                </ul>
            </li>
            <li class="nav__dropdown">
                <a href="#" class="nav__link nav__dropdown-trigger" aria-haspopup="true" aria-expanded="false">
                    Events <i class="fa-solid fa-chevron-down"></i>
                </a>
                <ul class="nav__dropdown-menu" role="menu">
                    <li><a href="weddings.html" role="menuitem">Weddings</a></li>
                    <li><a href="conferences.html" role="menuitem">Conferences</a></li>
                    <li><a href="index.html#christmas-menu" role="menuitem">Christmas 2026</a></li>
                    <li><a href="twisted-boot-bar.html#regular-events" role="menuitem">Twisted Boot regular events</a></li>
                </ul>
            </li>
            <li><a href="gallery.html" class="nav__link">Gallery</a></li>
            <li><a href="location.html" class="nav__link">Location</a></li>
            <li><a href="blog.html" class="nav__link">Blog</a></li>
            <li><a href="faq.html" class="nav__link">FAQ</a></li>
        </ul>

        <a href="booking.html" class="nav__cta" id="nav-book-btn">Book Now</a>

        <button class="nav__hamburger" id="nav-hamburger" aria-label="Toggle mobile menu" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </nav>

    <!-- Mobile Menu -->
    <div class="nav__mobile" id="nav-mobile" role="dialog" aria-label="Mobile navigation">
        <button class="nav__mobile-close" id="nav-mobile-close" aria-label="Close menu">
            <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="nav__mobile-links">
            <a href="rooms.html" class="nav__mobile-link">Rooms</a>
            
            <div class="nav__mobile-dropdown">
                <button class="nav__mobile-link nav__mobile-dropdown-toggle">
                    Stay <i class="fa-solid fa-chevron-down"></i>
                </button>
                <div class="nav__mobile-dropdown-menu">
                    <a href="conferences.html#groups" class="nav__mobile-sublink">Groups</a>
                    <a href="conferences.html" class="nav__mobile-sublink">Corporate</a>
                </div>
            </div>

            <div class="nav__mobile-dropdown">
                <button class="nav__mobile-link nav__mobile-dropdown-toggle">
                    Dining <i class="fa-solid fa-chevron-down"></i>
                </button>
                <div class="nav__mobile-dropdown-menu">
                    <a href="dining.html" class="nav__mobile-sublink">The Restaurant</a>
                    <a href="twisted-boot-bar.html" class="nav__mobile-sublink">Twisted Boot Pub</a>
                </div>
            </div>

            <div class="nav__mobile-dropdown">
                <button class="nav__mobile-link nav__mobile-dropdown-toggle">
                    Events <i class="fa-solid fa-chevron-down"></i>
                </button>
                <div class="nav__mobile-dropdown-menu">
                    <a href="weddings.html" class="nav__mobile-sublink">Weddings</a>
                    <a href="conferences.html" class="nav__mobile-sublink">Conferences</a>
                    <a href="index.html#christmas-menu" class="nav__mobile-sublink">Christmas 2026</a>
                    <a href="twisted-boot-bar.html#regular-events" class="nav__mobile-sublink">Twisted Boot regular events</a>
                </div>
            </div>

            <a href="gallery.html" class="nav__mobile-link">Gallery</a>
            <a href="location.html" class="nav__mobile-link">Location</a>
            <a href="blog.html" class="nav__mobile-link">Blog</a>
            <a href="faq.html" class="nav__mobile-link">FAQ</a>
        </div>
        <div class="nav__mobile-divider" aria-hidden="true"></div>
        <a href="booking.html" class="btn btn--primary" style="margin-top:1rem;">Book Your Stay</a>
    </div>"""

def find_matching_div(html_content, start_index):
    depth = 0
    i = start_index
    length = len(html_content)
    while i < length:
        # Check for start of a div (make sure it's followed by a space or class name, or is just <div>)
        if html_content[i:i+4] == '<div' and (i+4 >= length or html_content[i+4] in (' ', '>', '\n', '\t')):
            depth += 1
            i += 4
        # Check for end of a div (e.g. </div or </div>)
        elif html_content[i:i+5] == '</div':
            depth -= 1
            i += 5
            if depth == 0:
                closing_bracket = html_content.find('>', i - 1)
                if closing_bracket != -1:
                    return closing_bracket + 1
        else:
            i += 1
    return -1

# List all html files in the directory
html_files = [f for f in os.listdir('.') if f.endswith('.html')]

updated_count = 0
for file in html_files:
    if file == 'google22c3e4b7e76d4823.html':
        continue
        
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Find start of nav
    start_nav = content.find('<nav class="nav')
    if start_nav == -1:
        print(f"WARNING: Could not find <nav class=\"nav in {file}")
        continue
        
    # 2. Find start of mobile menu
    start_mobile = content.find('<div class="nav__mobile"', start_nav)
    if start_mobile == -1:
        print(f"WARNING: Could not find <div class=\"nav__mobile\" in {file}")
        continue
        
    # 3. Find end of mobile menu div
    end_mobile = find_matching_div(content, start_mobile)
    if end_mobile == -1:
        print(f"WARNING: Could not find matching closing div for nav__mobile in {file}")
        continue
    
    # Replace content
    new_content = content[:start_nav] + new_nav_block + content[end_mobile:]
    with open(file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Successfully updated: {file}")
    updated_count += 1

print(f"Done. Updated {updated_count} out of {len(html_files) - 1} target files.")
