document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const flightCode = urlParams.get('code');

    if (!flightCode) {
        console.warn('Используются тестовые данные, код рейса не указан');
        const testData = {
            code: 'BE-101',
            from_city: 'Минск',
            to_city: 'Париж',
            departure_time: '2024-05-20T10:00:00',
            arrival_time: '2024-05-20T12:30:00',
            price: 299,
            aircraft: 'Boeing 737-800'
        };
        updateFlightCard(testData);
        return;
    }

    loadFlightData(flightCode);

    document.querySelector('.book-btn')?.addEventListener('click', function () {
        bookFlight(flightCode);
    });
});

async function loadFlightData(flightCode) {
    try {
        const flightCard = document.querySelector('.flight-card');
        flightCard?.classList.add('loading');

        const response = await fetch(`http://localhost:8080/flights/getFlight?code=${flightCode}`);

        if (!response.ok) {
            throw new Error(response.status === 404
                ? 'Рейс не найден'
                : `Ошибка сервера: ${response.status}`);
        }

        const flightData = await response.json();
        console.log('Данные с сервера:', flightData);

        const adaptedData = {
            code: flightData.code,
            from_city: flightData.from || flightData.from_city,
            to_city: flightData.to || flightData.to_city,
            departure_time: flightData.departure_date || "2024-05-20T11:30:00",
            arrival_time: flightData.arrival_date || "2024-05-20T14:00:00",
            price: flightData.price,
            aircraft: flightData.aircraft || "Не указан"
        };

        // Валидация
        if (!adaptedData.code || !adaptedData.from_city || !adaptedData.to_city) {
            throw new Error('Некорректные данные рейса');
        }

        updateFlightCard(adaptedData);
    } catch (error) {
        console.error('Ошибка загрузки:', error);
        showError(error.message);
    } finally {
        document.querySelector('.flight-card')?.classList.remove('loading');
    }
}

function updateFlightCard(data) {
    try {
        setTextContent('.flight-code', data.code);
        setTextContent('.from-city', data.from_city);
        setTextContent('.to-city', data.to_city);

        const departure = new Date(data.departure_time);
        const arrival = new Date(data.arrival_time);

        setTextContent('.departure-time', formatTime(departure));
        setTextContent('.arrival-time', formatTime(arrival));
        setTextContent('.departure-date', formatDate(departure));
        setTextContent('.arrival-date', formatDate(arrival));

        setTextContent('.duration', calculateDuration(departure, arrival));
        setTextContent('.aircraft', data.aircraft);
        setTextContent('.amount', data.price?.toLocaleString('ru-RU') || '299');

        document.querySelector('.flight-card').style.display = 'block';
    } catch (error) {
        console.error('Ошибка обновления:', error);
        showError('Ошибка отображения: ' + error.message);
    }
}

function setTextContent(selector, text) {
    const element = document.querySelector(selector);
    if (!element) {
        console.error(`Элемент ${selector} не найден`);
        return;
    }
    element.textContent = text;
}

function formatTime(date) {
    return date.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatDate(date) {
    return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

function calculateDuration(departure, arrival) {
    const diff = arrival - departure;
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    return `${hours}ч ${minutes}м`;
}

function showError(message) {
    const errorBox = document.querySelector('.error-box');
    if (errorBox) {
        errorBox.textContent = message;
        errorBox.style.display = 'block';
    } else {
        alert(message);
    }
}
