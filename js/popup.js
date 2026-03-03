function initNewsletterPopup() {
    // Inject Popup HTML if not exists
    if (!document.getElementById("newsletter-popup")) {
        const popupHTML = `
        <div class="popup-overlay" id="newsletter-popup" role="dialog" aria-modal="true" aria-labelledby="popup-title">
            <div class="popup-content">
                <button class="popup-close" id="popup-close" aria-label="Close popup">&times;</button>
                
                <div class="popup-header" id="popup-header-section">
                    <h2 class="popup-title" id="popup-title">Stay & Connect</h2>
                    <p class="popup-desc">Subscribe to our newsletter and get in touch for exclusive Kings Court offers.</p>
                </div>

                <form class="popup-form" id="popup-form">
                    <div class="form-group">
                        <label for="popup-name">Full Name</label>
                        <input type="text" id="popup-name" name="name" required autocomplete="name" placeholder="John Doe">
                    </div>
                    <div class="form-group">
                        <label for="popup-email">Email Address</label>
                        <input type="email" id="popup-email" name="email" required autocomplete="email" placeholder="john@example.com">
                    </div>
                    <div class="form-group">
                        <label for="popup-phone">Phone Number</label>
                        <input type="tel" id="popup-phone" name="phone" required autocomplete="tel" placeholder="+44 1789...">
                    </div>
                    <!-- Note: To store in excel sheets directly from frontend, replace action URL with Google Apps Script Web App URL -->
                    <button type="submit" class="btn btn--primary popup-btn" id="popup-submit-btn">Subscribe & Connect</button>
                </form>

                <div class="popup-success" id="popup-success">
                    <i class="fa-solid fa-circle-check"></i>
                    <h3>Thank You!</h3>
                    <p>Your details have been registered successfully.</p>
                </div>
            </div>
        </div>
        `;
        document.body.insertAdjacentHTML('beforeend', popupHTML);
    }

    const popup = document.getElementById("newsletter-popup");
    const closeBtn = document.getElementById("popup-close");
    const form = document.getElementById("popup-form");
    const successMsg = document.getElementById("popup-success");
    const headerSec = document.getElementById("popup-header-section");

    // Check if user already saw the popup (renamed to v2 so it resets for you during testing)
    const popupSeen = localStorage.getItem("kingsCourtPopupSeen_v2");

    // FOR TESTING: You can temporarily uncomment the next line to always show the popup
    // localStorage.removeItem("kingsCourtPopupSeen_v2");

    if (!popupSeen) {
        // Show popup after 2 seconds
        setTimeout(() => {
            popup.classList.add("active");
            document.body.style.overflow = "hidden"; // Prevent scrolling
        }, 2000);
    }

    // Add manual trigger for popup if any button has class 'open-newsletter-popup'
    document.addEventListener("click", function (e) {
        if (e.target.closest('.open-newsletter-popup')) {
            e.preventDefault();
            popup.classList.add("active");
            document.body.style.overflow = "hidden";

            // Reset state if it was previously submitted
            form.classList.remove("hidden");
            headerSec.style.display = "block";
            successMsg.classList.remove("active");
        }
    });

    function closePopup() {
        popup.classList.remove("active");
        document.body.style.overflow = "";
        localStorage.setItem("kingsCourtPopupSeen_v2", "true");
    }

    closeBtn.addEventListener("click", closePopup);

    // Close on click outside
    popup.addEventListener("click", function (e) {
        if (e.target === popup) {
            closePopup();
        }
    });

    // Form connection to Google Sheets (Conceptual/Placeholder)
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const submitBtn = document.getElementById("popup-submit-btn");
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Connecting...";
        submitBtn.disabled = true;

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        fetch('/api/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(result => {
            console.log("Success:", result);
            form.classList.add("hidden");
            headerSec.style.display = "none";
            successMsg.classList.add("active");
            localStorage.setItem("kingsCourtPopupSeen_v2", "true");
            setTimeout(closePopup, 3000);
        }).catch(err => {
            console.error("Error saving data:", err);
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
}

// Ensure the popup initializes regardless of execution order and defer attributes
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNewsletterPopup);
} else {
    initNewsletterPopup();
}
