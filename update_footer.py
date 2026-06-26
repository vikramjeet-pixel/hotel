import os

# Define the new standardized footer HTML block
new_footer_block = """    <footer class="footer" id="footer" role="contentinfo">
        <div class="container">

            <!-- Newsletter -->
            <div class="footer__newsletter">
                <div class="footer__newsletter-text">
                    <h3 class="footer__col-title"
                        style="margin-bottom:0.5rem; color:var(--clr-gold); font-size: 0.9rem;">Subscribe to our
                        Newsletter</h3>
                    <p style="font-size:0.9rem; color:rgba(245, 241, 232, 0.8); margin-bottom:0;">Exclusive offers and
                        news straight to your inbox.</p>
                </div>
                <!-- Inline script handled directly for UI feedback on subscribe -->
                <form class="footer__newsletter-form"
                    onsubmit="event.preventDefault(); const form = this; const btn = form.querySelector('button'); btn.textContent = 'Wait...'; btn.disabled = true; fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: form.email.value }) }).then(res => { if(res.ok) { form.innerHTML = '<div style=\\'display:flex; align-items:center; gap:0.5rem; color:var(--clr-gold); font-size:1rem; font-family:var(--font-sans); margin-top:0.5rem;\\'><i class=\\'fa-solid fa-circle-check\\'></i> You are now subscribed!</div>'; } else { throw new Error('Failed'); } }).catch(() => { btn.textContent = 'Subscribe'; btn.disabled = false; alert('Error: Unable to subscribe'); });">
                    <input class="footer__newsletter-input" type="email" name="email" placeholder="Email Address"
                        required aria-label="Email Address" autocomplete="email">
                    <button type="submit" class="btn btn--primary"
                        style="padding:0.8rem 1.8rem; letter-spacing:0.1em;">Subscribe</button>
                </form>
            </div>
            <div class="footer__top">

                <!-- Brand -->
                <div class="footer__brand">
                    <div class="footer__brand-name">Kings Court</div>
                    <div class="footer__brand-tagline" style="margin-bottom: 0.5rem;">Hotel · Est. 1642</div>
                    <div style="font-size: 0.72rem; letter-spacing: 0.05em; color: rgba(245, 241, 232, 0.8); margin-bottom: 1.25rem; font-family: var(--font-sans);">
                        Proudly part of the <a href="https://www.bestwestern.co.uk/?_gl=1*1t3q5ez*_up*MQ..*_gs*MQ..&gclid=CjwKCAjw9NjRBhATEiwA_p2J8evGTTBs0pSYfLhGKbJHrkZMftXG6sGn0NAMd4YOdEcxJP6GPCwqcRoC48gQAvD_BwE" target="_blank" rel="noopener" style="color: var(--clr-gold); text-decoration: none; font-weight: 600;">Best Western</a> chain
                    </div>
                    <p class="footer__brand-desc">
                        A magnificent Tudor manor house set within 4 acres of private Warwickshire countryside.
                        Where history, comfort, and nature unite.
                    </p>
                    <div class="footer__social" aria-label="Social media links">
                        <a href="https://www.facebook.com/p/Kings-Court-Hotel-100063770730963/"
                            class="footer__social-link" aria-label="Follow us on Facebook">
                            <i class="fa-brands fa-facebook-f" aria-hidden="true"></i>
                        </a>
                        <a href="https://www.instagram.com/kings_court_hotel/" class="footer__social-link"
                            aria-label="Follow us on Instagram">
                            <i class="fa-brands fa-instagram" aria-hidden="true"></i>
                        </a>
                        <a href="https://x.com/Kingscourthotel" class="footer__social-link"
                            aria-label="Follow us on Twitter/X">
                            <i class="fa-brands fa-x-twitter" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>

                <!-- Stay & Rooms -->
                <nav aria-label="Stay and Rooms footer navigation">
                    <div class="footer__col-title">Stay &amp; Rooms</div>
                    <ul class="footer__links" role="list">
                        <li><a href="rooms.html" class="footer__link">Rooms &amp; Suites</a></li>
                        <li><a href="room-detail.html?room=single" class="footer__link">Single Room</a></li>
                        <li><a href="room-detail.html?room=standard-double" class="footer__link">Double Room</a></li>
                        <li><a href="room-detail.html?room=king" class="footer__link">King Room</a></li>
                        <li><a href="room-detail.html?room=twin" class="footer__link">Twin Room</a></li>
                        <li><a href="room-detail.html?room=quad" class="footer__link">Quad Room</a></li>
                        <li><a href="groups.html" class="footer__link">Group Bookings</a></li>
                        <li><a href="corporate-stays.html" class="footer__link">Corporate Stays</a></li>
                        <li><a href="booking.html" class="footer__link">Book Your Stay</a></li>
                    </ul>
                </nav>

                <!-- Dining & Events -->
                <nav aria-label="Dining and Events footer navigation">
                    <div class="footer__col-title">Dining &amp; Events</div>
                    <ul class="footer__links" role="list">
                        <li><a href="dining.html" class="footer__link">The Restaurant</a></li>
                        <li><a href="dining.html#dn-restaurant" class="footer__link">Restaurant &amp; Brasserie</a></li>
                        <li><a href="twisted-boot-bar.html" class="footer__link">Twisted Boot Pub</a></li>
                        <li><a href="dining.html#dn-tea" class="footer__link">Afternoon Tea</a></li>
                        <li><a href="dining.html#dn-reserve" class="footer__link">Book a Table</a></li>
                        <li><a href="weddings.html" class="footer__link">Weddings &amp; Celebrations</a></li>
                        <li><a href="conferences.html" class="footer__link">Conferences &amp; Corporate</a></li>
                        <li><a href="events.html" class="footer__link">Special Events</a></li>
                        <li><a href="twisted-boot-bar.html#regular-events" class="footer__link">Regular Pub Events</a></li>
                    </ul>
                </nav>

                <!-- Information -->
                <nav aria-label="Information footer navigation">
                    <div class="footer__col-title">Information</div>
                    <ul class="footer__links" role="list">
                        <li><a href="location.html" class="footer__link">Location &amp; Directions</a></li>
                        <li><a href="gallery.html" class="footer__link">Photo Gallery</a></li>
                        <li><a href="faq.html" class="footer__link">FAQs</a></li>
                        <li><a href="testimonials.html" class="footer__link">Guest Testimonials</a></li>
                        <li><a href="blog.html" class="footer__link">Blog &amp; News</a></li>
                        <li><a href="contact.html" class="footer__link">Contact Us</a></li>
                    </ul>
                </nav>

                <!-- Contact -->
                <div>
                    <div class="footer__col-title">Contact</div>
                    <div class="footer__contact-item">
                        <span class="footer__contact-icon" aria-hidden="true"><i class="fa-solid fa-phone"></i></span>
                        <a href="tel:01789763111" class="footer__contact-text">01789 763 111</a>
                    </div>
                    <div class="footer__contact-item">
                        <span class="footer__contact-icon" aria-hidden="true"><i
                                class="fa-solid fa-envelope"></i></span>
                        <a href="mailto:info@kingscourthotel.co.uk"
                            class="footer__contact-text">info@kingscourthotel.co.uk</a>
                    </div>
                    <div class="footer__contact-item">
                        <span class="footer__contact-icon" aria-hidden="true"><i
                                class="fa-solid fa-location-dot"></i></span>
                        <span class="footer__contact-text">Kings Court Hotel<br>Kings
                            Coughton<br>Alcester<br>Warwickshire<br>B49 5QQ</span>
                    </div>
                    <div class="footer__contact-item">
                        <span class="footer__contact-icon" aria-hidden="true"><i class="fa-regular fa-clock"></i></span>
                        <span class="footer__contact-text">Reception: 7:00 am to 11:00 pm<br>Check-in: 3pm · Check-out:
                            11am</span>
                    </div>
                </div>

            </div><!-- /.footer__top -->

            <div class="footer__bottom">
                <p class="footer__copyright">
                    &copy; <span id="footer-year"></span> Kings Court Hotel Ltd. All rights reserved.
                    <span class="footer__flowbyte" style="margin-left: 0.5rem;">| Powered by <a
                            href="https://flowbyte-wheat.vercel.app/index.html?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGn0WV1pTxV5fh2fciBs34u2GB-hqIJTrQAjTHVlCz1dlLYGThiXEFipBu7Cyo_aem_eFbH01EHMW8XiicLOTEGeQ"
                            target="_blank"
                            style="color: var(--clr-gold); text-decoration: none; font-weight: 600; letter-spacing: 0.05em;">FLOWBYTE</a></span>
                </p>
                <div class="footer__legal">
                    <a href="privacy-policy.html" class="footer__legal-link">Privacy Policy</a>
                    <a href="terms.html" class="footer__legal-link">Terms &amp; Conditions</a>
                    <a href="sitemap.xml" class="footer__legal-link">Sitemap</a>
                </div>
            </div>

        </div>
    </footer>"""

# List all html files in the directory
html_files = [f for f in os.listdir('.') if f.endswith('.html')]

updated_count = 0
for file in html_files:
    if file == 'google22c3e4b7e76d4823.html':
        continue
        
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Find start of footer
    start_footer = content.find('<footer')
    if start_footer == -1:
        print(f"Skipping {file}: No <footer tag found.")
        continue
        
    # 2. Find end of footer
    end_footer = content.find('</footer>', start_footer)
    if end_footer == -1:
        print(f"WARNING: Could not find matching closing </footer> tag in {file}")
        continue
    
    end_footer_index = end_footer + len('</footer>')
    
    # Replace content
    new_content = content[:start_footer] + new_footer_block + content[end_footer_index:]
    with open(file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Successfully updated: {file}")
    updated_count += 1

print(f"Done. Updated {updated_count} out of {len(html_files) - 1} target files.")
