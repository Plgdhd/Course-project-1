document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton');
    const loginModal = document.getElementById('loginModal');
    const loginForm = document.getElementById('loginForm');

    if (loginButton && loginModal && loginForm) {
        loginButton.addEventListener('click', () => {
            loginModal.classList.add('active');
        });

        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                loginModal.classList.remove('active');
            }
        });

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            console.log('Login attempt:', { firstName, lastName, email, password });
            
            loginModal.classList.remove('active');
            loginForm.reset();
        });
    }

    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const slideInterval = 10000;

    function updateSlides(nextSlide) {
        slides[nextSlide].classList.add('active');
        slides[nextSlide].classList.remove('previous');
    
        slides[currentSlide].classList.add('previous');
        slides[currentSlide].classList.remove('active');
        currentSlide = nextSlide;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        updateSlides(next);
    }

    const cardSets = document.querySelectorAll('.card-set');
    let currentCardSet = 0;
    const cardSetInterval = 10000;

    function updateCardSets(nextSet) {
        cardSets[currentCardSet].classList.remove('active');
        dots[currentCardSet].classList.remove('active');

        currentCardSet = nextSet;
        
        cardSets[currentCardSet].classList.add('active');
        dots[currentCardSet].classList.add('active');

        if (window.innerWidth <= 768) {
            const destinations = document.querySelector('.destinations');
            destinations.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    function nextCardSet() {
        const next = (currentCardSet + 1) % cardSets.length;
        updateCardSets(next);
    }

    setInterval(nextSlide, slideInterval);
    setInterval(nextCardSet, cardSetInterval);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (index !== currentCardSet) {
                updateCardSets(index);
            }
        });
    });

    let touchStartX = 0;
    let touchEndX = 0;

    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (Math.abs(diffX) > swipeThreshold) {
                if (diffX > 0) {
                    nextSlide();
                } else {
                    const prev = (currentSlide - 1 + slides.length) % slides.length;
                    updateSlides(prev);
                }
            }
        }
    }

    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
}); 