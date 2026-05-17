/**
 * SIMSOLDIER STATE
 * 管理全域應用程式狀態
 */

export const state = {
    isLoggedIn: false,
    userData: null,
    serviceStatus: null,
    activeTab: 'home',
    backpack: [],
    game: {
        isPlaying: false,
        score: 0,
        timeLeft: 30,
        timer: null,
        spawnTimer: null,
        mosquitoes: []
    },
    training: {
        completed: [] // Array of day IDs
    }
};

// 預設背包清單
export const INITIAL_BACKPACK = [
    { id: 1, name: "徵集令", category: "document", acquired: false, required: true },
    { id: 2, name: "身分證", category: "document", acquired: false, required: true },
    { id: 3, name: "健保卡", category: "document", acquired: false, required: true },
    { id: 4, name: "印章", category: "document", acquired: false, required: true },
    { id: 5, name: "郵局存摺影本", category: "document", acquired: false, required: true },
    { id: 6, name: "畢業證書影本", category: "document", acquired: false, required: false },
    { id: 7, name: "戶籍謄本", category: "document", acquired: false, required: false },
    { id: 8, name: "便宜電子錶", category: "life", acquired: false, required: true, note: "有夜光/鬧鐘功能" },
    { id: 9, name: "三合一沐浴乳", category: "life", acquired: false, required: true },
    { id: 10, name: "爽身粉", category: "life", acquired: false, required: false, note: "夏天必備" },
    { id: 11, name: "電話卡", category: "life", acquired: false, required: false },
    { id: 12, name: "零錢 (投販賣機)", category: "life", acquired: false, required: false },
    { id: 13, name: "免洗內褲", category: "clothing", acquired: false, required: false },
    { id: 14, name: "黑色長襪", category: "clothing", acquired: false, required: true, note: "過腳踝" },
];
