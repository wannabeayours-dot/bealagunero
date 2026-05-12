document.addEventListener("DOMContentLoaded", () => {
    
    // NAV FETCHING
    
    const loadComponent = (id, path) => {
        fetch(path)
            .then(response => response.text())
            .then(data => {
                document.getElementById(id).innerHTML = data;
                

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

    loadComponent('header-container', '../header.html');
    loadComponent('footer-container', '../footer.html');

    // FILTERING SYSTEM
    const filterButtons = document.querySelectorAll('.filter-btn');
    const exCards = document.querySelectorAll('.ex-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const category = btn.getAttribute('data-target');

            exCards.forEach(card => {
                card.classList.remove('fade-in');
                
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    card.classList.add('fade-in');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 3. SCROLL REVEAL FOR CARD
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    exCards.forEach(card => observer.observe(card));
});