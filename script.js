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
let currentPlayerName = '';

// --- ЯЗЫК ---
let currentLang = 'ru';

const LANG = {
    ru: {
        inventory: 'ИНВЕНТАРЬ',
        profile: 'ПРОФИЛЬ',
        map: 'КАРТА МИРА',
        settings: 'НАСТРОЙКИ',
        name: 'Имя',
        level: 'Уровень',
        gold: 'Золото',
        kills: 'Убийств',
        sound: 'ЗВУК',
        music: 'МУЗЫКА',
        ignore_npc: 'ИГНОРИРОВАТЬ NPC',
        language: 'ЯЗЫК',
        equip: 'Экипировать',
        use: 'Использовать',
        delete: 'Удалить',
        welcome: 'ДОБРО ПОЖАЛОВАТЬ В АЙНКРАД!',
        adventure: 'ВАШЕ ПРИКЛЮЧЕНИЕ НАЧИНАЕТСЯ!',
        already_there: 'ВЫ УЖЕ В',
        moving_to: 'ПЕРЕМЕЩЕНИЕ В',
        equipped: 'ЭКИПИРОВАН',
        used: 'ИСПОЛЬЗОВАН',
        deleted: 'УДАЛЕН',
        cannot_equip: 'НЕЛЬЗЯ ЭКИПИРОВАТЬ',
        exit: 'ВЫ ВЫШЛИ ИЗ ИГРЫ',
        login: 'ВХОД',
        register: 'РЕГИСТР.',
        login_btn: 'ВОЙТИ',
        register_btn: 'СОЗДАТЬ ГЕРОЯ',
        username: 'НИК ИГРОКА',
        password: 'ПАРОЛЬ',
        confirm_password: 'ПОВТОРИТЕ ПАРОЛЬ',
        new_username: 'ПРИДУМАЙТЕ НИК',
        login_error: 'НЕВЕРНЫЙ НИК ИЛИ ПАРОЛЬ',
        register_success: 'РЕГИСТРАЦИЯ УСПЕШНА! ВОЙДИТЕ.',
        username_taken: 'НИК УЖЕ ЗАНЯТ',
        username_short: 'НИК ОТ 3 СИМВОЛОВ',
        password_short: 'ПАРОЛЬ ОТ 4 СИМВОЛОВ',
        password_mismatch: 'ПАРОЛИ НЕ СОВПАДАЮТ',
        enter_data: 'ВВЕДИТЕ НИК И ПАРОЛЬ',
        user_not_found: 'ПОЛЬЗОВАТЕЛЬ НЕ НАЙДЕН',
        welcome_user: 'ДОБРО ПОЖАЛОВАТЬ',
        log_title: 'ЖУРНАЛ СОБЫТИЙ',
        profile_title: 'ПРОФИЛЬ',
        map_title: 'КАРТА МИРА',
        settings_title: 'НАСТРОЙКИ',
        inventory_title: 'ИНВЕНТАРЬ',
        exit_btn: 'ВЫЙТИ',
        search: 'ПОИСК',
        filter: 'ФИЛЬТР',
        sort: 'СОРТИРОВКА',
        back: 'НАЗАД',
        save: 'СОХРАНИТЬ',
        cancel: 'ОТМЕНА',
        confirm: 'ПОДТВЕРДИТЬ',
        close: 'ЗАКРЫТЬ',
        open: 'ОТКРЫТЬ',
        yes: 'ДА',
        no: 'НЕТ',
        loading: 'ЗАГРУЗКА...',
        error: 'ОШИБКА',
        success: 'УСПЕШНО',
        info: 'ИНФОРМАЦИЯ',
        warning: 'ПРЕДУПРЕЖДЕНИЕ',
        logout: 'ВЫЙТИ',
        profile_edit: 'РЕДАКТИРОВАТЬ ПРОФИЛЬ',
        profile_save: 'СОХРАНИТЬ ПРОФИЛЬ',
        profile_cancel: 'ОТМЕНИТЬ',
        profile_name: 'ИМЯ',
        profile_level: 'УРОВЕНЬ',
        profile_gold: 'ЗОЛОТО',
        profile_kills: 'УБИЙСТВ',
        profile_health: 'ЗДОРОВЬЕ',
        profile_attack: 'АТАКА',
        profile_defense: 'ЗАЩИТА',
        profile_speed: 'СКОРОСТЬ',
        profile_luck: 'УДАЧА',
        profile_intelligence: 'ИНТЕЛЛЕКТ',
        profile_strength: 'СИЛА',
        profile_agility: 'ЛОВКОСТЬ',
        profile_endurance: 'ВЫНОСЛИВОСТЬ',
        profile_charisma: 'ХАРИЗМА',
        profile_race: 'РАСА',
        profile_class: 'КЛАСС',
        profile_experience: 'ОПЫТ',
        profile_next_level: 'ДО СЛЕДУЮЩЕГО УРОВНЯ',
        profile_equipment: 'СНАРЯЖЕНИЕ',
        profile_weapon: 'ОРУЖИЕ',
        profile_shield: 'ЩИТ',
        profile_ring: 'КОЛЬЦО',
        profile_helmet: 'ШЛЕМ',
        profile_chestplate: 'НАГРУДНИК',
        profile_boots: 'САПОГИ',
        profile_accessories: 'АКСЕССУАРЫ',
        profile_skills: 'НАВЫКИ',
        profile_abilities: 'СПОСОБНОСТИ',
        profile_stats: 'ХАРАКТЕРИСТИКИ',
        profile_achievements: 'ДОСТИЖЕНИЯ',
        profile_quests: 'КВЕСТЫ',
        profile_friends: 'ДРУЗЬЯ',
        profile_guild: 'ГИЛЬДИЯ',
        profile_rank: 'РАНГ',
        profile_reputation: 'РЕПУТАЦИЯ',
        profile_battles: 'СРАЖЕНИЙ',
        profile_wins: 'ПОБЕД',
        profile_losses: 'ПОРАЖЕНИЙ',
        profile_draws: 'НИЧЬИХ',
        profile_kd: 'УБИЙСТВ/СМЕРТЕЙ',
        profile_playtime: 'ИГРОВОЕ ВРЕМЯ',
        profile_joined: 'ПРИСОЕДИНИЛСЯ',
        profile_last_seen: 'ПОСЛЕДНИЙ РАЗ',
        profile_status: 'СТАТУС',
        profile_online: 'В ИГРЕ',
        profile_offline: 'НЕ В ИГРЕ',
        profile_away: 'ОТОШЁЛ',
        profile_busy: 'ЗАНЯТ',
        profile_invisible: 'НЕВИДИМ',
        profile_friend_request: 'ЗАПРОС В ДРУЗЬЯ',
        profile_friend_accept: 'ПРИНЯТЬ',
        profile_friend_decline: 'ОТКЛОНИТЬ',
        profile_friend_remove: 'УДАЛИТЬ ИЗ ДРУЗЕЙ',
        profile_friend_block: 'ЗАБЛОКИРОВАТЬ',
        profile_friend_unblock: 'РАЗБЛОКИРОВАТЬ',
        profile_report: 'ПОЖАЛОВАТЬСЯ',
        profile_ignore: 'ИГНОРИРОВАТЬ',
        profile_unignore: 'ПЕРЕСТАТЬ ИГНОРИРОВАТЬ',
        profile_trade: 'ТОРГОВАТЬ',
        profile_duel: 'ВЫЗВАТЬ НА ДУЭЛЬ',
        profile_party: 'ПРИГЛАСИТЬ В ГРУППУ',
        profile_party_leave: 'ПОКИНУТЬ ГРУППУ',
        profile_party_kick: 'ВЫГНАТЬ ИЗ ГРУППЫ',
        profile_party_invite: 'ПРИГЛАСИТЬ В ГРУППУ',
        profile_party_accept: 'ПРИНЯТЬ ПРИГЛАШЕНИЕ',
        profile_party_decline: 'ОТКЛОНИТЬ ПРИГЛАШЕНИЕ',
        profile_party_leader: 'ЛИДЕР ГРУППЫ',
        profile_party_member: 'УЧАСТНИК ГРУППЫ',
        profile_party_full: 'ГРУППА ПОЛНА',
        profile_party_not_found: 'ГРУППА НЕ НАЙДЕНА',
        profile_party_created: 'ГРУППА СОЗДАНА',
        profile_party_deleted: 'ГРУППА УДАЛЕНА',
        profile_party_left: 'ВЫ ПОКИНУЛИ ГРУППУ',
        profile_party_kicked: 'ВАС ВЫГНАЛИ ИЗ ГРУППЫ',
        profile_party_invited: 'ВАС ПРИГЛАСИЛИ В ГРУППУ',
        profile_party_joined: 'ВЫ ПРИСОЕДИНИЛИСЬ К ГРУППЕ',
        profile_party_declined: 'ВЫ ОТКЛОНИЛИ ПРИГЛАШЕНИЕ',
        profile_party_not_invited: 'ВЫ НЕ ПРИГЛАШЕНЫ',
        profile_party_already_in: 'ВЫ УЖЕ В ГРУППЕ',
        profile_party_invite_sent: 'ПРИГЛАШЕНИЕ ОТПРАВЛЕНО',
        profile_party_invite_failed: 'НЕ УДАЛОСЬ ОТПРАВИТЬ ПРИГЛАШЕНИЕ',
        profile_party_join_failed: 'НЕ УДАЛОСЬ ПРИСОЕДИНИТЬСЯ К ГРУППЕ',
        profile_party_leave_failed: 'НЕ УДАЛОСЬ ПОКИНУТЬ ГРУППУ',
        profile_party_kick_failed: 'НЕ УДАЛОСЬ ВЫГНАТЬ ИЗ ГРУППЫ',
        profile_party_disbanded: 'ГРУППА РАСПУЩЕНА',
        profile_party_disband_failed: 'НЕ УДАЛОСЬ РАСПУСТИТЬ ГРУППУ',
        profile_party_leader_transfer: 'ЛИДЕРСТВО ПЕРЕДАНО',
        profile_party_leader_transfer_failed: 'НЕ УДАЛОСЬ ПЕРЕДАТЬ ЛИДЕРСТВО',
        profile_party_leader_transfer_to: 'ЛИДЕРСТВО ПЕРЕДАНО ИГРОКУ',
        profile_party_leader_transfer_to_failed: 'НЕ УДАЛОСЬ ПЕРЕДАТЬ ЛИДЕРСТВО ИГРОКУ',
        profile_party_leader_transfer_to_self: 'ВЫ НЕ МОЖЕТЕ ПЕРЕДАТЬ ЛИДЕРСТВО СЕБЕ',
        profile_party_leader_transfer_to_not_found: 'ИГРОК НЕ НАЙДЕН',
        profile_party_leader_transfer_to_not_in_party: 'ИГРОК НЕ В ГРУППЕ',
        profile_party_leader_transfer_to_already_leader: 'ИГРОК УЖЕ ЛИДЕР',
        profile_party_leader_transfer_to_self_leader: 'ВЫ УЖЕ ЛИДЕР',
        profile_party_leader_transfer_to_self_not_leader: 'ВЫ НЕ ЛИДЕР',
        profile_party_leader_transfer_to_self_in_party: 'ВЫ В ГРУППЕ',
        profile_party_leader_transfer_to_self_not_in_party: 'ВЫ НЕ В ГРУППЕ',
        profile_party_leader_transfer_to_self_already_leader: 'ВЫ УЖЕ ЛИДЕР',
    },
    // ... другие языки добавляются по аналогии
};

// --- ФУНКЦИЯ ПЕРЕВОДА ---
function t(key) {
    return LANG[currentLang]?.[key] || LANG['ru'][key] || key;
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

// --- ОБНОВЛЕНИЕ ВСЕХ ТЕКСТОВ ---
function updateAllTexts() {
    // Заголовки вкладок
    document.querySelectorAll('.tab-panel h2').forEach(el => {
        const id = el.closest('.tab-panel')?.id;
        if (id === 'panel-profile') el.textContent = `👤 ${t('profile')}`;
        else if (id === 'panel-inventory') el.textContent = `🎒 ${t('inventory')}`;
        else if (id === 'panel-map') el.textContent = `🗺️ ${t('map')}`;
        else if (id === 'panel-settings') el.textContent = `⚙️ ${t('settings')}`;
    });

    // Профиль
    document.querySelectorAll('.profile-stats .label').forEach(el => {
        const text = el.textContent.trim();
        if (text.includes('Имя') || text.includes('Name')) el.textContent = t('name');
        else if (text.includes('Уровень') || text.includes('Level')) el.textContent = t('level');
        else if (text.includes('Золото') || text.includes('Gold')) el.textContent = t('gold');
        else if (text.includes('Убийств') || text.includes('Kills')) el.textContent = t('kills');
    });

    // Настройки
    document.querySelectorAll('.settings-item label').forEach(label => {
        const text = label.textContent.trim();
        if (text.includes('ЗВУК') || text.includes('SOUND')) label.textContent = `🔊 ${t('sound')}`;
        else if (text.includes('МУЗЫКА') || text.includes('MUSIC')) label.textContent = `🎵 ${t('music')}`;
        else if (text.includes('ИГНОРИРОВАТЬ') || text.includes('IGNORE')) label.textContent = `🚫 ${t('ignore_npc')}`;
        else if (text.includes('ЯЗЫК') || text.includes('LANGUAGE')) label.textContent = `🌐 ${t('language')}`;
    });

    // Кнопки инвентаря (подсказки)
    document.querySelectorAll('.inv-action').forEach(btn => {
        const id = btn.id;
        if (id === 'btnEquip') btn.title = t('equip');
        else if (id === 'btnUse') btn.title = t('use');
        else if (id === 'btnDelete') btn.title = t('delete');
    });

    // Журнал
    document.querySelector('.log-title').textContent = `📜 ${t('log_title')}`;

    // Статус (если он пустой, оставляем)
    // Авторизация
    document.querySelectorAll('.tab-switch button span').forEach(el => {
        const text = el.textContent.trim();
        if (text === 'ВХОД' || text === 'LOGIN') el.textContent = t('login');
        else if (text === 'РЕГИСТР.' || text === 'REGISTER') el.textContent = t('register');
    });

    // Поля ввода
    document.getElementById('loginUsername').placeholder = t('username');
    document.getElementById('loginPassword').placeholder = t('password');
    document.getElementById('registerUsername').placeholder = t('new_username');
    document.getElementById('registerPassword').placeholder = t('password');
    document.getElementById('registerPasswordConfirm').placeholder = t('confirm_password');

    // Кнопки входа/регистрации
    document.getElementById('loginBtn').innerHTML = `
        <img src="assets/icon_key.png" alt="" class="btn-icon" />
        ${t('login_btn')}
    `;
    document.getElementById('registerBtn').innerHTML = `
        <img src="assets/icon_pencil.png" alt="" class="btn-icon" />
        ${t('register_btn')}
    `;

    // Кнопка выхода
    document.getElementById('logoutBtn').textContent = `🚪 ${t('exit_btn')}`;

    // Если есть имя игрока — обновляем приветствие
    if (currentPlayerName) {
        // Приветствие не показываем отдельно, но можно обновить статус
    }

    // Локации на карте (оставляем как есть, они не переводятся)
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
            updateAllTexts();
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
    updateAllTexts();
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
    updateAllTexts();
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

    let x = event.clientX + 15;
    let y = event.clientY + 15;

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

// ============================================================
//  📦 БАЗА ПРЕДМЕТОВ
// ============================================================

const ITEMS_DB = {
    'material_leather': { id: 'material_leather', name: 'КОЖА', icon: 'material_leather.png', type: 'material', rarity: 'common', desc: 'Прочная кожа' },
    'material_paper': { id: 'material_paper', name: 'БУМАГА', icon: 'material_paper.png', type: 'material', rarity: 'common', desc: 'Чистый лист' },
    'material_stone': { id: 'material_stone', name: 'КАМЕНЬ', icon: 'material_stone.png', type: 'material', rarity: 'common', desc: 'Обычный камень' },
    'material_thread': { id: 'material_thread', name: 'НИТЬ', icon: 'material_thread.png', type: 'material', rarity: 'common', desc: 'Прочная нить' },
    'material_wood': { id: 'material_wood', name: 'ДРЕВЕСИНА', icon: 'material_wood.png', type: 'material', rarity: 'common', desc: 'Обработанная древесина' },
    'sword_wood': { id: 'sword_wood', name: 'ДЕРЕВЯННЫЙ МЕЧ', icon: 'sword_wood.png', type: 'weapon', rarity: 'common', stats: { attack: 2, speed: 1.2 }, desc: 'Простой деревянный меч' },
    'sword_bloody_blade': { id: 'sword_bloody_blade', name: 'КРОВАВЫЙ КЛИНОК', icon: 'sword_bloody_blade.png', type: 'weapon', rarity: 'epic', stats: { attack: 12, speed: 1.4 }, effect: '15% шанс кровотечения', history: 'Выкован из стали, закалённой в крови павшего воина.' },
    'sword_shark_tooth': { id: 'sword_shark_tooth', name: 'ЗУБ АКУЛЫ', icon: 'sword_shark_tooth.png', type: 'weapon', rarity: 'epic', stats: { attack: 10, speed: 1.6 }, effect: 'Игнорирует 20% брони', history: 'Вырезан из зуба древней акулы.' },
    'sword_ancient_ruin': { id: 'sword_ancient_ruin', name: 'КЛИНОК ДРЕВНИХ', icon: 'sword_ancient_ruin.png', type: 'weapon', rarity: 'mythic', stats: { attack: 22, speed: 1.1 }, effect: '+50% урона нежити', history: 'Найден в руинах древней цивилизации.' },
    'sword_demon_slayer': { id: 'sword_demon_slayer', name: 'УБИЙЦА ДЕМОНОВ', icon: 'sword_demon_slayer.png', type: 'weapon', rarity: 'incredible', stats: { attack: 30, speed: 1.3 }, effect: '+100% урона демонам', history: 'Выкован из священного серебра.' },
    'sword_demonic_zariche': { id: 'sword_demonic_zariche', name: 'ДЕМОНИЧЕСКИЙ ЗАРИЧЕ', icon: 'sword_demonic_zariche.png', type: 'weapon', rarity: 'incredible', stats: { attack: 35, speed: 1.5 }, effect: 'Вампиризм: +10% от урона', history: 'Клинок, содержащий душу демона.' },
    'sword_elucidator': { id: 'sword_elucidator', name: 'ЭЛЮСИДАТОР', icon: 'sword_elucidator.png', type: 'weapon', rarity: 'incredible', stats: { attack: 38, speed: 1.7 }, effect: '+25% к критическому удару', history: 'Легендарный чёрный клинок.' },
    'sword_meliodas': { id: 'sword_meliodas', name: 'МЕЧ МЕЛИОДАСА', icon: 'sword_meliodas.png', type: 'weapon', rarity: 'incredible', stats: { attack: 32, speed: 1.4 }, effect: 'Разрушает магические барьеры', history: 'Клинок короля демонов.' },
    'sword_spine': { id: 'sword_spine', name: 'ПОЗВОНОЧНИК', icon: 'sword_spine.png', type: 'weapon', rarity: 'incredible', stats: { attack: 28, speed: 1.8 }, effect: 'Каждый 3-й удар x2 урон', history: 'Выкован из позвоночника дракона.' },
    'sword_zangetsu': { id: 'sword_zangetsu', name: 'ЗАНГЕЦУ', icon: 'sword_zangetsu.png', type: 'weapon', rarity: 'incredible', stats: { attack: 40, speed: 1.2 }, effect: 'Шанс 5% мгновенного убийства', history: 'Клинок, разрезающий луну.' }
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

// --- ФУНКЦИИ ---
function getItemData(itemId) { return ITEMS_DB[itemId] || null; }
function getRarityColor(rarity) { return RARITY_COLORS[rarity] || '#94a3b8'; }
function getRarityName(rarity) { return RARITY_NAMES[rarity] || rarity; }

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
    updateAllTexts();
}

function selectSlot(slotElement) {
    document.querySelectorAll('.inv-slot').forEach(s => {
        s.style.borderColor = '#3a3a3a';
        s.style.boxShadow = 'none';
        s.className = s.className.replace(/ selected-\w+/g, '');
    });

    const hasItem = slotElement.classList.contains('has-item');
    if (hasItem) {
        const itemId = slotElement.dataset.itemId;
        const item = getItemData(itemId);
        if (item) {
            const rarity = item.rarity;
            slotElement.style.borderColor = getRarityColor(rarity);
            slotElement.style.boxShadow = `0 0 15px ${getRarityColor(rarity)}44`;
            slotElement.classList.add(`selected-${rarity}`);
        }
    } else {
        slotElement.style.borderColor = '#3a3a3a';
        slotElement.style.boxShadow = 'none';
    }

    selectedSlot = slotElement;
    document.querySelectorAll('.inv-action').forEach(btn => {
        btn.classList.toggle('active', hasItem);
    });
}

// --- ЗАПОЛНЕНИЕ ИНВЕНТАРЯ (ВСЕ МЕЧИ) ---
function fillInventory() {
    const allSwords = [
        'sword_wood',
        'sword_shark_tooth',
        'sword_bloody_blade',
        'sword_ancient_ruin',
        'sword_demon_slayer',
        'sword_demonic_zariche',
        'sword_elucidator',
        'sword_meliodas',
        'sword_spine',
        'sword_zangetsu'
    ];
    const testItems = [
        ...allSwords,
        'material_leather',
        'material_wood',
        'material_stone',
        'material_paper',
        'material_thread'
    ];
    playerInventory = testItems;
    renderInventory();
}

// --- НАСТРОЙКА ЯЗЫКА ---
document.getElementById('languageSelect').addEventListener('change', function() {
    currentLang = this.value;
    localStorage.setItem('aincrad_language', currentLang);
    updateAllTexts();
    showStatus(`🌐 ${t('language')}: ${this.options[this.selectedIndex].text}`, 'info');
});

// --- ЗАГРУЗКА ЯЗЫКА ---
function loadLanguage() {
    const saved = localStorage.getItem('aincrad_language');
    if (saved && LANG[saved]) {
        currentLang = saved;
        document.getElementById('languageSelect').value = saved;
    }
    updateAllTexts();
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
        showStatus(`⚠️ ${t('username_short')}`, 'error');
        return;
    }
    if (!password || password.length < 4) {
        showStatus(`⚠️ ${t('password_short')}`, 'error');
        return;
    }
    if (password !== confirm) {
        showStatus(`⚠️ ${t('password_mismatch')}`, 'error');
        return;
    }

    const users = getUsers();
    if (users[username]) {
        showStatus(`⚠️ ${t('username_taken')}`, 'error');
        return;
    }

    users[username] = password;
    saveUsers(users);

    showStatus(`✅ ${t('register_success')}`, 'success');
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
    addLog(`👋 ${t('exit')}`, 'system');
});

// --- ВХОД ---
loginBtn.onclick = () => {
    const username = loginUsername.value.trim();
    const password = loginPassword.value.trim();

    if (!username || !password) {
        showStatus(`⚠️ ${t('enter_data')}`, 'error');
        return;
    }

    const users = getUsers();

    if (!users[username]) {
        showStatus(`❌ ${t('user_not_found')}`, 'error');
        return;
    }

    if (users[username] !== password) {
        showStatus(`❌ ${t('login_error')}`, 'error');
        return;
    }

    // ===== ВХОД В ИГРУ =====
    mainLogo.classList.add('hidden');
    tabsContainer.classList.add('visible');
    loginSection.classList.add('hidden');
    gameWorld.classList.remove('hidden');
    currentLocation = null;
    currentPlayerName = username;

    loadLanguage();
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
                showStatus(`📍 ${t('already_there')} ${locName}`, 'info');
                addLog(`📍 ${t('already_there')} ${locName}`, 'system');
                return;
            }
            currentLocation = locId;
            addLog(`📍 ${t('moving_to')} ${locName}`, 'player');
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
            addLog(`⚔️ ${t('equipped')}: ${item.name}`, 'loot');
            showStatus(`⚔️ ${t('equipped')}: ${item.name}`, 'success');
        } else {
            addLog(`⚠️ ${t('cannot_equip')} ${item.name}`, 'enemy');
            showStatus(`⚠️ ${t('cannot_equip')}`, 'error');
        }
    });

    document.getElementById('btnUse').addEventListener('click', function() {
        if (!selectedSlot || !selectedSlot.dataset.itemId) return;
        const itemId = selectedSlot.dataset.itemId;
        const item = getItemData(itemId);
        if (item) {
            addLog(`🧪 ${t('used')}: ${item.name}`, 'player');
            showStatus(`🧪 ${t('used')}: ${item.name}`, 'info');
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
                addLog(`🗑️ ${t('deleted')}: ${item.name}`, 'enemy');
                showStatus(`🗑️ ${t('deleted')}: ${item.name}`, 'info');
            }
        }
    });

    addLog(`🌟 ${t('welcome')}`, 'system');
    addLog(`📖 ${t('adventure')}`, 'system');
    showStatus('', 'info');
};

// --- ЗАПУСК ---
loadLanguage();
document.getElementById('languageSelect').value = currentLang;
console.log('🎮 АЙНКРАД ЗАГРУЖЕН!');
