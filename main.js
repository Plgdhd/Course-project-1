document.addEventListener('DOMContentLoaded', () => {
    // Login modal functionality
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
    const slideInterval = 1000;


    function updateSlides(nextSlide) {
        slides[currentSlide].classList.remove('previous');
        slides[currentSlide].classList.add('active');
        currentSlide = nextSlide;
        setTimeout(() => {
            slides.forEach(slide => {
                if (slide !== slides[currentSlide]) {
                    slide.classList.remove('previous');
                }
            });
        }, 800);
    }

    function nextSlide() {
        next = (currentSlide + 1) % slides.length;
        updateSlides(next);
    }

    const cardSets = document.querySelectorAll('.card-set');
    let currentCardSet = 0;
    const cardSetInterval = 10000;

    function updateCardSets(nextSet) {
        cardSets[currentCardSet].classList.remove('active');

        dots[currentCardSet].classList.remove('active');

        currentCardSet = nextSet;
        cardSets[currentCardSet].classList.remove('previous');
        cardSets[currentCardSet].classList.add('active');
        dots[currentCardSet].classList.add('active');

        setTimeout(() => {
            cardSets.forEach(set => {
                if (set !== cardSets[currentCardSet]) {
                    set.classList.remove('previous');
                }
            });
        }, 1600);
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

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                const prev = (currentSlide - 1 + slides.length) % slides.length;
                updateSlides(prev);
            }
        }
    }
}); 