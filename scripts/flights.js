const flightsList = document.querySelector('.flights-list');
const fromInput = document.querySelector('.flights-filter input[placeholder="Откудa"]');
const toInput = document.querySelector('.flights-filter input[placeholder="Куда"]');
const dateInput = document.querySelector('.flights-filter input[type="date"]');

let allFlights = [];

async function loadFlights() {
    try {
        const response = await fetch('http://localhost:8080/flights');
        allFlights = await response.json();
        console.log('Загруженные рейсы:', allFlights);

        applySearchParams(); 
        filterFlights();     
    } catch (error) {
        console.error('Ошибка загрузки рейсов:', error);
    }
}

function renderFlights(flights) {
    flightsList.innerHTML = '';
    if (flights.length === 0) {
        flightsList.innerHTML = '<p>Рейсы не найдены</p>';
        return;
    }

    flights.forEach(flight => {
        const flightCard = document.createElement('div');
        flightCard.className = 'flight-card';
        flightCard.innerHTML = `
            <div class="flight-info">
                <h3>${flight.code}</h3>
                <p>${flight.from} → ${flight.to}</p>
                <p>${flight.time}</p>
            </div>
            <div class="flight-price">
                <p>от ${flight.price}€</p>
                <button class="book-btn">Забронировать</button>
            </div>
        `;
        flightsList.appendChild(flightCard);
    });
}

function filterFlights() {
    const fromQuery = fromInput.value.toLowerCase();
    const toQuery = toInput.value.toLowerCase();

    const filtered = allFlights.filter(flight =>
        flight.from.toLowerCase().includes(fromQuery) &&
        flight.to.toLowerCase().includes(toQuery)
    );

    renderFlights(filtered);
}

function applySearchParams() {
    const params = new URLSearchParams(window.location.search);

    if (params.has('from')) {
        fromInput.value = params.get('from');
    }
    if (params.has('to')) {
        toInput.value = params.get('to');
    }
    if (params.has('departureDate')) {
        dateInput.value = params.get('departureDate');
    }
}

fromInput.addEventListener('input', filterFlights);
toInput.addEventListener('input', filterFlights);

document.addEventListener('DOMContentLoaded', loadFlights);
