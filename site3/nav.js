// nav.js (NAVIGATION & FETCH LOGIC ONLY)

document.addEventListener("DOMContentLoaded", function() {
    
    // Kukunin nito ang data-path para hindi mag-error kapag nasa sub-folder
    const pathPrefix = document.body.getAttribute('data-path') || '';

    // 1. DYNAMICALLY LOAD HEADER
    fetch(pathPrefix + 'header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
            
            // Navbar Scroll Logic 
            const navbar = document.getElementById('siteNav');
            if (navbar) {
                window.addEventListener('scroll', () => {
                    if (window.scrollY > 50) {
                        navbar.classList.add('is-scrolled');
                    } else {
                        navbar.classList.remove('is-scrolled');
                    }
                });
            }

            // Mobile Menu Toggle Logic
            const menuBtn = document.getElementById('menuTrigger');
            const navMenu = document.getElementById('navMenu');
            
            if (menuBtn && navMenu) {
                menuBtn.addEventListener('click', function() {
                    this.classList.toggle('is-active');
                    navMenu.classList.toggle('is-open');
                });
            }
        })
        .catch(error => console.error("Error loading header:", error));

    // 2. DYNAMICALLY LOAD FOOTER
    fetch(pathPrefix + 'footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        })
        .catch(error => console.error("Error loading footer:", error));

});