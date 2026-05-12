document.addEventListener("DOMContentLoaded", () => {
    
    // 1. DYNAMIC HEADER & FOOTER LOADING
    const loadComponent = (id, path) => {
        fetch(path)
            .then(response => response.text())
            .then(data => {
                const element = document.getElementById(id);
                if(element) {
                    element.innerHTML = data;
                    
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
                }
            })
            .catch(err => console.error(`Error loading ${path}:`, err));
    };

    loadComponent('header-container', '../header.html');
    loadComponent('footer-container', '../footer.html');

    // 2. ELEGANT SCROLL REVEAL ANIMATION
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => scrollObserver.observe(el));

    // 3. SUPPORT TICKET LOGIC (Pop-up and 5-sec Redirect)
    const ticketForm = document.getElementById('supportTicketForm');
    const successOverlay = document.getElementById('ticketSuccessOverlay');
    const refDisplay = document.getElementById('refDisplay');

    if (ticketForm) {
        ticketForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Generate a random Reference Number
            const refNumber = "CU-IT-" + Math.floor(Math.random() * 900000 + 100000);
            
            // Display the pop-up and the generated reference number
            if(refDisplay) refDisplay.textContent = refNumber;
            if(successOverlay) successOverlay.classList.add('show-popup');

            // 5-Second Countdown then Redirect to the Institutional Homepage
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 5000);
        });
    }

});