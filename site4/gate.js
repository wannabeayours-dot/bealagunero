// UNIFIED ADMIN SCRIPTS 

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. SCROLL REVEAL ANIMATION
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


    // 2. ADMIN LOGIN LOGIC (Demo Authentication)
    const adminLoginForm = document.getElementById('adminLoginForm');
    
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Pipigilan mag-refresh ang page

            // Kunin ang tinype na values
            const emailInput = document.getElementById('adminEmail').value.trim();
            const passInput = document.getElementById('adminPass').value.trim();

            // Hardcoded Demo Credentials
            if (emailInput === 'admin' && passInput === 'admin') {
                // Kapag tama, ipapadala sa Admin Dashboard (gawa ka ng Portal.html mamaya)
                alert("Credentials Verified. Establishing secure connection to the Institutional High Command.");
                window.location.href = 'Portal.html';
            } else {
                // Kapag mali, mag-e-error
                alert("ACCESS DENIED: Unauthorized entry attempt. Invalid administrator credentials.");
                
                // Clear password field for security
                document.getElementById('adminPass').value = '';
            }
        });
    }

});