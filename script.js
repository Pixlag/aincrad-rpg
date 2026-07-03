// ============================================================
//  🎮 ПРОСТАЯ ИГРА (ЛОКАЛЬНАЯ ВЕРСИЯ)
// ============================================================

// --- ЭЛЕМЕНТЫ ---
const loginSection = document.getElementById('authSection');
const gameWorld = document.getElementById('gameWorld');

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

const logoutBtn = document.getElementById('logoutBtn');
const statusEl = document.getElementById('status');

// --- ГЛАЗИКИ ДЛЯ ПАРОЛЯ (ИСПРАВЛЕНО) ---
function initPasswordToggles() {
    document.querySelectorAll('.toggle-password').forEach(button => {
        // Убираем старые обработчики, чтобы не дублировались
        button.removeEventListener('click', togglePassword);
        button.addEventListener('click', togglePassword);
    });
}

function togglePassword(e) {
    const button = e.currentTarget;
    const targetId = button.dataset.target;
    const input = document.getElementById(targetId);
    if (!input) return;

    // Переключаем тип поля
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';

    // Меняем иконку глаз
    const icon = button.querySelector('.eye-icon');
    if (icon) {
        icon.textContent = isPassword ? '🙈' : '👁️';
    }
}

// Запускаем инициализацию при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initPasswordToggles();
});

// Также запускаем сразу, если DOM уже загружен
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPasswordToggles);
} else {
    initPasswordToggles();
}

// --- ФУНКЦИИ ---
function showStatus(msg, type = 'info') {
    statusEl.textContent = msg;
    statusEl.style.color = type === 'success' ? '#22c55e' : type === 'error' ? '#f87171' : '#888888';
}

// --- ПОЛЬЗОВАТЕЛИ (хранятся в браузере) ---
function getUsers() {
    const data = localStorage.getItem('aincrad_users');
    return data ? JSON.parse(data) : {};
}

function saveUsers(users) {
    localStorage.setItem('aincrad_users', JSON.stringify(users));
}

// --- ВКЛАДКИ ---
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

    // ВХОД В ИГРУ
    loginSection.classList.add('hidden');
    gameWorld.classList.remove('hidden');
    showStatus(`✅ ДОБРО ПОЖАЛОВАТЬ, ${username}!`, 'success');
};

// --- ВЫХОД ---
logoutBtn.onclick = () => {
    gameWorld.classList.add('hidden');
    loginSection.classList.remove('hidden');
    showStatus('', 'info');
    tabLogin.click();
};

console.log('🎮 АЙНКРАД ЗАГРУЖЕН!');
