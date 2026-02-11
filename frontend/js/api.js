/**
 * SIMSOLDIER API CLIENT
 * 負責所有資料存取 (目前使用 LocalStorage 模擬，未來可直接替換為 fetch)
 */

const DB_KEY = 'simSoldier_users';
const SESSION_KEY = 'simSoldier_currentUser';

function getLocalUsers() {
    return JSON.parse(localStorage.getItem(DB_KEY) || '{}');
}

function saveLocalUsers(users) {
    localStorage.setItem(DB_KEY, JSON.stringify(users));
}

export const api = {
    // 模擬網路延遲
    _delay: (ms = 500) => new Promise(resolve => setTimeout(resolve, ms)),

    /**
     * 登入
     * @param {string} username 
     * @param {string} password 
     */
    async login(username, password) {
        await this._delay();
        const users = getLocalUsers();
        const user = users[username];

        if (user && user.password === password) {
            sessionStorage.setItem(SESSION_KEY, username);
            return { success: true, username };
        }
        throw new Error('帳號或密碼錯誤');
    },

    /**
     * 檢查帳號是否存在
     * @param {string} username 
     */
    async checkUsernameExists(username) {
        await this._delay(300);
        const users = getLocalUsers();
        return !!users[username];
    },

    /**
     * 註冊
     * @param {object} params { username, password, profile: {...} }
     */
    async register({ username, password, profile }) {
        await this._delay();
        const users = getLocalUsers();

        if (users[username]) {
            throw new Error('此帳號已被註冊');
        }

        users[username] = {
            password,
            createdAt: new Date().toISOString(),
            profile
        };

        saveLocalUsers(users);
        sessionStorage.setItem(SESSION_KEY, username);
        return { success: true, username };
    },

    /**
     * 取得目前使用者資料
     */
    async getMe() {
        // await this._delay(200); // 讓 UI 反應更快一點
        const currentUser = sessionStorage.getItem(SESSION_KEY);
        if (!currentUser) throw new Error('Not logged in');

        const users = getLocalUsers();
        return users[currentUser]; // Return full user object
    },

    /**
     * 更新使用者 Profile
     * @param {object} newProfile 
     */
    async updateProfile(newProfile) {
        await this._delay();
        const currentUser = sessionStorage.getItem(SESSION_KEY);
        if (!currentUser) throw new Error('Not logged in');

        const users = getLocalUsers();
        if (!users[currentUser]) throw new Error('User data not found');

        // Merge logic
        users[currentUser].profile = { ...users[currentUser].profile, ...newProfile };
        saveLocalUsers(users);

        return users[currentUser].profile;
    },

    /**
     * 登出
     */
    logout() {
        sessionStorage.removeItem(SESSION_KEY);
        window.location.href = 'loadingbar.html?dest=login.html';
    },

    /**
     * 檢查是否已登入
     */
    checkAuth() {
        return !!sessionStorage.getItem(SESSION_KEY);
    }
};
