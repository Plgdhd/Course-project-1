document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const name = document.getElementById('fullname').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const termsChecked = document.getElementById('terms').checked;

        if (!termsChecked) {
            alert("Вы должны согласиться с условиями.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Пароли не совпадают.");
            return;
        }

        try {
            const response = await fetch('https://course-project-1-production-ad8a.up.railway.app/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    flights : []
                })
            });

            const result = await response.text();

            if (result === 'Success') {
                window.location.href = 'login.html';
            } else {
                alert("Ошибка: " + result);
                window.location.href = 'register.html';
            }
        } catch (error) {
            console.error("Ошибка при отправке запроса:", error);
            alert("Произошла ошибка. Попробуйте позже.");
        }
    });
});
