// indexcontent.js (ANIMATIONS FOR INDEX PAGE ONLY)

document.addEventListener("DOMContentLoaded", function() {
    
    // SCROLL REVEAL ANIMATION
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.15 }); 

    revealElements.forEach(el => scrollObserver.observe(el));

    // ANIMATED STATS COUNTER
    const numberElements = document.querySelectorAll('.animate-number');
    const numberObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const duration = 2000; 
                const increment = target / (duration / 16); 

                let currentCount = 0;
                const updateCounter = () => {
                    currentCount += increment;
                    if (currentCount < target) {
                        counter.innerText = Math.ceil(currentCount).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target.toLocaleString();
                    }
                };
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    numberElements.forEach(num => numberObserver.observe(num));

});