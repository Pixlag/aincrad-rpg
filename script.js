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
        exit: 'ВЫ ВЫШЛИ ИЗ ИГРЫ'
    },
    en: {
        inventory: 'INVENTORY',
        profile: 'PROFILE',
        map: 'WORLD MAP',
        settings: 'SETTINGS',
        name: 'Name',
        level: 'Level',
        gold: 'Gold',
        kills: 'Kills',
        sound: 'SOUND',
        music: 'MUSIC',
        ignore_npc: 'IGNORE NPC',
        language: 'LANGUAGE',
        equip: 'Equip',
        use: 'Use',
        delete: 'Delete',
        welcome: 'WELCOME TO AINCRAD!',
        adventure: 'YOUR ADVENTURE BEGINS!',
        already_there: 'YOU ARE ALREADY IN',
        moving_to: 'MOVING TO',
        equipped: 'EQUIPPED',
        used: 'USED',
        deleted: 'DELETED',
        cannot_equip: 'CANNOT EQUIP',
        exit: 'YOU HAVE LEFT THE GAME'
    },
    de: {
        inventory: 'INVENTAR',
        profile: 'PROFIL',
        map: 'WELTKARTE',
        settings: 'EINSTELLUNGEN',
        name: 'Name',
        level: 'Stufe',
        gold: 'Gold',
        kills: 'Tötungen',
        sound: 'TON',
        music: 'MUSIK',
        ignore_npc: 'NPC IGNORIEREN',
        language: 'SPRACHE',
        equip: 'Ausrüsten',
        use: 'Benutzen',
        delete: 'Löschen',
        welcome: 'WILLKOMMEN IN AINCRAD!',
        adventure: 'DEIN ABENTEUER BEGINNT!',
        already_there: 'SIE SIND BEREITS IN',
        moving_to: 'BEWEGEN NACH',
        equipped: 'AUSGERÜSTET',
        used: 'BENUTZT',
        deleted: 'GELÖSCHT',
        cannot_equip: 'KANN NICHT AUSGERÜSTET WERDEN',
        exit: 'SIE HABEN DAS SPIEL VERLASSEN'
    },
    fr: {
        inventory: 'INVENTAIRE',
        profile: 'PROFIL',
        map: 'CARTE DU MONDE',
        settings: 'PARAMÈTRES',
        name: 'Nom',
        level: 'Niveau',
        gold: 'Or',
        kills: 'Tués',
        sound: 'SON',
        music: 'MUSIQUE',
        ignore_npc: 'IGNORER LES PNJ',
        language: 'LANGUE',
        equip: 'Équiper',
        use: 'Utiliser',
        delete: 'Supprimer',
        welcome: 'BIENVENUE À AINCRAD!',
        adventure: 'VOTRE AVENTURE COMMENCE!',
        already_there: 'VOUS ÊTES DÉJÀ À',
        moving_to: 'DÉPLACEMENT VERS',
        equipped: 'ÉQUIPÉ',
        used: 'UTILISÉ',
        deleted: 'SUPPRIMÉ',
        cannot_equip: 'IMPOSSIBLE D\'ÉQUIPER',
        exit: 'VOUS AVEZ QUITTÉ LE JEU'
    },
    es: {
        inventory: 'INVENTARIO',
        profile: 'PERFIL',
        map: 'MAPA DEL MUNDO',
        settings: 'AJUSTES',
        name: 'Nombre',
        level: 'Nivel',
        gold: 'Oro',
        kills: 'Asesinatos',
        sound: 'SONIDO',
        music: 'MÚSICA',
        ignore_npc: 'IGNORAR PNJ',
        language: 'IDIOMA',
        equip: 'Equipar',
        use: 'Usar',
        delete: 'Eliminar',
        welcome: '¡BIENVENIDO A AINCRAD!',
        adventure: '¡TU AVENTURA COMIENZA!',
        already_there: 'YA ESTÁS EN',
        moving_to: 'MOVIÉNDOSE A',
        equipped: 'EQUIPADO',
        used: 'USADO',
        deleted: 'ELIMINADO',
        cannot_equip: 'NO SE PUEDE EQUIPAR',
        exit: 'HAS SALIDO DEL JUEGO'
    },
    zh: {
        inventory: '背包',
        profile: '个人资料',
        map: '世界地图',
        settings: '设置',
        name: '名称',
        level: '等级',
        gold: '金币',
        kills: '击杀',
        sound: '声音',
        music: '音乐',
        ignore_npc: '忽略NPC',
        language: '语言',
        equip: '装备',
        use: '使用',
        delete: '删除',
        welcome: '欢迎来到艾因克拉德！',
        adventure: '你的冒险开始了！',
        already_there: '你已经在',
        moving_to: '正在前往',
        equipped: '已装备',
        used: '已使用',
        deleted: '已删除',
        cannot_equip: '无法装备',
        exit: '你已退出游戏'
    },
    ja: {
        inventory: 'インベントリ',
        profile: 'プロフィール',
        map: '世界地図',
        settings: '設定',
        name: '名前',
        level: 'レベル',
        gold: 'ゴールド',
        kills: 'キル数',
        sound: 'サウンド',
        music: '音楽',
        ignore_npc: 'NPCを無視',
        language: '言語',
        equip: '装備',
        use: '使用',
        delete: '削除',
        welcome: 'アインクラッドへようこそ！',
        adventure: '冒険が始まる！',
        already_there: '既に',
        moving_to: '移動中',
        equipped: '装備済み',
        used: '使用済み',
        deleted: '削除済み',
        cannot_equip: '装備できません',
        exit: 'ゲームを終了しました'
    },
    ko: {
        inventory: '인벤토리',
        profile: '프로필',
        map: '세계 지도',
        settings: '설정',
        name: '이름',
        level: '레벨',
        gold: '골드',
        kills: '처치',
        sound: '사운드',
        music: '음악',
        ignore_npc: 'NPC 무시',
        language: '언어',
        equip: '장비',
        use: '사용',
        delete: '삭제',
        welcome: '아인크라드에 오신 것을 환영합니다!',
        adventure: '모험이 시작됩니다!',
        already_there: '이미',
        moving_to: '이동 중',
        equipped: '장착 완료',
        used: '사용 완료',
        deleted: '삭제 완료',
        cannot_equip: '장착할 수 없음',
        exit: '게임을 종료했습니다'
    }
};

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

function getLang(key) {
    return LANG[currentLang]?.[key] || LANG.ru[key] || key;
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
            updatePanelLanguage();
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
    updatePanelLanguage();
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
    updatePanelLanguage();
}

function updatePanelLanguage() {
    document.querySelectorAll('.tab-panel:not(.hidden) h2').forEach(el => {
        const text = el.textContent.trim();
        if (text.includes('ПРОФИЛЬ') || text.includes('PROFILE') || text.includes('PROFIL')) {
            el.textContent = `👤 ${getLang('profile')}`;
        } else if (text.includes('ИНВЕНТАРЬ') || text.includes('INVENTORY') || text.includes('INVENTAR')) {
            el.textContent = `🎒 ${getLang('inventory')}`;
        } else if (text.includes('КАРТА') || text.includes('MAP') || text.includes('WELTKARTE')) {
            el.textContent = `🗺️ ${getLang('map')}`;
        } else if (text.includes('НАСТРОЙКИ') || text.includes('SETTINGS') || text.includes('EINSTELLUNGEN')) {
            el.textContent = `⚙️ ${getLang('settings')}`;
        }
    });

    // Обновляем настройки
    document.querySelectorAll('.settings-item label').forEach(label => {
        const text = label.textContent.trim();
        if (text.includes('ЗВУК') || text.includes('SOUND')) label.textContent = `🔊 ${getLang('sound')}`;
        else if (text.includes('МУЗЫКА') || text.includes('MUSIC')) label.textContent = `🎵 ${getLang('music')}`;
        else if (text.includes('ИГНОРИРОВАТЬ') || text.includes('IGNORE')) label.textContent = `🚫 ${getLang('ignore_npc')}`;
        else if (text.includes('ЯЗЫК') || text.includes('LANGUAGE')) label.textContent = `🌐 ${getLang('language')}`;
    });
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
    // Добавляем материалы для разнообразия
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
    updatePanelLanguage();
    // Обновляем текст в логах (если нужно)
    showStatus(`🌐 Язык изменён на ${this.options[this.selectedIndex].text}`, 'info');
});

// --- ЗАГРУЗКА ЯЗЫКА ---
function loadLanguage() {
    const saved = localStorage.getItem('aincrad_language');
    if (saved && LANG[saved]) {
        currentLang = saved;
        document.getElementById('languageSelect').value = saved;
    }
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
    addLog(`👋 ${getLang('exit')}`, 'system');
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
                showStatus(`📍 ${getLang('already_there')} ${locName}`, 'info');
                addLog(`📍 ${getLang('already_there')} ${locName}`, 'system');
                return;
            }
            currentLocation = locId;
            addLog(`📍 ${getLang('moving_to')} ${locName}`, 'player');
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
            addLog(`⚔️ ${getLang('equipped')}: ${item.name}`, 'loot');
            showStatus(`⚔️ ${getLang('equipped')}: ${item.name}`, 'success');
        } else {
            addLog(`⚠️ ${getLang('cannot_equip')} ${item.name}`, 'enemy');
            showStatus(`⚠️ ${getLang('cannot_equip')}`, 'error');
        }
    });

    document.getElementById('btnUse').addEventListener('click', function() {
        if (!selectedSlot || !selectedSlot.dataset.itemId) return;
        const itemId = selectedSlot.dataset.itemId;
        const item = getItemData(itemId);
        if (item) {
            addLog(`🧪 ${getLang('used')}: ${item.name}`, 'player');
            showStatus(`🧪 ${getLang('used')}: ${item.name}`, 'info');
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
                addLog(`🗑️ ${getLang('deleted')}: ${item.name}`, 'enemy');
                showStatus(`🗑️ ${getLang('deleted')}: ${item.name}`, 'info');
            }
        }
    });

    addLog(`🌟 ${getLang('welcome')}`, 'system');
    addLog(`📖 ${getLang('adventure')}`, 'system');
    showStatus('', 'info');
};

// --- ЗАПУСК ---
loadLanguage();
document.getElementById('languageSelect').value = currentLang;
console.log('🎮 АЙНКРАД ЗАГРУЖЕН!');
