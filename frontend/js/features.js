/**
 * SIMSOLDIER FEATURES
 * 包含：背包、聊天室、課表、影片、說明文件、日曆、倒數
 */

import { state } from './state.js';
import { dom } from './ui.js';
import { api } from './api.js';

// --- Constants ---
const INSTRUCTOR_RESPONSES = [
    "大聲點！我聽不見！", "懷疑啊？", "你這個兵怎麼當的？", "不要給我嬉皮笑臉！",
    "洗澡只有三分鐘，還在這邊跟我聊天？", "注意禮節！", "是不是想洞八？",
    "公差出列！", "還有時間滑手機？", "棉被折好了沒？"
];

const DOCS_DATA = {
    units: {
        title: "全國役政單位資料",
        content: "TABLE_PLACEHOLDER", // Will be init
        link: null
    },
    recheck: {
        title: "體位複檢標準表",
        content: "若您對體檢結果有疑義（如BMI過高/過低、視力問題、扁平足等），可申請複檢。<br><br>請參考下方標準圖表或是點擊連結查看詳細法規。<br><br><img src='docs/體位區分標準圖.png' class='w-full rounded mt-4 border border-stone-600' alt='體位區分標準圖'>",
        link: "https://dca.moi.gov.tw/PhysicalStatus/"
    },
    contact: {
        title: "各縣市役政單位通訊錄",
        content: "若您有兵單遺失、徵集日期查詢、抵免役期辦理等問題，請直接聯繫戶籍地公所兵役科。<br><br>詳細電話與地址請點擊下方連結至內政部役政司網站查詢。",
        link: "https://dca.moi.gov.tw/chaspx/news.aspx?web=225"
    },
    rights: {
        title: "軍人權益懶人包",
        content: "包含薪資福利、喪葬補助、軍保醫療、以及申訴管道 (1985) 之完整說明。<br><br>當兵不是坐牢，保障自身權益是您的義務。若遇不當管教或權益受損，請利用申訴管道。",
        link: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=F0030049"
    },
    shengjia: {
        title: "身家調查說明",
        content: `
<p class="text-stone-400 text-sm mb-4">身家調查是徵兵體檢前的重要準備作業，由公所兵役科人員進行訪談並填寫資料。調查結果會影響後續體檢、延役與專長兵抽籤資格，務必如實填寫。</p>

<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">

  <div class="bg-stone-800 rounded-lg p-4 border border-stone-700">
    <div class="flex items-center gap-2 mb-2">
      <i class="fa-solid fa-id-card text-blue-400 text-lg"></i>
      <h4 class="font-bold text-white">一、基本資料</h4>
    </div>
    <ul class="text-stone-300 text-sm space-y-1 list-disc list-inside ml-2">
      <li>姓名</li>
      <li>身分證字號</li>
      <li>戶籍地址與現住址</li>
      <li>聯絡電話</li>
    </ul>
  </div>

  <div class="bg-stone-800 rounded-lg p-4 border border-stone-700">
    <div class="flex items-center gap-2 mb-2">
      <i class="fa-solid fa-graduation-cap text-green-400 text-lg"></i>
      <h4 class="font-bold text-white">二、就學意願</h4>
    </div>
    <p class="text-stone-300 text-sm mb-2">攸關是否辦理延役，必須如實說明：</p>
    <ul class="text-stone-300 text-sm space-y-1 list-disc list-inside ml-2">
      <li>大四畢業後是否直接入伍？</li>
      <li>是否有繼續升學（碩班、插大等）的計畫？</li>
      <li class="text-amber-300">⚠ 有升學意願者可申請延役，於20歲之年11月15日前暫不接受徵集。</li>
    </ul>
  </div>

  <div class="bg-stone-800 rounded-lg p-4 border border-stone-700">
    <div class="flex items-center gap-2 mb-2">
      <i class="fa-solid fa-heart-pulse text-red-400 text-lg"></i>
      <h4 class="font-bold text-white">三、健康狀況</h4>
    </div>
    <p class="text-stone-300 text-sm mb-2">調查後系統會在體檢表上自動註記，供醫生參考：</p>
    <ul class="text-stone-300 text-sm space-y-1 list-disc list-inside ml-2">
      <li>是否領有身心障礙證明（手冊）？請說明疾病類別及等級</li>
      <li>是否有重大傷病、開刀紀錄？請填寫疾病名稱或手術日期</li>
      <li>是否有遺傳性疾病？</li>
      <li>是否曾就讀身心障礙之特殊教育班、特殊教育學校或資源班？</li>
    </ul>
  </div>

  <div class="bg-stone-800 rounded-lg p-4 border border-amber-700/50 border-2">
    <div class="flex items-center gap-2 mb-2">
      <i class="fa-solid fa-certificate text-amber-400 text-lg"></i>
      <h4 class="font-bold text-white">四、專長證照 <span class="text-amber-400 text-xs font-normal ml-1">⭐ 非常重要！影響專長兵抽籤資格</span></h4>
    </div>
    <p class="text-stone-300 text-sm mb-2">具備以下類型的<strong class="text-amber-300">國家級證照</strong>，才有資格參與「專長兵優先抽籤」：</p>
    <ul class="text-stone-300 text-sm space-y-1 list-disc list-inside ml-2">
      <li>資訊安全相關證照</li>
      <li>汽車修護技術士</li>
      <li>廚師丙級以上</li>
      <li>醫護人員執照（醫師、護理師等）</li>
      <li>其他經政府認定之技術士或專業執照</li>
    </ul>
    <p class="text-amber-300 text-xs mt-2">※ 記得攜帶證照正本或影本備查！</p>
  </div>

  <div class="bg-stone-800 rounded-lg p-4 border border-stone-700">
    <div class="flex items-center gap-2 mb-2">
      <i class="fa-solid fa-briefcase text-purple-400 text-lg"></i>
      <h4 class="font-bold text-white">五、個人專長</h4>
    </div>
    <ul class="text-stone-300 text-sm space-y-1 list-disc list-inside ml-2">
      <li>就讀科系（專長科系）</li>
      <li>目前從事職業</li>
      <li>民間職業專長（請說明初學／半熟練／熟練／精通）</li>
      <li>方言能力（閩南語、客家語、原住民語 — 粗通或流利）</li>
      <li>外國語言（英語、日語等 — 讀說寫譯能力）</li>
    </ul>
  </div>

</div>

<div class="mt-6">
  <h4 class="text-stone-400 text-sm font-bold mb-2 uppercase tracking-wider">官方身家調查表格參考</h4>
  <a href="docs/身家調查表格.pdf" download="身家調查表格.pdf"
     class="inline-flex items-center gap-3 bg-amber-600 hover:bg-amber-500 active:scale-95 text-white font-bold px-6 py-3 rounded-lg shadow-lg transition-all duration-150">
    <i class="fa-solid fa-file-pdf text-xl"></i>
    <span>下載身家調查表格 PDF</span>
    <i class="fa-solid fa-download text-sm opacity-70"></i>
  </a>
</div>
        `,
        link: null
    }
};

// --- Inventory ---
export function renderInventory() {
    dom.inventoryListRequired.innerHTML = '';
    dom.inventoryListOptional.innerHTML = '';

    state.backpack.forEach(item => {
        const div = document.createElement('div');
        div.className = `p-4 rounded-lg border cursor-pointer transition-all hover:bg-stone-700 flex justify-between items-center group ${item.acquired ? 'bg-green-900/20 border-green-700' : 'bg-stone-800 border-stone-700'}`;
        div.onclick = () => toggleItem(item.id);

        div.innerHTML = `
            <div class="flex items-center gap-3">
                <div class="w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${item.acquired ? 'bg-green-500 border-green-500' : 'border-stone-500'}">
                    ${item.acquired ? '<i class="fa-solid fa-check text-white text-xs"></i>' : ''}
                </div>
                <div>
                    <div class="font-bold border-stone-200 ${item.acquired ? 'text-green-400 line-through decoration-green-500/50' : 'text-stone-200'}">${item.name}</div>
                    ${item.note ? `<div class="text-xs text-stone-500">${item.note}</div>` : ''}
                    ${item.link ? `<a href="${item.link}" target="_blank" onclick="event.stopPropagation()" class="mt-1.5 inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 border border-amber-800/60 hover:border-amber-600 bg-amber-900/20 hover:bg-amber-900/40 px-2 py-0.5 rounded transition-colors"><i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i> 前往役政署身家調查資訊</a>` : ''}
                </div>
            </div>
            ${item.required ? '<span class="text-xs bg-red-900/50 text-red-300 px-2 py-1 rounded">必備</span>' : ''}
        `;

        if (item.required) {
            dom.inventoryListRequired.appendChild(div);
        } else {
            dom.inventoryListOptional.appendChild(div);
        }
    });
}

function toggleItem(id) {
    const item = state.backpack.find(i => i.id === id);
    if (item) {
        item.acquired = !item.acquired;
        renderInventory();
    }
}

// --- Chat ---
export async function handleChatSubmit(e) {
    e.preventDefault();
    const text = dom.chatInput.value.trim();
    if (!text) return;

    // Add user message
    addMessage(text, 'user');
    dom.chatInput.value = '';

    // Add "typing" indicator
    const typingId = 'typing-' + Date.now();
    addTypingIndicator(typingId);

    try {
        const response = await api.askSimSoldier(text);
        removeTypingIndicator(typingId);
        addMessage(response, 'bot');
        
        // 若回應中含有 GPS 觸發標記，則自動執行 GPS 定位與醫院計算
        if (response.includes('id="hospital-gps-auto-trigger"')) {
            autoTriggerHospitalGPS();
        }
    } catch (e) {
        removeTypingIndicator(typingId);
        addMessage('班長現在不在營區，請稍後再試。', 'bot');
    }
}

function addTypingIndicator(id) {
    const div = document.createElement('div');
    div.id = id;
    div.className = `flex justify-start items-start gap-2 mb-3 animate-fade-in`;
    div.innerHTML = `
        <div class="w-8 h-8 rounded-full bg-stone-700 flex-shrink-0 border border-green-600 overflow-hidden">
            <img src="assets/images/instructor/instructor_avatar.png" class="w-full h-full object-cover">
        </div>
        <div class="px-3 py-2 rounded-xl bg-stone-700 text-stone-200 rounded-bl-none flex gap-1 items-center shadow-md">
            <span class="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce" style="animation-delay: 0.1s"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce" style="animation-delay: 0.2s"></span>
        </div>
    `;
    dom.chatMessages.appendChild(div);
    dom.chatMessages.scrollTop = dom.chatMessages.scrollHeight;
}

function removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

function addMessage(text, sender) {
    const div = document.createElement('div');
    const isUser = sender === 'user';
    div.className = `flex ${isUser ? 'justify-end' : 'justify-start'} items-start gap-2 mb-4 animate-fade-in`;

    const contentClass = isUser
        ? "bg-green-700 text-white rounded-br-none"
        : "bg-stone-700 text-stone-200 rounded-bl-none";

    const avatar = isUser
        ? `<div class="w-8 h-8 rounded-full bg-green-800 flex-shrink-0 border border-green-600 flex items-center justify-center text-[14px] text-white overflow-hidden order-2 shadow-sm">
            <i class="fa-solid fa-user w-4 h-4 flex items-center justify-center"></i>
           </div>`
        : `<div class="w-8 h-8 rounded-full bg-stone-800 flex-shrink-0 border border-green-600 overflow-hidden order-1 shadow-sm">
            <img src="assets/images/instructor/instructor_avatar.png" class="w-full h-full object-cover">
           </div>`;

    div.innerHTML = `
        ${avatar}
        <div class="max-w-[85%] md:max-w-[50%] px-4 py-2 rounded-xl text-sm md:text-base shadow-md ${contentClass} whitespace-pre-wrap leading-snug ${isUser ? 'order-1 mr-1' : 'order-2 ml-1'}">
            ${text.replace(/\n{3,}/g, '\n\n').trim()}
        </div>
    `;
    dom.chatMessages.appendChild(div);
    dom.chatMessages.scrollTop = dom.chatMessages.scrollHeight;
}

export function initChatGreeting() {
    dom.chatMessages.innerHTML = '';

    if (!state.userData || !state.serviceStatus) {
        addMessage("注意！有什麼問題現在問，不要進去才在那邊什麼都不知道！", 'bot');
        return;
    }

    const name = state.userData.name || "菜鳥";
    const statusType = state.serviceStatus.type || "";

    let greeting = "";
    if (statusType.includes("免役")) {
        greeting = `注意！${name}，聽說你免役了是不是？那還來戰情中心幹嘛？不想去玩沙就來練習問答！`;
    } else if (statusType.includes("替代役")) {
        greeting = `注意！${name}，${statusType}也是要好好表現的，不要給我丟臉！有什麼問題現在提早問！`;
    } else {
        if (!state.userData.date) {
            greeting = `注意！${name}，連入伍日期都還沒去設定，皮在癢是不是？遇到什麼不懂的趕緊發問！`;
        } else {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const targetDate = new Date(state.userData.date);
            targetDate.setHours(0, 0, 0, 0);

            const dischargeDate = new Date(targetDate);
            dischargeDate.setMonth(dischargeDate.getMonth() + 4);

            if (today >= dischargeDate) {
                greeting = `注意！${name}，你都退伍了還回來幹嘛？想重新簽志願役是不是？！`;
            } else if (today >= targetDate) {
                greeting = `您好！${name}，這裡是 simSoldier 官方諮詢服務，請說明您的問題！`;
            } else {
                const diffDays = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
                greeting = `注意！${name}，距離你入營只剩 ${diffDays} 天！東西準備好了沒？有問題快問！`;
            }
        }
    }

    addMessage(greeting, 'bot');
}


// --- Training ---
export function toggleTrainingDay(dayId, cardElement, btnElement) {
    const isCompleted = state.training.completed.includes(dayId);

    if (isCompleted) {
        state.training.completed = state.training.completed.filter(id => id !== dayId);
        cardElement.classList.remove('border-green-500', 'bg-green-900/20');
        cardElement.classList.add('border-l-4', 'border-stone-600');
        if (btnElement) {
            btnElement.className = "btn-confirm-training text-xs bg-green-600 hover:bg-green-500 text-white px-3 py-1.5 rounded transition-colors flex items-center gap-1";
            btnElement.innerHTML = '<i class="fa-solid fa-check"></i> 確認';
        }
    } else {
        state.training.completed.push(dayId);
        cardElement.classList.remove('border-stone-600');
        cardElement.classList.add('border-green-500', 'bg-green-900/20');
        if (btnElement) {
            btnElement.className = "btn-confirm-training text-xs bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded transition-colors flex items-center gap-1";
            btnElement.innerHTML = '<i class="fa-solid fa-xmark"></i> 取消';
        }

        // Confetti effect (using global confetti lib)
        if (window.confetti) {
            confetti({
                particleCount: 30, spread: 50,
                origin: {
                    x: btnElement ? btnElement.getBoundingClientRect().left / window.innerWidth : 0.5,
                    y: btnElement ? btnElement.getBoundingClientRect().top / window.innerHeight : 0.5
                },
                colors: ['#22c55e', '#ffffff']
            });
        }
    }
    updateTrainingProgress();
    updateDailyTaskProgress();
}

function updateTrainingProgress() {
    const totalDays = 5;
    const completedCount = state.training.completed.length;
    const percent = Math.round((completedCount / totalDays) * 100);

    dom.trainingProgressBar.style.width = `${percent}%`;
    dom.trainingProgressText.textContent = `${percent}%`;

    if (percent === 100) dom.trainingProgressBar.classList.add('shadow-[0_0_15px_rgba(34,197,94,0.8)]');
    else dom.trainingProgressBar.classList.remove('shadow-[0_0_15px_rgba(34,197,94,0.8)]');
}

// --- Daily Tasks ---
export function updateDailyTaskProgress() {
    const totalCheckboxes = dom.taskCheckboxes.length;
    const trainingTaskWeight = 1;
    const total = totalCheckboxes + trainingTaskWeight;

    let checked = 0;
    dom.taskCheckboxes.forEach(cb => { if (cb.checked) checked++; });
    if (state.training.completed.length > 0) checked += trainingTaskWeight;

    const percent = total === 0 ? 0 : Math.round((checked / total) * 100);

    dom.dailyTaskBar.style.width = `${percent}%`;
    dom.dailyTaskPercent.textContent = `${percent}%`;

    if (percent === 100) dom.dailyTaskBar.classList.add('shadow-[0_0_10px_rgba(34,197,94,0.8)]');
    else dom.dailyTaskBar.classList.remove('shadow-[0_0_10px_rgba(34,197,94,0.8)]');
}

// --- Docs ---
const unitsData = [
    { name: "新北市政府民政局", phone: "02-29603456", fax: "02-29693894", addr: "新北市板橋區中山路1段161號11、14樓", url: "http://www.ca.ntpc.gov.tw/" },
    { name: "臺北市政府兵役局", phone: "02-23654361", fax: "02-23673072", addr: "臺北市中正區羅斯福路四段92號9樓", url: "http://www.tcdms.taipei.gov.tw/" },
    { name: "臺中市政府民政局", phone: "04-22289111", fax: "04-22202480", addr: "臺中市臺中港路2段89號6樓", url: "http://www.civil.taichung.gov.tw/" },
    { name: "臺南市政府民政局", phone: "06-2991111", fax: "06-2982560", addr: "臺南市安平區永華路2段6號", url: "http://www.tainan.gov.tw/agr/default.asp" },
    { name: "高雄市政府兵役局", phone: "07-3373582", fax: "07-3312241", addr: "高雄市苓雅區四維3路2號4樓", url: "http://mildp.kcg.gov.tw/index.php" }
    // Truncated for brevity but can add more
];

function initDocsTable() {
    let tableHtml = '<div class="overflow-x-auto"><table class="w-full text-left text-xs text-stone-300 border-collapse min-w-[500px]">';
    tableHtml += '<thead><tr class="bg-stone-800 text-stone-400 border-b border-stone-700"><th class="p-2">單位</th><th class="p-2">電話</th><th class="p-2">傳真</th><th class="p-2">地址</th><th class="p-2">網址</th></tr></thead><tbody>';

    unitsData.forEach(u => {
        tableHtml += `<tr class="border-b border-stone-800 hover:bg-stone-800/50">
            <td class="p-2 text-green-400 font-bold">${u.name}</td>
            <td class="p-2">${u.phone}</td>
            <td class="p-2 opacity-60 text-[10px] hidden md:table-cell">${u.fax}</td>
            <td class="p-2">${u.addr}</td>
            <td class="p-2"><a href="${u.url}" target="_blank" class="text-blue-400 hover:text-blue-300"><i class="fa-solid fa-link"></i></a></td>
        </tr>`;
    });
    tableHtml += '</tbody></table></div>';
    DOCS_DATA.units.content = tableHtml;
}
// Init the table logic
initDocsTable();

export function openDocsModal(type) {
    const data = DOCS_DATA[type];
    if (!data) return;

    dom.docsModalTitle.textContent = data.title;
    dom.docsModalContent.innerHTML = data.content;

    if (data.link) {
        dom.docsModalLink.href = data.link;
        dom.docsModalLink.classList.remove('hidden');
    } else {
        dom.docsModalLink.classList.add('hidden');
    }
    dom.modalDocs.classList.remove('hidden');
}

// --- Video ---
export function playVideo(data) {
    dom.playerTag.textContent = data.tag;
    dom.playerTag.className = `px-3 py-1 rounded text-sm mb-3 inline-block backdrop-blur-md text-white ${data.color}`;
    dom.playerTitle.textContent = data.title;
    dom.playerDesc.textContent = data.desc;

    dom.videoPlayer.classList.remove('hidden');
    dom.videoGallery.classList.add('hidden');
    dom.btnCloseVideo.classList.add('hidden');
}

export function closeVideo() {
    dom.videoPlayer.classList.add('hidden');
    dom.videoGallery.classList.remove('hidden');
    dom.btnCloseVideo.classList.remove('hidden');
}

// --- Calendar ---
export function renderCalendar() {
    if (!state.userData || !state.userData.date) return;

    const today = new Date();
    const targetDate = new Date(state.userData.date);
    const year = today.getFullYear();
    const month = today.getMonth();

    dom.calendarMonthYear.textContent = `${year} / ${(month + 1).toString().padStart(2, '0')}`;
    dom.calendarGrid.innerHTML = '';

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        dom.calendarGrid.appendChild(document.createElement('div'));
    }

    for (let d = 1; d <= daysInMonth; d++) {
        const div = document.createElement('div');
        div.textContent = d;
        div.className = 'calendar-day';
        if (d === today.getDate() && month === today.getMonth()) div.classList.add('bg-green-500', 'text-white', 'rounded-full', 'font-bold');
        if (d === targetDate.getDate() && month === targetDate.getMonth()) div.classList.add('bg-red-600', 'text-white', 'rounded-full', 'font-bold');
        dom.calendarGrid.appendChild(div);
    }
}

// --- Countdown ---
export function updateCountdown() {
    if (!state.userData || !state.userData.date) return;
    const today = new Date();
    // Reset time part for accurate date comparison
    today.setHours(0, 0, 0, 0);

    const enlistmentDate = new Date(state.userData.date);
    enlistmentDate.setHours(0, 0, 0, 0);

    let targetDate = enlistmentDate;
    let isDischargeCountdown = false;

    // Check if enlistment date has passed or is today
    if (today > enlistmentDate) {
        // Switch to Discharge Countdown
        isDischargeCountdown = true;
        // Calculate Discharge Date (Enlistment + 4 months)
        // Note: Actual service time might vary, assuming regular 4 months here
        const dischargeDate = new Date(enlistmentDate);
        dischargeDate.setMonth(dischargeDate.getMonth() + 4);
        targetDate = dischargeDate;
    }

    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Fake Countdown Override (Only applies if not in discharge mode and tempCountdown is active)
    const displayDays = (state.userData.tempCountdown && !isDischargeCountdown) ? 30 : Math.max(0, diffDays);

    dom.daysLeftCount.textContent = displayDays;

    if (isDischargeCountdown) {
        dom.countdownTitle.textContent = diffDays <= 0 ? "已退伍" : "離營倒數";
    } else {
        dom.countdownTitle.textContent = diffDays <= 0 && !state.userData.tempCountdown ? "入營日" : "距離入營";
    }

    // Chart Logic
    const maxDays = isDischargeCountdown ? 120 : 365; // 4 months for discharge, 1 year for enlistment prep
    let percentage = (displayDays / maxDays) * 100;
    percentage = Math.max(0, Math.min(100, percentage));

    const circumference = 283;
    const dashOffset = ((100 - percentage) / 100) * circumference;
    dom.countdownRing.style.strokeDashoffset = dashOffset;

    let colorClass = '';
    let glowClass = '';
    let strokeHex = '';

    if (displayDays <= 30) {
        strokeHex = '#ef4444';
        glowClass = 'glow-red';
    } else if (displayDays <= 90) {
        strokeHex = '#f97316';
        glowClass = 'glow-orange';
    } else {
        strokeHex = '#22c55e';
        glowClass = 'glow-green';
    }

    dom.countdownRing.setAttribute('stroke', strokeHex);
}

// --- Date Input Helper (Ported from auth.js) ---
export function setupDateInputs() {
    const inputs = document.querySelectorAll('.date-input');
    const pickers = document.querySelectorAll('.hidden-picker');

    // Sync Picker -> Inputs
    pickers.forEach(picker => {
        // Remove old listeners to prevent duplicates if called multiple times
        // actually standard addEventListener adds multiples, but we only call init once usually.
        // For safety/simplicity in this context, just add.
        picker.onchange = (e) => {
            if (!e.target.value) return;
            // e.target.value is YYYY-MM-DD
            const [y, m, d] = e.target.value.split('-');

            // Derive ID prefix from picker ID (picker-input-date -> input-date)
            const prefix = e.target.id.replace('picker-', '');

            const elY = document.getElementById(`${prefix}-y`);
            const elM = document.getElementById(`${prefix}-m`);
            const elD = document.getElementById(`${prefix}-d`);

            if (elY) elY.value = y;
            if (elM) elM.value = m;
            if (elD) elD.value = d;
        };
    });

    inputs.forEach(input => {
        // clear old to be safe if possible, or just overwrite via onprop

        // 1. Input Event: Restrict numbers & Auto-jump
        input.oninput = (e) => {
            // Remove non-numeric characters
            e.target.value = e.target.value.replace(/[^0-9]/g, '');

            const maxLength = parseInt(e.target.getAttribute('maxlength'));
            const nextId = e.target.getAttribute('data-next');

            if (e.target.value.length >= maxLength) {
                if (nextId) document.getElementById(nextId).focus();
            }
        };

        // 2. Keydown Event: Backspace navigation
        input.onkeydown = (e) => {
            if (e.key === 'Backspace' && e.target.value.length === 0) {
                const prevId = e.target.getAttribute('data-prev');
                if (prevId) document.getElementById(prevId).focus();
            }
        };

        // 3. Blur Event: Simple Range Validation
        input.onblur = (e) => {
            const val = parseInt(e.target.value);
            if (isNaN(val)) return;

            if (e.target.id.endsWith('-m')) {
                if (val < 1) e.target.value = '01';
                if (val > 12) e.target.value = '12';
                e.target.value = e.target.value.padStart(2, '0');
            }
            if (e.target.id.endsWith('-d')) {
                if (val < 1) e.target.value = '01';
                if (val > 31) e.target.value = '31';
                e.target.value = e.target.value.padStart(2, '0');
            }
        };
    });
}

export function startCountdownTimer() {
    setInterval(updateCountdown, 1000 * 60 * 60);
    setTimeout(updateCountdown, 100);
}

export async function renderCohortChart() {
    const data = await api.getCohortStats();
    if (!data) return;

    const chartEl = document.getElementById('cohort-chart');
    const legendEl = document.getElementById('cohort-legend-container');
    const titleEl = document.getElementById('cohort-title');

    if (!chartEl || !legendEl || !titleEl) return;

    titleEl.textContent = `${data.year}人員分析`;

    const colors = {
        "大學專科": "bg-blue-500",
        "高中職": "bg-emerald-500",
        "國中": "bg-amber-500",
        "其他": "bg-stone-500"
    };

    const colorHex = {
        "大學專科": "#3b82f6",
        "高中職": "#10b981",
        "國中": "#f59e0b",
        "其他": "#78716c"
    };

    let conicParts = [];
    let currentDegree = 0;
    legendEl.innerHTML = '';

    for (const [key, value] of Object.entries(data.data)) {
        const percentage = Math.round((value / data.total) * 100);
        const percentRaw = (value / data.total) * 100;

        if (percentage > 0) {
            conicParts.push(`${colorHex[key]} ${currentDegree}% ${currentDegree + percentRaw}%`);
            currentDegree += percentRaw;

            legendEl.innerHTML += `
                <div class="flex items-center justify-between text-sm">
                    <div class="flex items-center gap-2">
                        <span class="w-3 h-3 rounded-full ${colors[key]}"></span>
                        <span class="text-stone-300">${key}</span>
                    </div>
                    <span class="font-tech text-stone-500">${percentage}%</span>
                </div>
            `;
        }
    }

    chartEl.style.background = `conic-gradient(${conicParts.join(', ')})`;
}

// --- Hospital GPS Logic ---
const HOSPITALS_DATA = [
  { name: "臺北市立聯合醫院仁愛院區", lat: 25.0378, lng: 121.5438 },
  { name: "臺北市立聯合醫院和平婦幼院區", lat: 25.0347, lng: 121.5054 },
  { name: "臺北市立聯合醫院忠孝院區", lat: 25.0484, lng: 121.5835 },
  { name: "臺北市立聯合醫院中興院區", lat: 25.0503, lng: 121.5094 },
  { name: "臺北市立聯合醫院陽明院區", lat: 25.1027, lng: 121.5317 },
  { name: "臺北市立萬芳醫院", lat: 25.0001, lng: 121.5583 },
  { name: "三軍總醫院松山分院", lat: 25.0583, lng: 121.5592 },
  { name: "臺大醫院", lat: 25.0416, lng: 121.5174 },
  { name: "臺北榮民總醫院", lat: 25.1203, lng: 121.5202 },
  { name: "三軍總醫院", lat: 25.0685, lng: 121.5908 },
  { name: "高雄市立民生醫院", lat: 22.6267, lng: 120.3236 },
  { name: "高雄市立聯合醫院", lat: 22.6565, lng: 120.2863 },
  { name: "國軍高雄總醫院", lat: 22.6260, lng: 120.3398 },
  { name: "國軍高雄總醫院左營分院", lat: 22.6934, lng: 120.2946 },
  { name: "國立陽明交通大學附設醫院", lat: 24.7523, lng: 121.7588 },
  { name: "臺北榮民總醫院員山分院", lat: 24.7431, lng: 121.7169 },
  { name: "衛生福利部基隆醫院", lat: 25.1287, lng: 121.7456 },
  { name: "衛生福利部臺北醫院", lat: 25.0427, lng: 121.4623 },
  { name: "新北市立聯合醫院", lat: 25.0632, lng: 121.4878 },
  { name: "衛生福利部桃園醫院", lat: 24.9784, lng: 121.2678 },
  { name: "國軍桃園總醫院", lat: 24.8624, lng: 121.2407 },
  { name: "臺北榮民總醫院桃園分院", lat: 25.0041, lng: 121.3275 },
  { name: "臺大醫院新竹分院", lat: 24.8157, lng: 120.9774 },
  { name: "臺大醫院竹東分院", lat: 24.7001, lng: 121.0963 },
  { name: "臺北榮民總醫院新竹分院", lat: 24.7088, lng: 121.0991 },
  { name: "衛生福利部苗栗醫院", lat: 24.5772, lng: 120.8329 },
  { name: "衛生福利部豐原醫院", lat: 24.2404, lng: 120.7247 },
  { name: "衛生福利部臺中醫院", lat: 24.1396, lng: 120.6781 },
  { name: "國軍臺中總醫院", lat: 24.1481, lng: 120.7354 },
  { name: "衛生福利部南投醫院", lat: 23.9135, lng: 120.6865 },
  { name: "臺中榮民總醫院埔里分院", lat: 23.9744, lng: 120.9839 },
  { name: "衛生福利部彰化醫院", lat: 23.9619, lng: 120.5511 },
  { name: "臺大醫院雲林分院", lat: 23.7144, lng: 120.5441 },
  { name: "衛生福利部嘉義醫院", lat: 23.4819, lng: 120.4286 },
  { name: "臺中榮民總醫院嘉義分院", lat: 23.4795, lng: 120.4187 },
  { name: "衛生福利部朴子醫院", lat: 23.4619, lng: 120.2478 },
  { name: "衛生福利部臺南醫院", lat: 22.9954, lng: 120.2075 },
  { name: "衛生福利部新營醫院", lat: 23.3086, lng: 120.3164 },
  { name: "高雄榮民總醫院臺南分院", lat: 23.0039, lng: 120.2447 },
  { name: "衛生福利部旗山醫院", lat: 22.8906, lng: 120.4772 },
  { name: "衛生福利部屏東醫院", lat: 22.6744, lng: 120.4958 },
  { name: "高雄榮民總醫院屏東分院", lat: 22.6175, lng: 120.5484 },
  { name: "衛生福利部臺東醫院", lat: 22.7539, lng: 121.1506 },
  { name: "衛生福利部花蓮醫院", lat: 23.9778, lng: 121.6136 },
  { name: "國軍花蓮總醫院", lat: 24.0101, lng: 121.6178 },
  { name: "臺北榮民總醫院玉里分院", lat: 23.3444, lng: 121.3197 },
  { name: "三軍總醫院澎湖分院附設民眾診療服務處", lat: 23.5623, lng: 119.5794 },
  { name: "衛生福利部澎湖醫院", lat: 23.5656, lng: 119.5647 },
  { name: "衛生福利部金門醫院", lat: 24.4398, lng: 118.4165 },
  { name: "連江縣立醫院", lat: 26.1587, lng: 119.9389 },
  { name: "臺中榮民總醫院", lat: 24.1818, lng: 120.6052 },
  { name: "成大醫院", lat: 23.0017, lng: 120.2223 },
  { name: "高雄榮民總醫院", lat: 22.6781, lng: 120.3231 },
  { name: "慈濟綜合醫院", lat: 23.9928, lng: 121.6001 }
];

function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

function updateHospitalContainer(html) {
    const containers = document.querySelectorAll('#hospital-gps-auto-trigger');
    if (containers.length > 0) {
        const target = containers[containers.length - 1];
        target.innerHTML = html;
        target.removeAttribute('id'); // Remove id to prevent modifying it again
        target.className = "mt-4 space-y-2"; // Apply clean styling
        // Scroll to bottom so buttons are visible
        dom.chatMessages.scrollTop = dom.chatMessages.scrollHeight;
    }
}

function autoTriggerHospitalGPS() {
    if (!navigator.geolocation) {
        updateHospitalContainer('<div class="text-sm text-red-400"><i class="fa-solid fa-triangle-exclamation"></i> 您的瀏覽器不支援 GPS 功能，無法尋找最近醫院。</div>');
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;

            const withDist = HOSPITALS_DATA.map(h => ({
                ...h,
                dist: getDistance(userLat, userLng, h.lat, h.lng)
            }));
            
            withDist.sort((a, b) => a.dist - b.dist);
            const top3 = withDist.slice(0, 3);
            
            let html = '<div class="text-sm font-bold text-stone-300 mb-2 mt-2"><i class="fa-solid fa-location-dot text-green-500"></i> 離您最近的 3 間體檢醫院：</div>';
            html += '<div class="flex flex-col gap-2">';
            top3.forEach(h => {
                const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.name)}`;
                html += `
                <a href="${mapLink}" target="_blank" class="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors text-sm shadow-md inline-flex items-center gap-2 border border-blue-600">
                    <i class="fa-solid fa-map-location-dot"></i> ${h.name} (${h.dist.toFixed(1)} km)
                </a>`;
            });
            html += '</div>';
            updateHospitalContainer(html);
        },
        (error) => {
            updateHospitalContainer('<div class="text-sm text-red-400"><i class="fa-solid fa-triangle-exclamation"></i> 無法取得您的 GPS 位置。請確認是否已允許位置存取權限。</div>');
        },
        { timeout: 10000 }
    );
}
