// js/popup.js
document.addEventListener("DOMContentLoaded", () => {
    const popupModal = document.getElementById("fifa-popup");
    const popupCloseBtn = document.getElementById("fifa-popup-close");

    if (popupModal) {
        // Show the popup after a small delay to allow animations and the hero section to render properly
        setTimeout(() => {
            popupModal.classList.add("active");
            document.body.style.overflow = "hidden"; // Prevent background scrolling
        }, 1000);

        // Close on clicking the cross button
        if (popupCloseBtn) {
            popupCloseBtn.addEventListener("click", () => {
                closePopup();
            });
        }

        // Close on clicking outside the modal content
        popupModal.addEventListener("click", (e) => {
            if (e.target === popupModal) {
                closePopup();
            }
        });

        // Optional: Close on Esc key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && popupModal.classList.contains("active")) {
                closePopup();
            }
        });

        function closePopup() {
            popupModal.classList.remove("active");
            document.body.style.overflow = ""; // Restore scrolling
        }
    }
});
