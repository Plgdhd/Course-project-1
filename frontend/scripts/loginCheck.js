document.addEventListener("DOMContentLoaded", function () {
    const isLogin = localStorage.getItem("isLogin");

    let navbarHtml = '';

    if (isLogin === "1") {
        navbarHtml = `
                <div class="logo">Belines</div>
                <div class="nav-links">
                    <a href="../index.html">Главная</a>
                    <a href="flights.html">Рейсы</a>
                    <a href="about.html">О нас</a>
                    <a href="profile.html"> Профиль </a>
                </div>
                <div class="auth-buttons">
                    <button id="exit-btn" class="login-btn" onclick="window.location.href='login.html'">Выйти</button>
                </div>
        `;
    } else {
        navbarHtml = `
                <div class="logo">Belines</div>
                <div class="nav-links">
                    <a href="../index.html" >Главная</a>
                    <a href="flights.html">Рейсы</a>
                    <a href="about.html">О нас</a>
                </div>
                <div class="auth-buttons">
                    <button class="login-btn" onclick="window.location.href='login.html'">Войти</button>
                    <button class="signup-btn" onclick="window.location.href='register.html'">Регистрация</button>
                </div>
        `;
    }

    document.getElementById("navbar-container").innerHTML = navbarHtml;
});
