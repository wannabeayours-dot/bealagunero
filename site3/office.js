document.addEventListener("DOMContentLoaded", () => {
    
    // 1. DYNAMIC HEADER & FOOTER LOADING FROM ROOT
    const loadComponent = (id, path) => {
        fetch(path)
            .then(response => response.text())
            .then(data => {
                document.getElementById(id).innerHTML = data;
                
                // Re-initialize mobile menu logic after header loads
                if(id === 'header-container') {
                    const menuBtn = document.getElementById('menuTrigger');
                    const navMenu = document.getElementById('navMenu');
                    if(menuBtn) {
                        menuBtn.addEventListener('click', () => {
                            menuBtn.classList.toggle('is-active');
                            navMenu.classList.toggle('is-open');
                        });
                    }
                }
            })
            .catch(err => console.error(`Error loading ${path}:`, err));
    };

    // Load from one folder level up (../)
    loadComponent('header-container', '../header.html');
    loadComponent('footer-container', '../footer.html');

    // 2. SCROLL REVEAL ANIMATION
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // Animates only once
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => scrollObserver.observe(el));
});