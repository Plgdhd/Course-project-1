document.addEventListener("DOMContentLoaded", () => {
    const userRaw = localStorage.getItem("user");

    if (!userRaw) {
        window.location.href = 'login.html';
        return;
    }

    const user = JSON.parse(userRaw);

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

    const bookingList = document.querySelector(".booking-list");
    if (bookingList) {
        bookingList.innerHTML = "";

        if (user.flights && user.flights.length > 0) {
            user.flights.forEach(flight => {
                const card = document.createElement("div");
                card.className = "booking-card";
                card.innerHTML = `
                    <h3>Рейс: ${flight}</h3>
                    <p>Дата вылета: —</p>
                    <p>Статус: Ожидается</p>
                `;
                bookingList.appendChild(card);
            });
        } else {
            bookingList.innerHTML = "<p>Нет бронирований.</p>";
        }
    }
});
