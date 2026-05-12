document.addEventListener("DOMContentLoaded", () => {
    
    // 1. DYNAMIC HEADER & FOOTER LOADING FROM ROOT
    const loadComponent = (id, path) => {
        fetch(path)
            .then(response => response.text())
            .then(data => {
                const element = document.getElementById(id);
                if(element) {
                    element.innerHTML = data;
                    
                    // Re-initialize mobile menu
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

    // 2. SCROLL REVEAL ANIMATION
    const observerOptions = { threshold: 0.1 };
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


    // 3. FORM LOGIC (Shared for Login, Registration, and Success Page)
    
    // Logic for Enrollment Gateway (Login)
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const studentId = document.getElementById('studentId').value;
            alert(`Authentication Request Sent for Student ID: ${studentId}\n\nClarjon University secure connection established.`);
            loginForm.reset();
        });
    }

    // Logic for Official Registration Form
    const enrollmentForm = document.getElementById('enrollmentForm');
    if (enrollmentForm) {
        enrollmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Kunin ang pangalan mula sa input fields
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            
            // Ilipat ang user sa Success.html at ipasa ang pangalan sa URL
            window.location.href = `Success.html?first=${encodeURIComponent(firstName)}&last=${encodeURIComponent(lastName)}`;
        });
    }

    // Logic for Success Page (Para ipakita ang pangalan)
    const applicantNameSpan = document.getElementById('applicantName');
    if (applicantNameSpan) {
        // Basahin ang pangalan mula sa URL
        const urlParams = new URLSearchParams(window.location.search);
        const firstName = urlParams.get('first');
        const lastName = urlParams.get('last');
        
        // Kung may pangalan sa URL, ipalit doon sa span
        if (firstName && lastName) {
            applicantNameSpan.textContent = `${firstName} ${lastName}`;
        }
    }

});