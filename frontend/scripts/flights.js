const flightsList = document.querySelector('.flights-list');
const fromInput = document.querySelector('.flights-filter input[placeholder="Откудa"]');
const toInput = document.querySelector('.flights-filter input[placeholder="Куда"]');
const dateInput = document.querySelector('.flights-filter input[type="date"][placeholder="Дата"]');


let allFlights = [];

document.addEventListener('DOMContentLoaded', () => {
    loadFlights();

    fromInput.addEventListener('input', filterFlights);
    toInput.addEventListener('input', filterFlights);
    dateInput.addEventListener('input', filterFlights);
});

async function loadFlights() {
    try {
        const response = await fetch('https://course-project-1-production-ad8a.up.railway.app/flights');
        allFlights = await response.json();
        console.log('Загруженные рейсы:', allFlights);

        applySearchParams(); 
        filterFlights();     
    } catch (error) {
        console.error('Ошибка загрузки рейсов:', error);
    }
}

function filterFlights() {
    const fromQuery = fromInput.value.toLowerCase();
    const toQuery = toInput.value.toLowerCase();
    const selectedDate = dateInput.value;

    const filtered = allFlights.filter(flight => {
        const matchesFrom = flight.from.toLowerCase().includes(fromQuery);
        const matchesTo = flight.to.toLowerCase().includes(toQuery);

        let matchesDate = true;
        /*if (selectedDate) {
            const flightDate = flight.departure_date.split('T')[0]; 
            matchesDate = (flightDate === selectedDate);
        }*/

        return matchesFrom && matchesTo && matchesDate;
    });

    renderFlights(filtered);
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

        const formattedDeparture = formatDateTime(flight.departure_date);
        const formattedArrival = formatDateTime(flight.arrival_date);

        flightCard.innerHTML = `
            <div class="flight-info">
                <h3>${flight.code}</h3>
                <p>${flight.from} → ${flight.to}</p>
                <p>${formattedDeparture} - ${formattedArrival}</p>
            </div>
            <div class="flight-price">
                <p>от ${flight.price}€</p>
                <button class="book-btn" data-code="${flight.code}">Забронировать</button>
            </div>
        `;

        const bookBtn = flightCard.querySelector('.book-btn');
        bookBtn.addEventListener('click', () => {
            window.location.href = `flight-card.html?code=${flight.code}`;
        });

        flightsList.appendChild(flightCard);
    });
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

function formatDateTime(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString('ru-RU', {
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit'
    }).replace(',', '');
}
