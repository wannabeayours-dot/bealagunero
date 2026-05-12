document.addEventListener("DOMContentLoaded", () => {
    
    // FETCHING HEADER AND FOOTER FROM ROOT
    const loadComponent = (id, path) => {
        fetch(path)
            .then(response => response.text())
            .then(data => {
                const element = document.getElementById(id);
                if(element) {
                    element.innerHTML = data;
                }
            })
            .catch(err => console.error(`Error loading ${path}:`, err));
    };

    // YUNG DUN SA LABAS PARA MA READ NG NEWS.HTML
    loadComponent('header-container', '../header.html');
    loadComponent('footer-container', '../footer.html');

    // Scroll Reveal Animation Initialization
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
});