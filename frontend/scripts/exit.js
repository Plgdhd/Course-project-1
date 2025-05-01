document.addEventListener("DOMContentLoaded", () => {
    const exitButton = document.getElementById("exit-btn");

    if (!exitButton) {
        console.warn("Кнопка с id='login-btn' не найдена.");
        return;
    }

    exitButton.addEventListener("click", function (e) {
        e.preventDefault();
        const isLogin = localStorage.getItem("isLogin");

        if (isLogin === "1") {
            localStorage.setItem("isLogin", "0");
            console.log("Выход выполнен, isLogin = 0");
            window.location.href = "login.html";
        } else {
            console.log("Пользователь не был авторизован");
        }
    });
});
