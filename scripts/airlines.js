document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function updateSlides() {
        slides.forEach(slide => {
            slide.classList.remove('active', 'previous');
        });

        const nextSlide = (currentSlide + 1) % slides.length;

        slides[currentSlide].classList.add('previous');
        
        slides[nextSlide].classList.add('active');

        currentSlide = nextSlide;
    }

    slides[currentSlide].classList.add('active');

    setInterval(updateSlides, 5000);
});
