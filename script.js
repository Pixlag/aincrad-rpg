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
//  📦 БАЗА ПРЕДМЕТОВ С ПОЛНОЙ ИНФОРМАЦИЕЙ
// ============================================================

const ITEMS_DB = {
    // === МАТЕРИАЛЫ ===
    'material_leather': {
        id: 'material_leather',
        name: 'КОЖА',
        icon: 'material_leather.png',
        type: 'material',
        rarity: 'common',
        desc: 'Прочная кожа для крафта'
    },
    'material_paper': {
        id: 'material_paper',
        name: 'БУМАГА',
        icon: 'material_paper.png',
        type: 'material',
        rarity: 'common',
        desc: 'Чистый лист бумаги'
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
        stats: { attack: 2, speed: 1.2 },
        desc: 'Простой деревянный меч'
    },
    'sword_bloody_blade': {
        id: 'sword_bloody_blade',
        name: 'КРОВАВЫЙ КЛИНОК',
        icon: 'sword_bloody_blade.png',
        type: 'weapon',
        rarity: 'epic',
        stats: { attack: 12, speed: 1.4 },
        effect: 'При каждом ударе есть шанс 15% на кровотечение',
        history: 'Выкован из стали, закалённой в крови павшего воина. Говорят, он помнит вкус битвы.'
    },
    'sword_shark_tooth': {
        id: 'sword_shark_tooth',
        name: 'ЗУБ АКУЛЫ',
        icon: 'sword_shark_tooth.png',
        type: 'weapon',
        rarity: 'epic',
        stats: { attack: 10, speed: 1.6 },
        effect: 'Игнорирует 20% брони противника',
        history: 'Вырезан из зуба древней акулы, обитавшей в глубинах океана.'
    },
    'sword_ancient_ruin': {
        id: 'sword_ancient_ruin',
        name: 'КЛИНОК ДРЕВНИХ',
        icon: 'sword_ancient_ruin.png',
        type: 'weapon',
        rarity: 'mythic',
        stats: { attack: 22, speed: 1.1 },
        effect: 'Наносит +50% урона нежити',
        history: 'Найден в руинах цивилизации, павшей тысячи лет назад.'
    },
    'sword_demon_slayer': {
        id: 'sword_demon_slayer',
        name: 'УБИЙЦА ДЕМОНОВ',
        icon: 'sword_demon_slayer.png',
        type: 'weapon',
        rarity: 'incredible',
        stats: { attack: 30, speed: 1.3 },
        effect: 'Наносит +100% урона демонам и существам тьмы',
        history: 'Выкован в кузнице Ватикана из священного серебра.'
    },
    'sword_demonic_zariche': {
        id: 'sword_demonic_zariche',
        name: 'ДЕМОНИЧЕСКИЙ ЗАРИЧЕ',
        icon: 'sword_demonic_zariche.png',
        type: 'weapon',
        rarity: 'incredible',
        stats: { attack: 35, speed: 1.5 },
        effect: 'Вампиризм: восстанавливает 10% от нанесённого урона',
        history: 'Клинок, содержащий душу могущественного демона. Говорят, он шепчет своему владельцу.'
    },
    'sword_elucidator': {
        id: 'sword_elucidator',
        name: 'ЭЛЮСИДАТОР',
        icon: 'sword_elucidator.png',
        type: 'weapon',
        rarity: 'incredible',
        stats: { attack: 38, speed: 1.7 },
        effect: 'Увеличивает шанс критического удара на 25%',
        history: 'Легендарный чёрный клинок, созданный для уничтожения богов.'
    },
    'sword_meliodas': {
        id: 'sword_meliodas',
        name: 'МЕЧ МЕЛИОДАСА',
        icon: 'sword_meliodas.png',
        type: 'weapon',
        rarity: 'incredible',
        stats: { attack: 32, speed: 1.4 },
        effect: 'Может разрушить магические барьеры',
        history: 'Клинок, принадлежавший королю демонов Мелиодасу.'
    },
    'sword_spine': {
        id: 'sword_spine',
        name: 'ПОЗВОНОЧНИК',
        icon: 'sword_spine.png',
        type: 'weapon',
        rarity: 'incredible',
        stats: { attack: 28, speed: 1.8 },
        effect: 'Каждый третий удар наносит двойной урон',
        history: 'Меч, выкованный из позвоночника древнего дракона.'
    },
    'sword_zangetsu': {
        id: 'sword_zangetsu',
        name: 'ЗАНГЕЦУ',
        icon: 'sword_zangetsu.png',
        type: 'weapon',
        rarity: 'incredible',
        stats: { attack: 40, speed: 1.2 },
        effect: 'Может разрезать саму реальность (шанс 5% мгновенного убийства)',
        history: 'Клинок, разрезающий луну. Создан из металла, упавшего с неба.'
    }
};

// --- ЦВЕТА РЕДКОСТЕЙ ---
const RARITY_COLORS = {
    common: '#94a3b8',
    uncommon: '#22c55e',
    rare: '#3b82f6',
    epic: '#a78bfa',
    legendary: '#f59e0b',
    mythic: '#ef4444',
    incredible: '#f472b6'
};

const RARITY_NAMES = {
    common: 'Common',
    uncommon: 'Uncommon',
    rare: 'Rare',
    epic: 'Epic',
    legendary: 'Legendary',
    mythic: 'Mythic',
    incredible: 'Incredible'
};

// --- ФУНКЦИИ ДЛЯ РАБОТЫ С ПРЕДМЕТАМИ ---
function getItemData(itemId) {
    return ITEMS_DB[itemId] || null;
}

function getRarityColor(rarity) {
    return RARITY_COLORS[rarity] || '#94a3b8';
}

function getRarityName(rarity) {
    return RARITY_NAMES[rarity] || rarity;
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

// === ВСПЛЫВАЮЩЕЕ ОКНО ===
const tooltip = document.createElement('div');
tooltip.className = 'item-tooltip';
tooltip.id = 'itemTooltip';
document.body.appendChild(tooltip);

function showTooltip(event, itemId) {
    const item = getItemData(itemId);
    if (!item) return;

    const rarityColor = getRarityColor(item.rarity);
    const rarityName = getRarityName(item.rarity);

    let html = `
        <div class="tooltip-name" style="color: ${rarityColor};">
            ${item.name}
            <span class="tooltip-rarity" style="color: ${rarityColor};">[${rarityName}]</span>
        </div>
    `;

    if (item.type === 'weapon' && item.stats) {
        html += `<hr class="tooltip-divider">`;
        html += `<div class="tooltip-stat">⚔️ Урон: <span class="stat-value">${item.stats.attack}</span></div>`;
        html += `<div class="tooltip-stat">💨 Скорость атаки: <span class="stat-value">${item.stats.speed}</span></div>`;
    }

    if (item.effect) {
        html += `<hr class="tooltip-divider">`;
        html += `<div class="tooltip-effect">✨ Эффект: ${item.effect}</div>`;
    }

    if (item.history) {
        html += `<hr class="tooltip-divider">`;
        html += `<div class="tooltip-history">📜 ${item.history}</div>`;
    }

    tooltip.innerHTML = html;
    tooltip.classList.add('visible');

    // Позиционирование
    let x = event.clientX + 15;
    let y = event.clientY + 15;

    // Проверка, чтобы не выходило за экран
    const rect = tooltip.getBoundingClientRect();
    if (x + rect.width > window.innerWidth) {
        x = event.clientX - rect.width - 15;
    }
    if (y + rect.height > window.innerHeight) {
        y = window.innerHeight - rect.height - 10;
    }

    tooltip.style.left = Math.max(10, x) + 'px';
    tooltip.style.top = Math.max(10, y) + 'px';
}

function hideTooltip() {
    tooltip.classList.remove('visible');
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
                slot.title = `${item.name} (${getRarityName(item.rarity)})`;
                slot.dataset.itemId = itemId;

                // События для тултипа
                slot.addEventListener('mouseenter', function(e) {
                    const id = this.dataset.itemId;
                    if (id) showTooltip(e, id);
                });
                slot.addEventListener('mouseleave', hideTooltip);
                slot.addEventListener('mousemove', function(e) {
                    const id = this.dataset.itemId;
                    if (id) {
                        const rect = tooltip.getBoundingClientRect();
                        let x = e.clientX + 15;
                        let y = e.clientY + 15;
                        if (x + rect.width > window.innerWidth) {
                            x = e.clientX - rect.width - 15;
                        }
                        if (y + rect.height > window.innerHeight) {
                            y = window.innerHeight - rect.height - 10;
                        }
                        tooltip.style.left = Math.max(10, x) + 'px';
                        tooltip.style.top = Math.max(10, y) + 'px';
                    }
                });
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

// --- ЗАПОЛНЕНИЕ ИНВЕНТАРЯ ---
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
