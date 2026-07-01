const mapLocations = {
    "成功嶺 (104旅/302旅)": { lat: 24.118949, lng: 120.605335 },
    "金六結 (153旅)": { lat: 24.743118, lng: 121.733519 },
    "斗煥坪 (206旅)": { lat: 24.673898, lng: 120.941916 },
    "關西營區 (206旅)": { lat: 24.801648, lng: 121.173256 },
    "官田營區 (203旅)": { lat: 23.195035, lng: 120.316921 },
    "中坑營區 (257旅)": { lat: 23.593635, lng: 120.485141 },
    "屏東龍泉 (海陸)": { lat: 22.656517, lng: 120.591038 },
    "凌雲崗營區 (第6軍團步兵營)": { lat: 24.86451, lng: 121.21054 },
    "太平里營區 (109旅)": { lat: 24.8966, lng: 121.1353 },
    "龍華營區 (109旅)": { lat: 24.9048, lng: 121.2858 },
    "犁頭山營區 (206旅)": { lat: 24.8197, lng: 121.0375 },
    "成功嶺營區 (101旅)": { lat: 24.1141, lng: 120.6133 },
    "北埔營區 (花防部步兵營)": { lat: 24.0242, lng: 121.6072 },
    "左營營區 (海軍新訓中心)": { lat: 22.7056, lng: 120.2882 }
};

let leafletMap = null;
let markers = {};

function initMap() {
    // 預設中心點 (台灣中心)
    leafletMap = L.map('map').setView([23.973875, 120.982024], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(leafletMap);

    // 加入 Markers
    Object.keys(mapLocations).forEach(key => {
        const loc = mapLocations[key];
        const marker = L.marker([loc.lat, loc.lng]).addTo(leafletMap)
            .bindPopup(`<b>${key}</b>`);
        markers[key] = marker;
    });

    // 綁定左側清單的點擊事件
    const locationCards = document.querySelectorAll('#view-locations .group');
    locationCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h4').innerText.trim();
            if (mapLocations[title]) {
                const loc = mapLocations[title];
                leafletMap.flyTo([loc.lat, loc.lng], 14, {
                    animate: true,
                    duration: 1.5
                });
                markers[title].openPopup();
            }
        });
    });
}

// 由於地圖容器預設是 display: none，當切換到該 tab 時需要重新計算大小
document.addEventListener('DOMContentLoaded', () => {
    initMap();

    const targetNode = document.getElementById('view-locations');
    const observerOptions = {
        attributes: true,
        attributeFilter: ['class']
    };

    const observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (!targetNode.classList.contains('hidden')) {
                    // 當地圖顯示時，呼叫 invalidateSize 確保地圖正確渲染
                    setTimeout(() => {
                        if (leafletMap) {
                            leafletMap.invalidateSize();
                        }
                    }, 100);
                }
            }
        }
    });

    if (targetNode) {
        observer.observe(targetNode, observerOptions);
    }

    window.selectLocation = function (name) {
        if (window.switchTab) {
            window.switchTab('locations');
        }

        // Find the card and click it
        const cards = document.querySelectorAll('#view-locations .group');
        for (let card of cards) {
            const titleElement = card.querySelector('h4');
            if (!titleElement) continue;
            const title = titleElement.innerText.trim();
            if (title.includes(name) || name.includes(title)) {
                const header = card.querySelector('.cursor-pointer');
                if (header) {
                    header.click();
                } else {
                    card.click();
                }
                break;
            }
        }
    };
});
