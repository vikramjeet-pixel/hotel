import os
import glob

html_files = glob.glob("*.html")

newsletter_snippet = """            <!-- Newsletter -->
            <div class="footer__newsletter">
                <div class="footer__newsletter-text">
                    <h3 class="footer__col-title" style="margin-bottom:0.5rem; color:var(--clr-gold); font-size: 0.9rem;">Subscribe to our Newsletter</h3>
                    <p style="font-size:0.9rem; color:rgba(245, 241, 232, 0.8); margin-bottom:0;">Exclusive offers and news straight to your inbox.</p>
                </div>
                <!-- Inline script handled directly for UI feedback on subscribe -->
                <form class="footer__newsletter-form" onsubmit="event.preventDefault(); this.innerHTML = '<div style=\\'display:flex; align-items:center; gap:0.5rem; color:var(--clr-gold); font-size:1rem; font-family:var(--font-sans); margin-top:0.5rem;\\'><i class=\\'fa-solid fa-circle-check\\'></i> You are now subscribed!</div>';">
                    <input class="footer__newsletter-input" type="email" name="email" placeholder="Email Address" required aria-label="Email Address" autocomplete="email">
                    <button type="submit" class="btn btn--primary" style="padding:0.8rem 1.8rem; letter-spacing:0.1em;">Subscribe</button>
                </form>
            </div>
"""

for f in html_files:
    with open(f, "r") as file:
        content = file.readlines()
    
    modified = False
    new_content = []
    
    if "footer__newsletter" in "".join(content):
        print(f"Already has newsletter in {f}")
        continue

    for line in content:
        if '<div class="footer__top">' in line:
            new_content.append(newsletter_snippet)
            modified = True
            
        new_content.append(line)
            
    if modified:
        with open(f, "w") as file:
            file.writelines(new_content)
        print(f"Added newsletter footer to {f}")
print("Done")
