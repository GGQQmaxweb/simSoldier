export function initDelay() {
    const delayHTML = `
        <div class="bg-stone-900 rounded-lg shadow-lg border border-stone-800 p-8 max-w-4xl mx-auto space-y-8 overflow-y-auto max-h-full">
            <div class="text-center border-b border-stone-700 pb-6">
                <i class="fa-solid fa-calendar-minus text-5xl text-blue-500 mb-4 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"></i>
                <h2 class="text-3xl font-bold text-white tracking-widest mb-2">延緩入營申請須知</h2>
                <p class="text-stone-400">115年應接受常備兵役軍事訓練役男 (83年次至93年次)</p>
            </div>

            <div class="space-y-8 text-stone-300 leading-relaxed">
                <!-- 一、申請對象 -->
                <section>
                    <h3 class="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2 border-l-4 border-blue-500 pl-3">
                        一、申請對象
                    </h3>
                    <ul class="list-disc pl-6 space-y-3 text-stone-300">
                        <li>83年次至93年次尚未列入梯次徵集對象之役男，應接受115年常備兵役軍事訓練，因生涯規劃，有延緩入營意願者。</li>
                        <li>
                            <span class="text-red-400 font-bold"><i class="fa-solid fa-circle-exclamation"></i> 限制條件：</span>具下列條件之一者，不得申請延緩入營；仍提出申請者，應不予核准：
                            <ol class="list-decimal pl-6 mt-2 space-y-1 text-stone-400">
                                <li>已列入梯次徵集對象者。</li>
                                <li>具相同等級學歷（含休、退學）曾核准延緩入營者。但於就讀相同等級學歷期間，因就學、延畢或暑修等原因，曾申請延緩入營者，不在此限。</li>
                            </ol>
                        </li>
                    </ul>
                </section>

                <!-- 二、申請作業 -->
                <section>
                    <h3 class="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2 border-l-4 border-blue-500 pl-3">
                        二、申請作業 (網路申請)
                    </h3>
                    <div class="bg-stone-800 p-5 rounded-lg border border-stone-700 mb-6 flex items-start gap-4">
                        <i class="fa-solid fa-globe text-3xl text-stone-500 mt-1"></i>
                        <div>
                            <p class="mb-2">
                                統一採取網路申請。請至內政部役政司全球資訊網 
                                <a href="https://dca.moi.gov.tw/" target="_blank" class="text-green-500 hover:text-green-400 underline font-bold">役男入營時程申請系統</a>
                                或由各縣市政府網站進入，完成申請並取得序號。由戶籍地公所審核。
                            </p>
                        </div>
                    </div>
                    <div class="grid md:grid-cols-2 gap-4">
                        <div class="bg-stone-800/50 p-5 rounded-lg border border-stone-700">
                            <h4 class="font-bold text-green-400 mb-3 flex items-center gap-2"><i class="fa-regular fa-calendar-check"></i> 申請期間</h4>
                            <ul class="text-sm space-y-4">
                                <li class="border-b border-stone-700 pb-2">
                                    <span class="text-stone-300 font-bold block mb-1">陸軍</span>
                                    <span class="font-tech text-stone-400">115/7/1 10:00 - 115/11/30 17:00</span>
                                </li>
                                <li>
                                    <span class="text-stone-300 font-bold block mb-1">海軍/海陸/空軍</span>
                                    <span class="font-tech text-stone-400">115/7/1 10:00 - 115/10/30 17:00</span>
                                </li>
                            </ul>
                        </div>
                        <div class="bg-stone-800/50 p-5 rounded-lg border border-stone-700">
                            <h4 class="font-bold text-red-400 mb-3 flex items-center gap-2"><i class="fa-solid fa-ban"></i> 放棄期間</h4>
                            <ul class="text-sm space-y-4">
                                <li class="border-b border-stone-700 pb-2">
                                    <span class="text-stone-300 font-bold block mb-1">陸軍</span>
                                    <span class="font-tech text-stone-400">115/7/1 10:00 - 115/11/30 17:00</span>
                                </li>
                                <li>
                                    <span class="text-stone-300 font-bold block mb-1">海軍/海陸/空軍</span>
                                    <span class="font-tech text-stone-400">115/7/1 10:00 - 115/10/30 17:00</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <!-- 三、預估入營期間 -->
                <section>
                    <h3 class="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2 border-l-4 border-blue-500 pl-3">
                        三、預估入營期間
                    </h3>
                    <p class="text-sm text-stone-400 mb-4 bg-stone-800/50 p-4 rounded-lg border border-stone-700">
                        <i class="fa-solid fa-circle-info text-blue-400 mr-1"></i>
                        115年預估入營月份依歷年徵集狀況推估，僅供參酌。徵集令最晚於入營10日前由戶籍地公所送達。
                    </p>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div class="px-4 py-3 bg-stone-800 border-t-2 border-green-600 rounded text-center">
                            <div class="text-xs text-stone-400 mb-1">陸軍</div>
                            <div class="font-bold text-green-400 text-sm">116年1月以後</div>
                        </div>
                        <div class="px-4 py-3 bg-stone-800 border-t-2 border-blue-500 rounded text-center">
                            <div class="text-xs text-stone-400 mb-1">海軍艦艇兵</div>
                            <div class="font-bold text-blue-400 text-sm">115年11月以後</div>
                        </div>
                        <div class="px-4 py-3 bg-stone-800 border-t-2 border-red-600 rounded text-center">
                            <div class="text-xs text-stone-400 mb-1">海軍陸戰隊</div>
                            <div class="font-bold text-red-400 text-sm">115年11月以後</div>
                        </div>
                        <div class="px-4 py-3 bg-stone-800 border-t-2 border-sky-500 rounded text-center">
                            <div class="text-xs text-stone-400 mb-1">空軍</div>
                            <div class="font-bold text-sky-400 text-sm">115年11月以後</div>
                        </div>
                    </div>
                </section>

                <!-- 四、役男入營順序 -->
                <section>
                    <h3 class="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2 border-l-4 border-blue-500 pl-3">
                        四、役男入營順序
                    </h3>
                    <div class="flex items-center gap-4 text-center overflow-hidden bg-stone-800 rounded-lg border border-stone-700">
                        <div class="flex-1 p-3"><span class="block text-xs text-stone-400 mb-1">優先級 1</span><strong class="text-white">出生年次</strong></div>
                        <i class="fa-solid fa-angle-right text-stone-600"></i>
                        <div class="flex-1 p-3"><span class="block text-xs text-stone-400 mb-1">優先級 2</span><strong class="text-white">抽籤日期</strong></div>
                        <i class="fa-solid fa-angle-right text-stone-600"></i>
                        <div class="flex-1 p-3"><span class="block text-xs text-stone-400 mb-1">優先級 3</span><strong class="text-white">軍種兵科</strong></div>
                    </div>
                </section>

                <!-- 五、注意事項 -->
                <section>
                    <h3 class="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2 border-l-4 border-blue-500 pl-3">
                        五、注意事項
                    </h3>
                    <ul class="list-decimal pl-6 space-y-4 text-stone-300">
                        <li>役男申請延緩入營後欲放棄者，應於放棄受理期限內至系統填寫放棄申請書，完成作業後不得再申請延緩入營，<strong class="text-red-400 font-bold border-b border-red-500/50 pb-0.5">逾放棄期限不可放棄</strong>。</li>
                        <li>已列入梯次徵集對象者，不可放棄延緩入營；如無法依指定時間入營，應依規定向公所申辦延期徵集。</li>
                        <li>延畢或115年9月繼續升學之役男，<strong class="text-green-400">無須申請延緩入營</strong>。請於開學後依學校規定辦理註冊，由就讀學校報送緩徵即可。</li>
                    </ul>
                </section>
                
                <!-- 六、徵兵處理流程 -->
                <section>
                    <h3 class="text-xl font-bold text-blue-400 mb-8 flex items-center gap-2 border-l-4 border-blue-500 pl-3">
                        六、徵兵處理流程
                    </h3>
                    <div class="relative flex flex-col md:flex-row items-center justify-between w-full max-w-3xl mx-auto py-4">
                        <!-- Connecting Line (Desktop) -->
                        <div class="hidden md:block absolute top-10 left-10 right-10 h-1 bg-stone-700 z-0"></div>
                        <!-- Connecting Line (Mobile) -->
                        <div class="md:hidden absolute left-1/2 top-4 bottom-4 w-1 bg-stone-700 -translate-x-1/2 z-0"></div>

                        <!-- Step 1 -->
                        <div class="relative z-10 flex flex-col items-center group mb-12 md:mb-0">
                            <div class="w-20 h-20 rounded-full bg-stone-900 border-4 border-stone-700 flex items-center justify-center text-stone-500 group-hover:border-blue-500 group-hover:text-blue-400 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] group-hover:scale-110">
                                <i class="fa-solid fa-clipboard-user text-3xl"></i>
                            </div>
                            <div class="mt-4 text-center bg-stone-900/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-stone-800 group-hover:border-blue-500/30 transition-colors">
                                <h4 class="font-bold text-white mb-1">兵籍調查</h4>
                                <p class="text-xs text-stone-400">建立個人資料</p>
                            </div>
                        </div>

                        <!-- Step 2 -->
                        <div class="relative z-10 flex flex-col items-center group mb-12 md:mb-0">
                            <div class="w-20 h-20 rounded-full bg-stone-900 border-4 border-stone-700 flex items-center justify-center text-stone-500 group-hover:border-green-500 group-hover:text-green-400 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] group-hover:scale-110">
                                <i class="fa-solid fa-stethoscope text-3xl"></i>
                            </div>
                            <div class="mt-4 text-center bg-stone-900/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-stone-800 group-hover:border-green-500/30 transition-colors">
                                <h4 class="font-bold text-white mb-1">徵兵檢查</h4>
                                <p class="text-xs text-stone-400">判定體位等級</p>
                            </div>
                        </div>

                        <!-- Step 3 -->
                        <div class="relative z-10 flex flex-col items-center group mb-12 md:mb-0">
                            <div class="w-20 h-20 rounded-full bg-stone-900 border-4 border-stone-700 flex items-center justify-center text-stone-500 group-hover:border-yellow-500 group-hover:text-yellow-400 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] group-hover:scale-110">
                                <i class="fa-solid fa-box-open text-3xl"></i>
                            </div>
                            <div class="mt-4 text-center bg-stone-900/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-stone-800 group-hover:border-yellow-500/30 transition-colors">
                                <h4 class="font-bold text-white mb-1">抽籤</h4>
                                <p class="text-xs text-stone-400">決定軍種兵科</p>
                            </div>
                        </div>

                        <!-- Step 4 -->
                        <div class="relative z-10 flex flex-col items-center group">
                            <div class="w-20 h-20 rounded-full bg-stone-900 border-4 border-stone-700 flex items-center justify-center text-stone-500 group-hover:border-red-500 group-hover:text-red-400 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] group-hover:scale-110">
                                <i class="fa-solid fa-person-military-rifle text-3xl"></i>
                            </div>
                            <div class="mt-4 text-center bg-stone-900/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-stone-800 group-hover:border-red-500/30 transition-colors">
                                <h4 class="font-bold text-white mb-1">徵集入營</h4>
                                <p class="text-xs text-stone-400">依序安排入營</p>
                            </div>
                        </div>
                    </div>
                    <div class="mt-6 p-4 bg-stone-800/60 border border-stone-700 rounded-lg text-sm text-stone-300 flex items-start gap-3">
                        <i class="fa-solid fa-circle-info text-blue-400 mt-1"></i>
                        <p>役男入營前需完成前 3 項作業（兵籍調查、徵兵檢查、抽籤），完成後始依序徵集作業。</p>
                        <a href="#" id="btn-delay-flow" class="text-green-500 hover:text-green-400 underline font-bold cursor-pointer whitespace-nowrap">延役流程圖</a>
                    </div>
                </section>
            </div>
            
            <div class="mt-8 text-center text-sm text-stone-500 border-t border-stone-800 pt-6">
                以上申辦事項，如仍有疑義，請向鄉(鎮、巿、區)公所或直轄巿、縣(巿)政府兵役單位洽詢。<br>
                (聯絡資料請於「役男入營時程申請系統」查詢)
            </div>
        </div>

        <!-- Image Modal for 延役流程圖 -->
        <div id="modal-delay-image" class="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm hidden opacity-0 transition-opacity duration-300">
            <div class="relative max-w-5xl w-full flex flex-col items-center">
                <button id="btn-close-delay-image" class="absolute -top-12 right-0 md:-right-8 text-stone-400 hover:text-white transition-colors text-3xl focus:outline-none">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <img src="docs/延役流程.png" alt="延役流程圖" class="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain border border-stone-700">
            </div>
        </div>
    `;

    const container = document.getElementById('view-delay');
    if (container) {
        container.innerHTML = delayHTML;

        // Image Modal Logic
        const btnDelayFlow = document.getElementById('btn-delay-flow');
        const modalDelayImage = document.getElementById('modal-delay-image');
        const btnCloseDelayImage = document.getElementById('btn-close-delay-image');

        if (btnDelayFlow && modalDelayImage && btnCloseDelayImage) {
            btnDelayFlow.addEventListener('click', (e) => {
                e.preventDefault();
                modalDelayImage.classList.remove('hidden');
                // Trigger reflow for transition
                void modalDelayImage.offsetWidth;
                modalDelayImage.classList.remove('opacity-0');
            });

            const closeModal = () => {
                modalDelayImage.classList.add('opacity-0');
                setTimeout(() => {
                    modalDelayImage.classList.add('hidden');
                }, 300);
            };

            btnCloseDelayImage.addEventListener('click', closeModal);
            modalDelayImage.addEventListener('click', (e) => {
                if (e.target === modalDelayImage) {
                    closeModal();
                }
            });
        }
    }
}
