document.addEventListener("DOMContentLoaded", () => {
    
    // Sidebar Toggle for Mobile Devices
    const menuToggle = document.getElementById('menuToggle');
    const portalSidebar = document.getElementById('portalSidebar');

    if (menuToggle && portalSidebar) {
        menuToggle.addEventListener('click', () => {
            portalSidebar.classList.toggle('is-open');
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
            if (!portalSidebar.contains(e.target) && !menuToggle.contains(e.target) && portalSidebar.classList.contains('is-open')) {
                portalSidebar.classList.remove('is-open');
            }
        }
    });

});