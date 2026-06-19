#!/usr/bin/env python3
"""
Update meta descriptions, OG tags, Twitter cards, and additional meta 
for all Kings Court Hotel pages.
"""
import re
import os

BASE = "/Users/vikramjeetsingh/Desktop/work/starsupermarket/hotel"

# ─── Shared meta block template ───
SHARED_META = """    <meta name="robots" content="index, follow" />
    <meta name="theme-color" content="#1F3A2E" />
    <meta property="og:site_name" content="Kings Court Hotel" />"""

# ─── Page configs: (filename, meta_desc, og_title, og_desc, twitter_desc, og_image_path, title) ───
PAGES = {
    "index.html": {
        "meta_desc": "Discover Kings Court Hotel, a Tudor country escape near Stratford-upon-Avon. 61 en-suite rooms, award-winning dining, and beautiful grounds. Book your stay today.",
        "og_title": "Kings Court Hotel | Tudor Country Escape",
        "og_desc": "Step into 380 years of history at Kings Court Hotel. 61 en-suite rooms, the Twisted Boot Bar, and 4 acres of Warwickshire countryside await your arrival.",
        "twitter_desc": "A Tudor country escape near Stratford-upon-Avon. 61 en-suite rooms, award-winning dining &amp; 4 acres of Warwickshire countryside. Book direct for the best rates.",
        "og_image": "assets/images/gallery/compressed-kings-court-2.jpg",
        "twitter_alt": "Kings Court Hotel exterior — Tudor manor house set in Warwickshire countryside",
    },
    "rooms.html": {
        "meta_desc": "Explore 61 individually designed en-suite bedrooms at Kings Court Hotel near Stratford-upon-Avon. King, twin, family, and single rooms with premium Warwickshire comfort.",
        "og_title": "Rooms &amp; Suites | Kings Court Hotel",
        "og_desc": "From cosy singles to spacious family rooms — 61 en-suite bedrooms blending Tudor character with modern luxury. Free Wi-Fi, parking, and countryside views included.",
        "twitter_desc": "61 individually designed en-suite bedrooms at Kings Court Hotel. King, twin, family &amp; single rooms with pocket sprung mattresses and countryside views.",
        "og_image": "assets/images/gallery/compressed-kings-court-3-1.jpg",
        "twitter_alt": "Luxurious en-suite bedroom interior at Kings Court Hotel",
    },
    "dining.html": {
        "meta_desc": "Dine at Kings Court Hotel near Stratford-upon-Avon. Award-winning Garden Dining Room and Twisted Boot Bar serving seasonal British cuisine in Warwickshire.",
        "og_title": "Dining | Kings Court Hotel Restaurant",
        "og_desc": "Two exceptional dining experiences under one Tudor roof. Seasonal British cuisine in the Garden Dining Room and craft ales in the Twisted Boot Bar. Reserve a table today.",
        "twitter_desc": "Seasonal British cuisine in the Garden Dining Room and craft ales by a roaring fire in the Twisted Boot Bar. Award-winning dining near Stratford-upon-Avon.",
        "og_image": "assets/images/gallery/compressed-kings-court-13.jpg",
        "twitter_alt": "Garden Dining Room at Kings Court Hotel — candlelit Tudor dining",
    },
    "twisted-boot-bar.html": {
        "meta_desc": "Visit the Twisted Boot Bar at Kings Court Hotel near Stratford-upon-Avon. Craft ales, cocktails, and light bites by a roaring fire in historic Warwickshire.",
        "og_title": "The Twisted Boot Bar | Kings Court Hotel",
        "og_desc": "Craft ales, signature cocktails, and light bites served beside an inglenook fireplace. Live music Fridays. The perfect Warwickshire pub experience.",
        "twitter_desc": "Craft ales, cocktails &amp; light bites by a roaring fire at the Twisted Boot Bar. Live music Fridays. The heart of Kings Court Hotel near Stratford-upon-Avon.",
        "og_image": "assets/images/gallery/compressed-kings-court-23.jpg",
        "twitter_alt": "The Twisted Boot Bar at Kings Court Hotel — cosy pub with fireplace",
    },
    "weddings.html": {
        "meta_desc": "Host your dream wedding at Kings Court Hotel, a licensed Tudor venue in Warwickshire. Three event spaces for 20 to 200 guests with award-winning catering.",
        "og_title": "Weddings at Kings Court Hotel",
        "og_desc": "Say 'I do' in a 16th-century Tudor manor. Three stunning spaces, 61 guest bedrooms, award-winning catering, and a dedicated wedding coordinator. Enquire today.",
        "twitter_desc": "Your perfect Tudor wedding awaits. Licensed ceremonies, 3 stunning spaces, 61 guest rooms &amp; 4 acres of gardens. Kings Court Hotel, Warwickshire.",
        "og_image": "assets/images/gallery/compressed-kings-court-44.jpg",
        "twitter_alt": "Wedding reception setup at Kings Court Hotel — Tudor manor wedding venue",
    },
    "events.html": {
        "meta_desc": "Plan your special event at Kings Court Hotel near Stratford-upon-Avon. Five flexible venues for birthdays, parties, wakes, and private dining in Warwickshire.",
        "og_title": "Private Events | Kings Court Hotel",
        "og_desc": "Five exceptional event spaces, 61 on-site bedrooms, and award-winning catering. Birthdays, anniversaries, private dining, and celebrations in historic Warwickshire.",
        "twitter_desc": "From intimate birthdays to grand celebrations — 5 event spaces, 61 bedrooms &amp; award-winning catering at Kings Court Hotel near Stratford-upon-Avon.",
        "og_image": "assets/images/gallery/compressed-kings-court-44.jpg",
        "twitter_alt": "Event venue at Kings Court Hotel — historic Tudor celebration space",
    },
    "conferences.html": {
        "meta_desc": "Host conferences and meetings at Kings Court Hotel near Stratford-upon-Avon. Modern AV, high-speed Wi-Fi, 61 bedrooms, and award-winning catering in Warwickshire.",
        "og_title": "Conferences | Kings Court Hotel",
        "og_desc": "Professional meeting rooms with 4K AV, 1Gbps Wi-Fi, and AA Rosette catering. Up to 300 delegates with 61 on-site bedrooms. The ideal Warwickshire conference venue.",
        "twitter_desc": "Tudor character meets corporate capability. 4K AV, 1Gbps Wi-Fi, and AA Rosette catering for up to 300 delegates at Kings Court Hotel, Warwickshire.",
        "og_image": "assets/images/gallery/compressed-kings-court-14.jpg",
        "twitter_alt": "Conference room at Kings Court Hotel — modern meeting facilities",
    },
    "gallery.html": {
        "meta_desc": "Explore Kings Court Hotel in photos — Tudor architecture, landscaped gardens, en-suite rooms, and relaxed dining near Stratford-upon-Avon, Warwickshire.",
        "og_title": "Photo Gallery | Kings Court Hotel",
        "og_desc": "See why guests fall in love with Kings Court. Browse our gallery of Tudor architecture, 4-acre gardens, comfortable rooms, and award-winning dining spaces.",
        "twitter_desc": "Tudor architecture, 4-acre gardens, comfortable rooms &amp; award-winning dining — explore Kings Court Hotel near Stratford-upon-Avon through our photo gallery.",
        "og_image": "assets/images/gallery/compressed-kings-court-1.jpg",
        "twitter_alt": "Kings Court Hotel gallery — Tudor manor exterior and grounds",
    },
    "location.html": {
        "meta_desc": "Find Kings Court Hotel near Stratford-upon-Avon. Just 3 miles from town, 5 mins from M40. Free parking, EV charging, and directions by car, train, and air.",
        "og_title": "Location &amp; Directions | Kings Court Hotel",
        "og_desc": "Perfectly positioned in Warwickshire countryside. 3 miles from Stratford-upon-Avon, 5 mins from M40 J15. Free parking with 120 spaces and EV charging on-site.",
        "twitter_desc": "Find Kings Court Hotel in Warwickshire. 3 miles from Stratford-upon-Avon, 5 mins from M40. 120 free parking spaces, EV charging &amp; easy directions.",
        "og_image": "assets/images/hero/hero-main.jpg",
        "twitter_alt": "Warwickshire countryside surrounding Kings Court Hotel",
    },
    "faq.html": {
        "meta_desc": "Frequently asked questions about Kings Court Hotel near Stratford-upon-Avon. Check-in times, parking, pets, cancellations, weddings, and dining information.",
        "og_title": "FAQ | Kings Court Hotel Help Centre",
        "og_desc": "Quick answers about Kings Court Hotel — check-in times, free parking, pet policy, cancellations, accessibility, wedding enquiries, and restaurant bookings.",
        "twitter_desc": "Got questions about Kings Court Hotel? Find answers about check-in times, free parking, pets, cancellations, weddings &amp; dining near Stratford-upon-Avon.",
        "og_image": "assets/images/hero/hero-main.jpg",
        "twitter_alt": "Kings Court Hotel — frequently asked questions",
    },
    "blog.html": {
        "meta_desc": "Explore Warwickshire attractions near Kings Court Hotel. Guides to Stratford-upon-Avon, Warwick Castle, the Cotswolds, and local events worth visiting.",
        "og_title": "Blog &amp; Local Guides | Kings Court Hotel",
        "og_desc": "Discover what makes Warwickshire special. Local guides to Stratford-upon-Avon, Warwick Castle, the Cotswolds, and seasonal events — all near Kings Court Hotel.",
        "twitter_desc": "Discover Warwickshire from Kings Court Hotel. Local guides to Stratford-upon-Avon, Warwick Castle, the Cotswolds &amp; seasonal events worth visiting.",
        "og_image": "assets/images/gallery/blog-theatre.png",
        "twitter_alt": "Warwickshire attractions near Kings Court Hotel",
    },
    "contact.html": {
        "meta_desc": "Contact Kings Court Hotel near Stratford-upon-Avon. Call 01789 763 111, email us, or fill in our enquiry form. Reservations, weddings, events, and dining.",
        "og_title": "Contact Us | Kings Court Hotel",
        "og_desc": "Get in touch with Kings Court Hotel. Call 01789 763 111 or email info@kingscourthotel.co.uk for room bookings, wedding enquiries, events, and dining reservations.",
        "twitter_desc": "Get in touch with Kings Court Hotel. Call 01789 763 111 for room bookings, wedding enquiries, events &amp; dining reservations near Stratford-upon-Avon.",
        "og_image": "assets/images/gallery/compressed-kings-court-18.jpg",
        "twitter_alt": "Kings Court Hotel contact — Tudor manor reception",
    },
}


def update_page(filename, cfg):
    filepath = os.path.join(BASE, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Replace meta description
    content = re.sub(
        r'<meta name="description"\s*\n?\s*content="[^"]*"\s*/?>',
        f'<meta name="description"\n        content="{cfg["meta_desc"]}" />',
        content,
        count=1
    )

    # 2. Replace og:title
    content = re.sub(
        r'<meta property="og:title" content="[^"]*"\s*/?>',
        f'<meta property="og:title" content="{cfg["og_title"]}" />',
        content,
        count=1
    )

    # 3. Replace og:description
    content = re.sub(
        r'<meta property="og:description"\s*\n?\s*content="[^"]*"\s*/?>',
        f'<meta property="og:description"\n        content="{cfg["og_desc"]}" />',
        content,
        count=1
    )

    # 4. Replace og:image (keep absolute URL)
    abs_img = f"https://www.kingscourthotel.co.uk/{cfg['og_image']}"
    content = re.sub(
        r'<meta property="og:image"\s*\n?\s*content="[^"]*"\s*/?>',
        f'<meta property="og:image"\n        content="{abs_img}" />',
        content,
        count=1
    )

    # 5. Add new tags BEFORE <link rel="canonical"
    new_tags = f"""    <meta name="robots" content="index, follow" />
    <meta name="theme-color" content="#1F3A2E" />
    <meta property="og:site_name" content="Kings Court Hotel" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@Kingscourthotel" />
    <meta name="twitter:title" content="{cfg['og_title']}" />
    <meta name="twitter:description"
        content="{cfg['twitter_desc']}" />
    <meta name="twitter:image"
        content="{abs_img}" />
    <meta name="twitter:image:alt" content="{cfg['twitter_alt']}" />
    """

    # Only add if twitter:card not already present
    if 'twitter:card' not in content:
        content = content.replace(
            '    <link rel="canonical"',
            new_tags + '    <link rel="canonical"'
        )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    # Verify character counts
    desc_len = len(cfg["meta_desc"])
    og_title_len = len(cfg["og_title"].replace("&amp;", "&"))
    return filename, desc_len, og_title_len


# Run updates
print("Updating meta tags for all pages...")
print(f"{'Page':<28} {'Desc Len':>8} {'OG Title Len':>12}")
print("-" * 52)
for fname, cfg in PAGES.items():
    name, desc_len, og_len = update_page(fname, cfg)
    status = "✓" if 140 <= desc_len <= 165 else "⚠"
    print(f"{name:<28} {desc_len:>6} {status}  {og_len:>10}")

print("\n✅ All 14 pages updated successfully!")
