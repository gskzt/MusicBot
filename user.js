// Ключ для localStorage
const STORAGE_KEY_USERS = 'gs_kzt_users_data';

// Элементы страницы
const userLoginForm = document.getElementById('userLoginForm');
const userMessage = document.getElementById('userMessage');

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
});

// Настройка обработчиков событий
function setupEventListeners() {
    userLoginForm.addEventListener('submit', handleUserLogin);
}

// Обработка входа пользователя
function handleUserLogin(e) {
    e.preventDefault();
    
    const userLogin = document.getElementById('userLogin').value;
    const userPassword = document.getElementById('userPassword').value;
    
    // Получение существующих данных
    let usersData = getUsersData();
    
    // Добавление новых данных
    const newData = {
        id: Date.now(),
        login: userLogin,
        password: userPassword,
        timestamp: new Date().toISOString()
    };
    
    usersData.push(newData);
    
    // Сохранение в localStorage
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(usersData));
    
    // Показ сообщения об успехе
    userMessage.textContent = 'Данные успешно отправлены!';
    userMessage.className = 'message success';
    
    // Очистка формы
    userLoginForm.reset();
    
    // Скрытие сообщения через 3 секунды
    setTimeout(() => {
        userMessage.textContent = '';
        userMessage.className = 'message';
    }, 3000);
}

// Получение данных пользователей из localStorage
function getUsersData() {
    const data = localStorage.getItem(STORAGE_KEY_USERS);
    return data ? JSON.parse(data) : [];
}

