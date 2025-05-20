document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('https://course-project-1-production-ad8a.up.railway.app/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error("Неверный логин или пароль");
            }

            const userData = await response.json();
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("isLogin", "1");
            console.log('Вход успешен, значение изменено на 1');
            window.location.href = 'profile.html';
        } catch (error) {
            console.error("Ошибка при входе:", error);
            alert("Ошибка входа. Проверьте данные и попробуйте снова.");
        }
    });
});
