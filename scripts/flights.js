document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.background-slideshow .slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    setInterval(nextSlide, 5000);
});

document.addEventListener('DOMContentLoaded', function() {
    const searchTabs = document.querySelectorAll('.search-tab');
    const returnDateField = document.querySelector('.return-date');

    searchTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            searchTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            if (this.dataset.tab === 'round-trip') {
                returnDateField.style.display = 'block';
            } else {
                returnDateField.style.display = 'none';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.querySelector('.search-form');
    const searchButton = document.querySelector('.search-button');

    searchButton.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Поиск рейсов...');
    });
}); 