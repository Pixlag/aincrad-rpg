// ============================================================
//  🎮 АЙНКРАД — ПОЛНАЯ ИГРА
// ============================================================

// --- ЭЛЕМЕНТЫ ---
const loginSection = document.getElementById('authSection');
const gameWorld = document.getElementById('gameWorld');
const mainLogo = document.getElementById('mainLogo');
const tabsContainer = document.getElementById('tabsContainer');

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

const loginUsername = document.getElementById('loginUsername');
const loginPassword = document.getElementById('loginPassword');
const loginBtn = document.getElementById('loginBtn');

const registerUsername = document.getElementById('registerUsername');
const registerPassword = document.getElementById('registerPassword');
const registerPasswordConfirm = document.getElementById('registerPasswordConfirm');
const registerBtn = document.getElementById('registerBtn');

const tabLogin = document.getElementById('tabLogin');
const tabRegister = document.getElementById('tabRegister');

const statusEl = document.getElementById('status');
const logContent = document.getElementById('logContent');

// --- СОСТОЯНИЕ ИГРОКА ---
let currentLocation = null;

// --- ЛОГИ ---
function addLog(message, type = 'system') {
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.textContent = message;
    logContent.appendChild(entry);
    logContent.scrollTop = logContent.scrollHeight;

    while (logContent.children.length > 50) {
        logContent.removeChild(logContent.firstChild);
    }
}

// --- ГЛАЗИКИ ---
function initPasswordToggles() {
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.removeEventListener('click', togglePassword);
        button.addEventListener('click', togglePassword);
    });
}

function togglePassword(e) {
    const button = e.currentTarget;
    const targetId = button.dataset.target;
    const input = document.getElementById(targetId);
    if (!input) return;

    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';

    const icon = button.querySelector('.eye-icon');
    if (icon) {
        icon.src = isPassword ? 'assets/eye_open.png' : 'assets/eye_closed.png';
        icon.alt = isPassword ? 'Скрыть пароль' : 'Показать пароль';
    }
}

document.addEventListener('DOMContentLoaded', initPasswordToggles);
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPasswordToggles);
} else {
    initPasswordToggles();
}

// --- ЗАКЛАДКИ ---
let isTabsInitialized = false;

function initTabs() {
    const tabs = document.querySelectorAll('.tab-btn:not(.tab-exit)');
    const panels = {
        profile: document.getElementById('panel-profile'),
        inventory: document.getElementById('panel-inventory'),
        map: document.getElementById('panel-map'),
        settings: document.getElementById('panel-settings')
    };

    // Убираем старые обработчики, чтобы не было дублей
    tabs.forEach(tab => {
        tab.removeEventListener('click', tab._clickHandler);
    });

    tabs.forEach(tab => {
        const handler = function() {
            // Убираем активный класс у всех закладок
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Прячем все панели
            Object.values(panels).forEach(p => p.classList.add('hidden'));

            // Показываем нужную
            const tabName = this.dataset.tab;
            if (panels[tabName]) {
                panels[tabName].classList.remove('hidden');
            }
        };
        tab._clickHandler = handler;
        tab.addEventListener('click', handler);
    });

    // Сбрасываем все панели
    Object.values(panels).forEach(p => p.classList.add('hidden'));

    // Показываем только профиль
    if (panels.profile) {
        panels.profile.classList.remove('hidden');
        // Активируем кнопку профиля
        tabs.forEach(t => t.classList.remove('active'));
        document.querySelector('.tab-btn[data-tab="profile"]')?.classList.add('active');
    }

    isTabsInitialized = true;
}

// --- СБРОС ЗАКЛАДОК ---
function resetTabs() {
    const tabs = document.querySelectorAll('.tab-btn:not(.tab-exit)');
    const panels = {
        profile: document.getElementById('panel-profile'),
        inventory: document.getElementById('panel-inventory'),
        map: document.getElementById('panel-map'),
        settings: document.getElementById('panel-settings')
    };

    // Убираем активный класс у всех закладок
    tabs.forEach(t => t.classList.remove('active'));

    // Прячем все панели
    Object.values(panels).forEach(p => p.classList.add('hidden'));

    // Показываем только профиль
    if (panels.profile) {
        panels.profile.classList.remove('hidden');
        document.querySelector('.tab-btn[data-tab="profile"]')?.classList.add('active');
    }

    isTabsInitialized = true;
}

// --- ФУНКЦИИ ---
function showStatus(msg, type = 'info') {
    statusEl.textContent = msg;
    statusEl.style.color = type === 'success' ? '#22c55e' : type === 'error' ? '#f87171' : '#888888';
}

// --- ПОЛЬЗОВАТЕЛИ ---
function getUsers() {
    const data = localStorage.getItem('aincrad_users');
    return data ? JSON.parse(data) : {};
}

function saveUsers(users) {
    localStorage.setItem('aincrad_users', JSON.stringify(users));
}

// --- ВКЛАДКИ АВТОРИЗАЦИИ ---
tabLogin.onclick = () => {
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
};

tabRegister.onclick = () => {
    tabRegister.classList.add('active');
    tabLogin.classList.remove('active');
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
};

// --- РЕГИСТРАЦИЯ ---
registerBtn.onclick = () => {
    const username = registerUsername.value.trim();
    const password = registerPassword.value.trim();
    const confirm = registerPasswordConfirm.value.trim();

    if (!username || username.length < 3) {
        showStatus('⚠️ НИК ОТ 3 СИМВОЛОВ', 'error');
        return;
    }
    if (!password || password.length < 4) {
        showStatus('⚠️ ПАРОЛЬ ОТ 4 СИМВОЛОВ', 'error');
        return;
    }
    if (password !== confirm) {
        showStatus('⚠️ ПАРОЛИ НЕ СОВПАДАЮТ', 'error');
        return;
    }

    const users = getUsers();
    if (users[username]) {
        showStatus('⚠️ НИК УЖЕ ЗАНЯТ', 'error');
        return;
    }

    users[username] = password;
    saveUsers(users);

    showStatus('✅ РЕГИСТРАЦИЯ УСПЕШНА! ВОЙДИТЕ.', 'success');

    registerUsername.value = '';
    registerPassword.value = '';
    registerPasswordConfirm.value = '';
    tabLogin.click();
};

// --- ВЫХОД ЧЕРЕЗ ЗАКЛАДКУ ---
document.getElementById('tabExit').addEventListener('click', function() {
    // Показываем логотип
    mainLogo.classList.remove('hidden');

    // Скрываем закладки
    tabsContainer.classList.remove('visible');

    gameWorld.classList.add('hidden');
    loginSection.classList.remove('hidden');

    // Сбрасываем состояние закладок
    resetTabs();

    // Сбрасываем текущую локацию
    currentLocation = null;

    showStatus('', 'info');
    addLog('👋 ВЫ ВЫШЛИ ИЗ ИГРЫ', 'system');
});

// --- ВХОД ---
loginBtn.onclick = () => {
    const username = loginUsername.value.trim();
    const password = loginPassword.value.trim();

    if (!username || !password) {
        showStatus('⚠️ ВВЕДИТЕ НИК И ПАРОЛЬ', 'error');
        return;
    }

    const users = getUsers();

    if (!users[username]) {
        showStatus('❌ ПОЛЬЗОВАТЕЛЬ НЕ НАЙДЕН', 'error');
        return;
    }

    if (users[username] !== password) {
        showStatus('❌ НЕВЕРНЫЙ ПАРОЛЬ', 'error');
        return;
    }

    // ===== ВХОД В ИГРУ =====
    mainLogo.classList.add('hidden');
    tabsContainer.classList.add('visible');

    loginSection.classList.add('hidden');
    gameWorld.classList.remove('hidden');

    // Сбрасываем локацию при входе
    currentLocation = null;

    // Инициализируем закладки (сбрасываем всё, открываем профиль)
    initTabs();

    document.getElementById('profileName').textContent = username;
    document.getElementById('profileLevel').textContent = '1';
    document.getElementById('profileGold').textContent = '50';
    document.getElementById('profileKills').textContent = '0';

    // --- ОБРАБОТЧИКИ ДЛЯ ЛОКАЦИЙ (исправлено) ---
    document.querySelectorAll('.location').forEach(loc => {
        // Убираем старые обработчики
        loc.removeEventListener('click', loc._clickHandler);

        const handler = function() {
            const locName = this.textContent.trim();
            const locId = this.dataset.loc;

            // Проверяем, не в этой ли мы уже локации
            if (currentLocation === locId) {
                showStatus(`📍 ВЫ УЖЕ В ${locName}`, 'info');
                addLog(`📍 ВЫ УЖЕ В ${locName}`, 'system');
                return;
            }

            // Перемещаемся
            currentLocation = locId;
            addLog(`📍 ПЕРЕМЕЩЕНИЕ В ${locName}`, 'player');
            showStatus(`📍 ВЫ В ${locName}`, 'info');
        };

        loc._clickHandler = handler;
        loc.addEventListener('click', handler);
    });

    // Добавляем приветствие в логи
    addLog(`🌟 ДОБРО ПОЖАЛОВАТЬ, ${username}!`, 'system');
    addLog(`📖 ВАШЕ ПРИКЛЮЧЕНИЕ НАЧИНАЕТСЯ!`, 'system');

    showStatus('', 'info');
};

console.log('🎮 АЙНКРАД ЗАГРУЖЕН!');
