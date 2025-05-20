document.addEventListener("DOMContentLoaded", async () => {
    const userRaw = localStorage.getItem("user");

    if (!userRaw) {
        window.location.href = 'login.html';
        return;
    }

    const user = JSON.parse(userRaw);
    const userEmail = user.email;
    let userFlights = [];

    async function loadUserFlights() {
        try {
            const response = await fetch(`https://course-project-1-production-ad8a.up.railway.app/flights/getUserFlights?email=${encodeURIComponent(userEmail)}`);
            userFlights = await response.json();
            localStorage.setItem('userFlights', JSON.stringify(userFlights));
            console.log('Рейсы загружены: ', userFlights);
        } catch (error) {
            console.log('Ошибка загрузки рейсов пользователя', error);
        }
    }

    await loadUserFlights();

    const greeting = document.querySelector("h1");
    if (greeting) {
        greeting.textContent = `Добро пожаловать, ${user.name}!`;
    }

    const profileInfo = document.querySelector(".profile-info");
    if (profileInfo) {
        profileInfo.innerHTML = `
            <p><strong>Имя:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Телефон:</strong> +375 ХХ ХХХ ХХ ХХ</p>
            <button class="profile-btn">Редактировать профиль</button>
        `;
    }

    const bookingList = document.getElementById("flights-list");
    if (bookingList) {
        bookingList.innerHTML = "";

        if (userFlights && userFlights.length > 0) {
            userFlights.forEach(flight => {
                const formattedDeparture = formatDateTime(flight.departure_date);
                const formattedArrival = formatDateTime(flight.arrival_date);

                const card = document.createElement("div");
                card.className = "flight-card";
                card.innerHTML = `
                    <div class="flight-info">
                        <h3>${flight.code}</h3>
                        <p>${flight.from} → ${flight.to}</p>
                        <p>${formattedDeparture} - ${formattedArrival}</p>
                    </div>
                    <div class="flight-price">
                        <p>от ${flight.price}€</p>
                        <button class="book-btn" data-code="${flight.code}">Отменить</button>
                    </div>
                `;
                bookingList.appendChild(card);
            });
        } else {
            bookingList.innerHTML = "<p>Нет бронирований.</p>";
        }
    }
    document.querySelector('.book-btn')?.addEventListener('click', function () {
        const userStr = localStorage.getItem('user');
        if(localStorage.getItem('isLogin') !=1){
            console.error("Пользователь на авторизован");
            return;
        }
        const code = this.dataset.code;
        const user = JSON.parse(userStr);
        const email = user.email;

        fetch('https://course-project-1-production-ad8a.up.railway.app/flights/deleteUserFlight', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email: email,
                flightcode: code
            })
        })
        .then(response => {
            if(!response.ok) throw new Error("failed to delete in front");
        })
        .then(data => {
            console.log("Рейс успешно добавлен:", data);
            location.reload();
        })
        .catch(error => {
            console.error("Произошла ошибка:", error);
        });


    });
});

function formatDateTime(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString('ru-RU', {
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit'
    }).replace(',', '');
}
