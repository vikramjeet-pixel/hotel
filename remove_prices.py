import re

def update_file(filename, patterns):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    for pattern, replacement in patterns:
        content = re.sub(pattern, replacement, content, flags=re.DOTALL)
        
    if content != original:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filename}")

# Global link
bw_link = 'https://www.bestwestern.co.uk/integrated-booking/kings-court-hotel-bw-signature-collection-by-best-western-84411/'
check_avail_btn = f'<a href="{bw_link}" target="_blank" class="btn btn--primary" aria-label="Check Availability">Check Availability</a>'

# 1. Update index.html, rooms.html
html_files = ['index.html', 'rooms.html']
for fn in html_files:
    update_file(fn, [
        (r'<div class="room-card__price">.*?</div>', check_avail_btn)
    ])

# 2. Update room-detail.html
update_file('room-detail.html', [
    (r'<div class="rd-sidebar__price">.*?</div>', ''),
    (r'<div class="rd-mobile-bar__price">.*?</div>', ''),
    (r'<!-- ── PRICE BREAKDOWN ── -->.*?</section><!-- /.rd-pricing -->', ''),
    (r'<div class="room-card__price">.*?</div>', check_avail_btn)
])

# 3. Update js/room-detail.js
js_patterns = [
    (r"// Build booking URL with params.*?window\.location\.href.*?;", 
     f"window.open('{bw_link}', '_blank');")
]
update_file('js/room-detail.js', js_patterns)

