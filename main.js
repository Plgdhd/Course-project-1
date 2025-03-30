document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.querySelector('.search-form');
    const departureInput = document.getElementById('departure');
    const arrivalInput = document.getElementById('arrival');

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const departure = departureInput.value.trim();
        const arrival = arrivalInput.value.trim();
        
        if (departure && arrival) {
            console.log(`Searching flights from ${departure} to ${arrival}`);
        }
    });

    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const slideInterval = 5000;

    function updateSlides(nextSlide) {
        slides[currentSlide].classList.remove('active');
        slides[currentSlide].classList.add('previous');

        currentSlide = nextSlide;
        slides[currentSlide].classList.remove('previous');
        slides[currentSlide].classList.add('active');

        setTimeout(() => {
            slides.forEach(slide => {
                if (slide !== slides[currentSlide]) {
                    slide.classList.remove('previous');
                }
            });
        }, 800);
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
        cardSets[currentCardSet].classList.add('previous');
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