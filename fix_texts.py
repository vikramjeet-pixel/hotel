import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

replacements = [
    # General Luxury replacements
    (r'modern luxury', 'modern comfort'),
    (r'Modern luxury', 'Modern comfort'),
    (r'Modern Luxury', 'Modern Comfort'),
    (r'luxury rooms', 'comfortable rooms'),
    (r'Luxury rooms', 'Comfortable rooms'),
    (r'Luxury Rooms', 'Comfortable Rooms'),
    (r'luxury bedrooms', 'comfortable bedrooms'),
    (r'Luxury bedrooms', 'Comfortable bedrooms'),
    (r'Luxury Bedrooms', 'Comfortable Bedrooms'),
    (r'classic luxury', 'classic comfort'),
    (r'Classic Luxury', 'Classic Comfort'),
    (r'luxury floral design', 'beautiful floral design'),
    (r'luxury pocket sprung', 'high-quality pocket sprung'),
    (r'A sanctuary of luxury', 'A sanctuary of comfort'),
    (r'timeless luxury', 'timeless comfort'),
    (r'contemporary luxury', 'contemporary comfort'),
    (r'luxury organic products', 'high-quality products'),
    (r'luxury bathrobes', 'comfortable bathrobes'),
    (r'Luxury bathrobes', 'Comfortable bathrobes'),
    (r'Luxury Coach', 'Premium Coach'),
    (r'luxury hotel', 'comfortable hotel'),
    (r'luxurious rooms', 'comfortable rooms'),
    (r'Luxury Bedrooms', 'Comfortable Bedrooms'),
    
    # Spa / Wellness (manual block removal might be needed, but we do simple ones)
    (r'Luxury spa &amp; wellness facilities', 'Beautiful private grounds'),
    (r'Luxury Spa', 'Beautiful Gardens'),
    (r'bespoke spa toiletries', 'bespoke complimentary toiletries'),
    (r'unwind with a spa treatment', 'unwind in our comfortable lounges'),
    (r'60-minute spa treatment', 'Complimentary afternoon tea'),
    (r'meals, drinks, spa treatments, or activities', 'meals, drinks, or activities'),
    
    # Dining
    (r'fine dining', 'relaxed dining'),
    (r'Fine dining', 'Relaxed dining'),
    (r'Fine Dining', 'Relaxed Dining'),
    (r'award-winning fine dining restaurant', 'quality relaxed dining restaurant'),
    
    # 3-star
    (r'4-star', '3-star'),
    (r'4-Star', '3-Star'),
    (r'"ratingValue": "4"', '"ratingValue": "3"'),
    
    # Email
    (r'info@kingscourt\.co\.uk', 'info@kingscourthotel.co.uk'),
]

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    for old, new in replacements:
        new_content = re.sub(old, new, new_content)
        
    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file}")
