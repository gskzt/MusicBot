// Константы для админа
const ADMIN_USERNAME = 'shukrul1o';
const ADMIN_PASSWORD = 'Shukrullo2004*';

// Ключи для localStorage
const STORAGE_KEY_USERS = 'gs_kzt_users_data';
const STORAGE_KEY_ADMIN_AUTH = 'gs_kzt_admin_auth';

// Элементы страницы
const adminLoginPage = document.getElementById('adminLoginPage');
const adminPanel = document.getElementById('adminPanel');
const adminLoginForm = document.getElementById('adminLoginForm');
const adminLogoutBtn = document.getElementById('adminLogoutBtn');
const adminLoginMessage = document.getElementById('adminLoginMessage');
const usersDataContainer = document.getElementById('usersData');
const adminStats = document.getElementById('adminStats');

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    checkAdminAuth();
    setupEventListeners();
});

// Проверка авторизации админа
function checkAdminAuth() {
    const isAdminAuth = localStorage.getItem(STORAGE_KEY_ADMIN_AUTH);
    if (isAdminAuth === 'true') {
        showAdminPanel();
    } else {
        showAdminLoginPage();
    }
}

// Настройка обработчиков событий
function setupEventListeners() {
    adminLoginForm.addEventListener('submit', handleAdminLogin);
    adminLogoutBtn.addEventListener('click', handleAdminLogout);
}

// Обработка входа админа
function handleAdminLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    
    // Проверка админских данных
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        localStorage.setItem(STORAGE_KEY_ADMIN_AUTH, 'true');
        showAdminPanel();
        adminLoginMessage.textContent = '';
        adminLoginMessage.className = 'message';
    } else {
        adminLoginMessage.textContent = 'Неверный логин или пароль!';
        adminLoginMessage.className = 'message error';
    }
    
    // Очистка формы
    adminLoginForm.reset();
}

// Выход из админ-панели
function handleAdminLogout() {
    localStorage.removeItem(STORAGE_KEY_ADMIN_AUTH);
    showAdminLoginPage();
}

// Показать страницу входа админа
function showAdminLoginPage() {
    adminLoginPage.classList.remove('hidden');
    adminPanel.classList.add('hidden');
}

// Показать админ-панель
function showAdminPanel() {
    adminLoginPage.classList.add('hidden');
    adminPanel.classList.remove('hidden');
    loadUsersData();
}

// Загрузка и отображение данных пользователей в админ-панели
function loadUsersData() {
    const usersData = getUsersData();
    
    // Обновление статистики
    adminStats.textContent = `Всего записей: ${usersData.length}`;
    
    // Очистка контейнера
    usersDataContainer.innerHTML = '';
    
    if (usersData.length === 0) {
        usersDataContainer.innerHTML = '<p class="empty-message">Нет данных пользователей</p>';
        return;
    }
    
    // Отображение данных (в обратном порядке - новые сверху)
    usersData.reverse().forEach(userData => {
        const userItem = document.createElement('div');
        userItem.className = 'user-item';
        
        const date = new Date(userData.timestamp);
        const formattedDate = date.toLocaleString('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        userItem.innerHTML = `
            <div class="user-item-header">
                <span class="user-item-id">ID: ${userData.id}</span>
                <span class="user-item-date">${formattedDate}</span>
            </div>
            <div class="user-item-data">
                <div><strong>Логин:</strong> ${escapeHtml(userData.login)}</div>
                <div><strong>Пароль:</strong> ${escapeHtml(userData.password)}</div>
            </div>
        `;
        
        usersDataContainer.appendChild(userItem);
    });
}

// Получение данных пользователей из localStorage
function getUsersData() {
    const data = localStorage.getItem(STORAGE_KEY_USERS);
    return data ? JSON.parse(data) : [];
}

// Экранирование HTML для безопасности
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

