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
let isTabsInitialized = false;
let selectedSlot = null;
let playerInventory = [];

// ============================================================
//  📦 БАЗА ПРЕДМЕТОВ (точные названия из вашего списка)
// ============================================================

const ITEMS_DB = {
    // === МАТЕРИАЛЫ ===
    'material_leather': {
        id: 'material_leather',
        name: 'КОЖА',
        icon: 'material_leather.png',
        type: 'material',
        rarity: 'common',
        desc: 'Прочная кожа'
    },
    'material_paper': {
        id: 'material_paper',
        name: 'БУМАГА',
        icon: 'material_paper.png',
        type: 'material',
        rarity: 'common',
        desc: 'Чистый лист'
    },
    'material_stone': {
        id: 'material_stone',
        name: 'КАМЕНЬ',
        icon: 'material_stone.png',
        type: 'material',
        rarity: 'common',
        desc: 'Обычный камень'
    },
    'material_thread': {
        id: 'material_thread',
        name: 'НИТЬ',
        icon: 'material_thread.png',
        type: 'material',
        rarity: 'common',
        desc: 'Прочная нить'
    },
    'material_wood': {
        id: 'material_wood',
        name: 'ДРЕВЕСИНА',
        icon: 'material_wood.png',
        type: 'material',
        rarity: 'common',
        desc: 'Обработанная древесина'
    },

    // === ОРУЖИЕ ===
    'sword_wood': {
        id: 'sword_wood',
        name: 'ДЕРЕВЯННЫЙ МЕЧ',
        icon: 'sword_wood.png',
        type: 'weapon',
        rarity: 'common',
        stats: { attack: 2 },
        desc: 'Простой деревянный меч'
    },
    'sword_bloody_blade': {
        id: 'sword_bloody_blade',
        name: 'КРОВАВЫЙ КЛИНОК',
        icon: 'sword_bloody_blade.png',
        type: 'weapon',
        rarity: 'epic',
        stats: { attack: 12 },
        desc: 'Клинок, пропитанный кровью'
    },
    'sword_shark_tooth': {
        id: 'sword_shark_tooth',
        name: 'ЗУБ АКУЛЫ',
        icon: 'sword_shark_tooth.png',
        type: 'weapon',
        rarity: 'epic',
        stats: { attack: 10 },
        desc: 'Острый как зуб акулы'
    },
    'sword_ancient_ruin': {
        id: 'sword_ancient_ruin',
        name: 'КЛИНОК ДРЕВНИХ',
        icon: 'sword_ancient_ruin.png',
        type: 'weapon',
        rarity: 'mythic',
        stats: { attack: 22 },
        desc: 'Оружие из забытой эпохи'
    },
    'sword_demon_slayer': {
        id: 'sword_demon_slayer',
        name: 'УБИЙЦА ДЕМОНОВ',
        icon: 'sword_demon_slayer.png',
        type: 'weapon',
        rarity: 'incredible',
        stats: { attack: 30 },
        desc: 'Выкован для охоты на демонов'
    },
    'sword_demonic_zariche': {
        id: 'sword_demonic_zariche',
        name: 'ДЕМОНИЧЕСКИЙ ЗАРИЧЕ',
        icon: 'sword_demonic_zariche.png',
        type: 'weapon',
        rarity: 'incredible',
        stats: { attack: 35 },
        desc: 'Тёмный клинок с душой демона'
    },
    'sword_elucidator': {
        id: 'sword_elucidator',
        name: 'ЭЛЮСИДАТОР',
        icon: 'sword_elucidator.png',
        type: 'weapon',
        rarity: 'incredible',
        stats: { attack: 38 },
        desc: 'Легендарный чёрный клинок'
    },
    'sword_meliodas': {
        id: 'sword_meliodas',
        name: 'МЕЧ МЕЛИОДАСА',
        icon: 'sword_meliodas.png',
        type: 'weapon',
        rarity: 'incredible',
        stats: { attack: 32 },
        desc: 'Клинок короля демонов'
    },
    'sword_spine': {
        id: 'sword_spine',
        name: 'ПОЗВОНОЧНИК',
        icon: 'sword_spine.png',
        type: 'weapon',
        rarity: 'incredible',
        stats: { attack: 28 },
        desc: 'Меч из кости древнего зверя'
    },
    'sword_zangetsu': {
        id: 'sword_zangetsu',
        name: 'ЗАНГЕЦУ',
        icon: 'sword_zangetsu.png',
        type: 'weapon',
        rarity: 'incredible',
        stats: { attack: 40 },
        desc: 'Клинок, разрезающий луну'
    }
};

// --- ФУНКЦИИ ДЛЯ РАБОТЫ С ПРЕДМЕТАМИ ---
function getItemIcon(itemId) {
    const item = ITEMS_DB[itemId];
    return item ? `assets/${item.icon}` : null;
}

function getItemName(itemId) {
    const item = ITEMS_DB[itemId];
    return item ? item.name : '???';
}

function getItemRarity(itemId) {
    const item = ITEMS_DB[itemId];
    return item ? item.rarity : 'common';
}

function getItemData(itemId) {
    return ITEMS_DB[itemId] || null;
}

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
function initTabs() {
    const tabs = document.querySelectorAll('.tab-btn:not(.tab-exit)');
    const panels = {
        profile: document.getElementById('panel-profile'),
        inventory: document.getElementById('panel-inventory'),
        map: document.getElementById('panel-map'),
        settings: document.getElementById('panel-settings')
    };

    tabs.forEach(tab => {
        tab.removeEventListener('click', tab._clickHandler);
    });

    tabs.forEach(tab => {
        const handler = function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            Object.values(panels).forEach(p => p.classList.add('hidden'));
            const tabName = this.dataset.tab;
            if (panels[tabName]) {
                panels[tabName].classList.remove('hidden');
            }
        };
        tab._clickHandler = handler;
        tab.addEventListener('click', handler);
    });

    Object.values(panels).forEach(p => p.classList.add('hidden'));
    if (panels.profile) {
        panels.profile.classList.remove('hidden');
        tabs.forEach(t => t.classList.remove('active'));
        document.querySelector('.tab-btn[data-tab="profile"]')?.classList.add('active');
    }
    isTabsInitialized = true;
}

function resetTabs() {
    const tabs = document.querySelectorAll('.tab-btn:not(.tab-exit)');
    const panels = {
        profile: document.getElementById('panel-profile'),
        inventory: document.getElementById('panel-inventory'),
        map: document.getElementById('panel-map'),
        settings: document.getElementById('panel-settings')
    };
    tabs.forEach(t => t.classList.remove('active'));
    Object.values(panels).forEach(p => p.classList.add('hidden'));
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

// --- ИНВЕНТАРЬ ---
function renderInventory() {
    const grid = document.getElementById('inventoryGrid');
    grid.innerHTML = '';
    selectedSlot = null;
    document.querySelectorAll('.inv-action').forEach(btn => btn.classList.remove('active'));

    for (let i = 0; i < 25; i++) {
        const slot = document.createElement('div');
        slot.className = 'inv-slot';
        slot.dataset.index = i;

        if (i < playerInventory.length) {
            const itemId = playerInventory[i];
            const item = getItemData(itemId);
            if (item) {
                slot.classList.add('has-item');
                const count = 1;
                slot.innerHTML = `
                    <div class="item-icon">
                        <img src="assets/${item.icon}" alt="${item.name}" />
                    </div>
                    ${count > 1 ? `<span class="item-count">${count}</span>` : ''}
                `;
                slot.title = `${item.name} (${item.rarity})`;
                slot.dataset.itemId = itemId;
            }
        }

        slot.addEventListener('click', function() {
            selectSlot(this);
        });

        grid.appendChild(slot);
    }
}

function selectSlot(slotElement) {
    document.querySelectorAll('.inv-slot').forEach(s => s.style.borderColor = '#3a3a3a');
    slotElement.style.borderColor = '#f0c060';
    selectedSlot = slotElement;
    const hasItem = slotElement.classList.contains('has-item');
    document.querySelectorAll('.inv-action').forEach(btn => {
        btn.classList.toggle('active', hasItem);
    });
}

// --- ЗАПОЛНЕНИЕ ИНВЕНТАРЯ ТЕСТОВЫМИ ПРЕДМЕТАМИ ---
function fillInventory() {
    const testItems = [
        'sword_wood',
        'material_leather',
        'material_wood',
        'sword_bloody_blade',
        'material_stone',
        'sword_elucidator',
        'material_paper',
        'sword_zangetsu',
        'material_thread',
        'sword_demon_slayer',
    ];
    playerInventory = testItems;
    renderInventory();
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
    mainLogo.classList.remove('hidden');
    tabsContainer.classList.remove('visible');
    gameWorld.classList.add('hidden');
    loginSection.classList.remove('hidden');
    resetTabs();
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
    currentLocation = null;

    initTabs();
    fillInventory();

    document.getElementById('profileName').textContent = username;
    document.getElementById('profileLevel').textContent = '1';
    document.getElementById('profileGold').textContent = '50';
    document.getElementById('profileKills').textContent = '0';

    // --- ОБРАБОТЧИКИ ДЛЯ ЛОКАЦИЙ ---
    document.querySelectorAll('.location').forEach(loc => {
        loc.removeEventListener('click', loc._clickHandler);
        const handler = function() {
            const locName = this.textContent.trim();
            const locId = this.dataset.loc;
            if (currentLocation === locId) {
                showStatus(`📍 ВЫ УЖЕ В ${locName}`, 'info');
                addLog(`📍 ВЫ УЖЕ В ${locName}`, 'system');
                return;
            }
            currentLocation = locId;
            addLog(`📍 ПЕРЕМЕЩЕНИЕ В ${locName}`, 'player');
            showStatus(`📍 ВЫ В ${locName}`, 'info');
        };
        loc._clickHandler = handler;
        loc.addEventListener('click', handler);
    });

    // --- КНОПКИ ИНВЕНТАРЯ ---
    document.getElementById('btnEquip').addEventListener('click', function() {
        if (!selectedSlot || !selectedSlot.dataset.itemId) return;
        const itemId = selectedSlot.dataset.itemId;
        const item = getItemData(itemId);
        if (item && item.type === 'weapon') {
            addLog(`⚔️ ЭКИПИРОВАН: ${item.name}`, 'loot');
            showStatus(`⚔️ ЭКИПИРОВАН: ${item.name}`, 'success');
        } else {
            addLog(`⚠️ НЕЛЬЗЯ ЭКИПИРОВАТЬ ${item.name}`, 'enemy');
            showStatus(`⚠️ НЕЛЬЗЯ ЭКИПИРОВАТЬ`, 'error');
        }
    });

    document.getElementById('btnUse').addEventListener('click', function() {
        if (!selectedSlot || !selectedSlot.dataset.itemId) return;
        const itemId = selectedSlot.dataset.itemId;
        const item = getItemData(itemId);
        if (item) {
            addLog(`🧪 ИСПОЛЬЗОВАН: ${item.name}`, 'player');
            showStatus(`🧪 ИСПОЛЬЗОВАН: ${item.name}`, 'info');
        }
    });

    document.getElementById('btnDelete').addEventListener('click', function() {
        if (!selectedSlot || !selectedSlot.dataset.itemId) return;
        const itemId = selectedSlot.dataset.itemId;
        const item = getItemData(itemId);
        if (item) {
            const idx = playerInventory.indexOf(itemId);
            if (idx !== -1) {
                playerInventory.splice(idx, 1);
                renderInventory();
                addLog(`🗑️ УДАЛЕН: ${item.name}`, 'enemy');
                showStatus(`🗑️ УДАЛЕН: ${item.name}`, 'info');
            }
        }
    });

    addLog(`🌟 ДОБРО ПОЖАЛОВАТЬ, ${username}!`, 'system');
    addLog(`📖 ВАШЕ ПРИКЛЮЧЕНИЕ НАЧИНАЕТСЯ!`, 'system');
    showStatus('', 'info');
};

console.log('🎮 АЙНКРАД ЗАГРУЖЕН!');
