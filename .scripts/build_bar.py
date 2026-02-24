import os

dining_file = '/Users/vikramjeetsingh/Desktop/work/starsupermarket/hotel/dining.html'
with open(dining_file, 'r', encoding='utf-8') as f:
    dining_content = f.read()

# Extract the header
hero_start_idx = dining_content.find('<!-- ═══════════════════════════════════════\n       HERO')

header_content = dining_content[:hero_start_idx]
header_content = header_content.replace('<title>Dining | Kings Court Hotel — Garden Dining Room &amp; Twisted Boot Bar</title>', '<title>The Twisted Boot Bar | Kings Court Hotel</title>')
header_content = header_content.replace('<body class="dining-page">', '<body class="boot-bar-page">')

# Extract footer
footer_start_idx = dining_content.find('<!-- ═══════════════════════════════════════\n       FOOTER')
if footer_start_idx == -1:
    footer_start_idx = dining_content.find('<footer class="footer"')

footer_content = dining_content[footer_start_idx:]

new_page_content = header_content + """
    <!-- HERO -->
    <section class="dn-hero" id="dn-hero" aria-label="Twisted Boot Bar hero" style="height: 60vh; min-height: 400px; position:relative; display:flex; align-items:flex-end;">
        <div class="dn-hero__bg" id="dn-hero-bg" aria-hidden="true" style="position:absolute; inset:0;">
            <img src="assets/images/gallery/compressed-kings-court-23.jpg"
                alt="Twisted Boot Bar - Kings Court Hotel" class="dn-hero__bg-img"
                id="dn-hero-img" style="width:100%; height:100%; object-fit:cover;" />
        </div>
        <div class="dn-hero__overlay" aria-hidden="true" style="position:absolute; inset:0; background:linear-gradient(to top, rgba(0,0,0,0.8), transparent);"></div>
        <div class="dn-hero__content" style="position:relative; z-index:2; padding:3rem; color:#fff; max-width:800px;">
            <span class="dn-hero__eyebrow" style="color:var(--clr-gold); font-weight:600; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:1rem; display:block;">The Pub at the Kings Court Hotel</span>
            <div class="dn-hero__script" aria-hidden="true" style="font-family:var(--font-script); color:var(--clr-gold); font-size:2rem; margin-bottom:0.5rem; transform:rotate(-5deg);">Friendly &amp; Welcoming</div>
            <h1 class="dn-hero__title" style="font-family:var(--font-serif); font-size:clamp(2.5rem, 5vw, 4rem); line-height:1; margin-bottom:1rem;">The Twisted Boot Bar</h1>
        </div>
    </section>

    <!-- CONTENT -->
    <section class="section" style="background-color: var(--clr-cream-light); padding: 5rem 0;">
        <div class="container">
            <div style="max-width: 800px; margin: 0 auto; text-align: center;">
                <h2 style="font-family: var(--font-serif); font-size: 2.5rem; color: var(--clr-forest); margin-bottom: 2rem;">
                    A Fantastic Selection of Food and Drink
                </h2>
                <div class="gold-line" style="margin: 0 auto 2rem;"></div>
                <p style="font-size: 1.1rem; line-height: 1.8; color: var(--clr-text); margin-bottom: 1.5rem;">
                    Our <strong>Twisted Boot Bar (the Pub at the Kings Court Hotel)</strong> serves a fantastic selection of food and drink for lunch (Tuesday to Sunday) and dinner (Monday to Sunday) until 11.00pm. 
                </p>
                <p style="font-size: 1.1rem; line-height: 1.8; color: var(--clr-text); margin-bottom: 1.5rem;">
                    Looking for a place to pop in for a glass of wine or a pint after work? Did you know the Twisted Boot Bar is separate to the main hotel and has a large outdoor seating area, a great selection of beers, lagers and ciders as well as a fabulous wine selection and we're a friendly and welcoming team!
                </p>
                <div style="background: var(--clr-white); padding: 2.5rem; border-radius: var(--radius-md); box-shadow: var(--shadow-sm); margin: 3rem 0; text-align:left;">
                    <h3 style="font-family: var(--font-serif); font-size: 1.8rem; color: var(--clr-forest); margin-bottom: 1rem;">Bar and Restaurant Dining</h3>
                    <p style="font-size: 1.1rem; line-height: 1.8; color: var(--clr-text); margin-bottom: 1.5rem;">
                        Prefer dining in more informal surroundings? Our Kings Court Hotel menus can be served in our popular, relaxed Twisted Boot Bar, for relaxed and comfortable dining.
                    </p>
                    <p style="font-size: 1.1rem; line-height: 1.8; color: var(--clr-text);">
                        Relax by our roaring log fire in winter or in our tranquil courtyard area during the spring and summer months. It's a great place to meet up for a pint, or a coffee, a catch up with friends or a relaxed lunch in our beautiful location, in Kings Coughton, Alcester, Warwickshire.
                    </p>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 4rem;">
                <div style="background: var(--clr-white); padding: 2.5rem; border-radius: var(--radius-md); text-align: center; box-shadow: var(--shadow-sm);">
                    <i class="fa-solid fa-utensils" style="font-size: 2.5rem; color: var(--clr-gold); margin-bottom: 1.5rem;"></i>
                    <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--clr-forest); margin-bottom: 1rem;">Great Menu Choices</h3>
                    <p style="color: var(--clr-text-light); margin-bottom: 1.5rem;">
                        Twisted Boot has an excellent bar menu, with many beers, ales and an extensive Wine List. All with a great selection of vegetarian, vegan and gluten-free options.
                    </p>
                    <ul style="list-style: none; padding: 0; margin-bottom: 2rem; text-align: left; display: inline-block;">
                        <li style="margin-bottom: 0.5rem;"><i class="fa-solid fa-check" style="color: var(--clr-gold); margin-right: 0.5rem;"></i> Lunch Menu</li>
                        <li style="margin-bottom: 0.5rem;"><i class="fa-solid fa-check" style="color: var(--clr-gold); margin-right: 0.5rem;"></i> Sunday Lunch Sample Menu</li>
                        <li style="margin-bottom: 0.5rem;"><i class="fa-solid fa-check" style="color: var(--clr-gold); margin-right: 0.5rem;"></i> Evening Menu</li>
                        <li style="margin-bottom: 0.5rem;"><i class="fa-solid fa-check" style="color: var(--clr-gold); margin-right: 0.5rem;"></i> Christmas Dining</li>
                    </ul>
                    <a href="assets/menus/dinner-menu.pdf" download class="btn btn--outline-gold" style="display: inline-block;">View our Selection of Menus</a>
                </div>
                <div style="background: var(--clr-forest); color: var(--clr-cream); padding: 2.5rem; border-radius: var(--radius-md); text-align: center; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; justify-content: center;">
                    <i class="fa-solid fa-comments" style="font-size: 2.5rem; color: var(--clr-gold); margin-bottom: 1.5rem;"></i>
                    <h3 style="font-family: var(--font-serif); font-size: 1.8rem; margin-bottom: 1rem; color: var(--clr-cream);">Join Us Today</h3>
                    <p style="margin-bottom: 1.5rem; font-size: 1.1rem;">
                        Why not pop in after work, lunch time or the weekend for a drink or two. We'd be delighted to welcome you.
                    </p>
                    <a href="mailto:info@kingscourthotel.co.uk" class="btn btn--primary" style="display: inline-block;"><i class="fa-regular fa-envelope"></i> info@kingscourthotel.co.uk</a>
                </div>
            </div>
        </div>
    </section>
""" + footer_content

with open('/Users/vikramjeetsingh/Desktop/work/starsupermarket/hotel/twisted-boot-bar.html', 'w', encoding='utf-8') as new_f:
    new_f.write(new_page_content)
print("twisted-boot-bar.html created successfully!")
