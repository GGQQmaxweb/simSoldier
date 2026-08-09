/**
 * SIMSOLDIER STATE
 * 管理全域應用程式狀態
 */

export const state = {
    isLoggedIn: false,
    userData: null,
    serviceStatus: null,
    activeTab: 'home',
    userScenario: 'preparing', // 'preparing' | 'enlisted' | 'deferred'
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
    // 一、 必備行政證件與資料
    { id: 1, name: "徵集令正本", category: "document", acquired: false, required: true, note: "入伍通知書，報到必查" },
    { id: 2, name: "身分證與健保卡正本", category: "document", acquired: false, required: true, note: "身分查驗與健保登記使用" },
    { id: 3, name: "郵局或指定銀行存摺正面影本", category: "document", acquired: false, required: true, note: "供發放薪資使用，指定銀行通常為土地銀行、合作金庫或台新銀行" },
    { id: 4, name: "私章", category: "document", acquired: false, required: true, note: "建議準備便宜的普通木頭章，用於簽核文件與領福利金，勿帶銀行印鑑章以免遺失" },
    { id: 5, name: "最高學歷畢（結）業證書影本", category: "document", acquired: false, required: true, note: "辦理役別甄選或專長分發用" },
    { id: 6, name: "軍訓課程折抵成績單正本", category: "document", acquired: false, required: true, note: "全民國防教育折抵成績單，需回母校教官室蓋折抵章，這是提早退伍的唯一依據" },
    { id: 7, name: "戶口名簿影本", category: "document", acquired: false, required: true, note: "填寫資料及辦理戶籍地分發參考用" },
    { id: 8, name: "特殊專長證照與診斷證明", category: "document", acquired: false, required: false, note: "特殊專長證照、汽車駕照正本或個人特殊醫療診斷證明（視個人情況攜帶）" },

    // 二、 財務與電子通訊
    { id: 9, name: "現金與零錢", category: "financial_comm", acquired: false, required: false, note: "建議攜帶 1,000～3,000元，並多換 10/50元硬幣及 100元小鈔，用於投飲料、打電話或繳剪髮/洗衣雜費" },
    { id: 10, name: "智慧型手機", category: "financial_comm", acquired: false, required: false, note: "嚴禁攜帶中國大陸廠牌（如小米、華為、OPPO等）。手機入營會集中保管，定時開放使用" },
    { id: 11, name: "行動電源與充電線", category: "financial_comm", acquired: false, required: false, note: "營區不提供充電插座，請務必自備大容量行動電源" },
    { id: 12, name: "有線耳機", category: "financial_comm", acquired: false, required: false, note: "軍中多禁止使用藍牙裝置，若要在吵雜時段講電話，建議準備有線耳機" },
    { id: 13, name: "IC電話卡", category: "financial_comm", acquired: false, required: false, note: "入營初期手機開放時間極短，排隊打公用電話是與外界聯繫的保命符" },

    // 三、 盥洗與個人衛生用品
    { id: 14, name: "三合一沐浴乳", category: "hygiene", acquired: false, required: false, note: "強烈建議攜帶，一瓶可洗頭、洗臉加洗身體，能大幅節省戰鬥澡的時間並節省內務櫃空間" },
    { id: 15, name: "刮鬍刀", category: "hygiene", acquired: false, required: false, note: "手動拋棄式或電池式，營區不提供充電，切勿帶充電式電動刮鬍刀" },
    { id: 16, name: "衛生紙與袖珍面紙", category: "hygiene", acquired: false, required: false, note: "準備 1-2 包大包抽取式放寢室，並多備袖珍包隨身攜帶，方便操課時如廁或擦汗" },
    { id: 17, name: "指甲剪", category: "hygiene", acquired: false, required: false, note: "必須具備集屑器，以維持環境整潔" },
    { id: 18, name: "牙膏、牙刷與素色拖鞋", category: "hygiene", acquired: false, required: false, note: "牙膏、牙刷與素色止滑拖鞋（如藍白拖）" },

    // 四、 醫療與防蚊防護
    { id: 19, name: "防蚊用品", category: "medical", acquired: false, required: false, note: "嚴禁噴霧式防蚊液（屬違禁品會被沒收），請改帶膏狀、滾珠瓶或防蚊貼片（可貼於迷彩服內側或蚊帳）" },
    { id: 20, name: "個人常備藥品", category: "medical", acquired: false, required: false, note: "如感冒藥、胃藥、止痛藥、外用藥膏。入營後口服藥會統一保管並定時領用，務必保留原藥袋或處方箋" },
    { id: 21, name: "耳塞與眼罩", category: "medical", acquired: false, required: false, note: "大寢室幾十人同睡打呼與磨牙聲大，淺眠者必備耳塞（打靶時也能用）與眼罩" },
    { id: 22, name: "痱子粉或涼感濕紙巾", category: "medical", acquired: false, required: false, note: "蘆薈凝露亦可。夏天入伍極易長濕疹或曬傷，能幫助舒緩並較好入睡" },

    // 五、 實用生活小物（口袋內務）
    { id: 23, name: "防水拉鏈袋 (A6大小)", category: "essentials", acquired: false, required: false, note: "準備數個大小不一的防水袋，裝零錢、證件、小筆記本，方便塞進迷彩服口袋並防汗雨水" },
    { id: 24, name: "防水電子錶", category: "essentials", acquired: false, required: false, note: "必須具備夜光與鬧鐘功能。手機不在身上時，手錶是唯一能讓你在規定時間內集合的工具" },
    { id: 25, name: "奇異筆/簽字筆", category: "essentials", acquired: false, required: false, note: "務必在所有個人物品（如公發毛巾、內衣褲等）上寫上學號姓名，以免大鍋洗後拿錯或遺失" },
    { id: 26, name: "筆記本與原子筆", category: "essentials", acquired: false, required: false, note: "隨身記錄班長交代事項或抄寫單兵注意詞" },
    { id: 27, name: "生活照片 3 張", category: "essentials", acquired: false, required: false, note: "4X6 尺寸，用於貼在大兵手記上" },

    // 六、 特定軍種與特殊需求
    { id: 28, name: "海軍特殊用品", category: "special", acquired: false, required: false, note: "海軍有游泳訓練，需自備黑色游泳褲（公發尺寸較小）及有度數的泳鏡" },
    { id: 29, name: "海陸固定繩/備用眼鏡", category: "special", acquired: false, required: false, note: "海軍陸戰隊操課極耗體力，強烈建議近視者加裝眼鏡固定繩，並多備一副眼鏡" },
    { id: 30, name: "便服一套", category: "special", acquired: false, required: false, note: "通常只需穿入營那一套即可，放假時會直接穿同一套回家，不需額外多帶佔空間" },
    { id: 31, name: "注意：絕對不要攜帶違禁品", category: "special", acquired: false, required: false, note: "禁止打火機、香菸、酒、檳榔、撲克牌、各類噴霧罐、刀械、藍牙耳機及平板電腦等。內衣褲與襪子部隊皆會發放與洗滌" }
];

