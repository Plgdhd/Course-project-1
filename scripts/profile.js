document.addEventListener('DOMContentLoaded', () => {
    // Обработка формы настроек профиля
    const profileForm = document.querySelector('.profile-settings');
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Получаем значения полей формы
            const formData = new FormData(profileForm);
            const userData = Object.fromEntries(formData.entries());
            
            // Здесь можно добавить отправку данных на сервер
            console.log('Сохранение данных профиля:', userData);
            
            // Показываем уведомление об успешном сохранении
            alert('Изменения успешно сохранены!');
        });
    }

    // Обработка загрузки аватара
    const avatarImg = document.querySelector('.profile-avatar img');
    if (avatarImg) {
        avatarImg.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            
            input.onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        avatarImg.src = e.target.result;
                        // Здесь можно добавить отправку аватара на сервер
                        console.log('Загрузка нового аватара');
                    };
                    reader.readAsDataURL(file);
                }
            };
            
            input.click();
        });
    }
}); 