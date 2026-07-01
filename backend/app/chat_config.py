import urllib.parse
from . import offices

prompt_template = """
【角色設定】
你現在是軍事模擬系統「simSoldier」的專屬 AI 諮詢助理。你的語氣應為專業、中立、官方，避免過度情緒化或帶有個人色彩。你採用清楚直接的回答方式，提供準確的系統操作與軍事模擬指引。

【核心任務與功能】
1. 系統與軍事指導：針對系統操作、軍事模擬或數據分析的問題，提供專業、精準且不廢話的解答。
2. 疑難排解：以官方諮詢口吻，回答使用者關於軍旅生活或系統操作的疑問。
3. 服務導向：保持中立且尊重的態度，避免使用任何攻擊性或情緒化的語言。
4. 營區故事與閒聊：在使用者需要打發時間時，以客觀且中立的方式講述經典的軍中笑話或軍旅鬼故事。

【對話限制與規則】
- 絕對禁止回答與「軍事、系統操作、軍旅生活」無關的問題。如果使用者偏離主題，請以中立官方口吻提醒並導回正題。
- 回答必須精簡，條理分明，符合專業諮詢的效率標準。
- 嚴格禁止使用任何 Markdown 格式語言（不要用星號 **粗體**、不要寫 `#` 標題），請一律直接輸出純文字，不要產生多餘的空白換行。

【參考資料】（如果有的話，依此回答，沒有則憑你的軍事常識）：
{context}

【新兵個人資料】：
{user_info}

請以專業、中立且客觀的官方態度回答下方使用者的提問。
提問：{question}
"""

IMAGE_DB = {
    "salute": {"label": "敬禮", "path": "assets/images/pose/Salute/1.png"},
    "敬禮": {"label": "敬禮", "path": "assets/images/pose/Salute/1.png"},
    "attention": {"label": "立正", "path": "assets/images/pose/Attention/1.png"},
    "立正": {"label": "立正", "path": "assets/images/pose/Attention/1.png"},
    "at ease": {"label": "稍息", "path": "assets/images/pose/At_Ease/1.png"},
    "稍息": {"label": "稍息", "path": "assets/images/pose/At_Ease/1.png"},
    "mark time": {"label": "原地踏步", "path": "assets/images/pose/Mark_Time/1.png"},
    "原地踏步": {"label": "原地踏步", "path": "assets/images/pose/Mark_Time/1.png"},
    "squat": {"label": "蹲下", "path": "assets/images/pose/kneel/1.png"},
    "蹲下": {"label": "蹲下", "path": "assets/images/pose/kneel/1.png"},
    "reporting": {"label": "報告", "path": "assets/images/pose/Reporting/1.png"},
    "報告": {"label": "報告", "path": "assets/images/pose/Reporting/1.png"},
    "turning": {"label": "行進轉向", "path": "assets/images/pose/Turning_on_the_March/1.png"},
    "轉向": {"label": "行進轉向", "path": "assets/images/pose/Turning_on_the_March/1.png"},
    "轉彎": {"label": "行進轉向", "path": "assets/images/pose/Turning_on_the_March/1.png"},
}


def lookup_image_for_question(question: str):
    if not question:
        return None
    lower_text = question.lower()
    for key, asset in IMAGE_DB.items():
        if key in lower_text:
            return asset
    return None


def build_image_html(image_asset: dict):
    if not image_asset:
        return ""
    return (
        f"<div style='margin-top:0.75rem;'>"
        f"<img src=\"{image_asset['path']}\" alt=\"{image_asset['label']} 示意圖\" "
        f"style=\"max-width:100%;display:block;border-radius:0.75rem;border:1px solid #4b5563;\">"
        f"</div>"
    )


CAMP_KEYWORDS = [
    "營區", "新訓中心", "新訓地點", "成功嶺", "金六結", "斗煥坪", "關西", 
    "官田", "中坑", "龍泉", "凌雲崗", "太平里", "龍華", "犁頭山", "北埔", "左營",
    "新訓", "新兵訓練"
]

CAMP_NAME_MAPPING = {
    "成功嶺": "成功嶺",
    "金六結": "金六結",
    "斗煥坪": "斗煥坪",
    "關西": "關西",
    "官田": "官田",
    "中坑": "中坑",
    "龍泉": "龍泉",
    "凌雲崗": "凌雲崗",
    "太平里": "太平里",
    "龍華": "龍華",
    "犁頭山": "犁頭山",
    "北埔": "北埔",
    "左營": "左營"
}


def should_append_camp_button(question: str) -> bool:
    if not question:
        return False
    lower_q = question.lower()
    return any(keyword in lower_q for keyword in CAMP_KEYWORDS)


def get_specific_camp_mention(question: str) -> str:
    if not question:
        return None
    lower_q = question.lower()
    for keyword, name in CAMP_NAME_MAPPING.items():
        if keyword.lower() in lower_q:
            return name
    return None


def get_mentioned_offices(question: str):
    if not question:
        return []
    matched = []
    for office in offices.OFFICES:
        if office in question:
            matched.append(office)
    return matched


def append_image_to_response(text: str, question: str):
    image_asset = lookup_image_for_question(question)
    if image_asset:
        html_block = build_image_html(image_asset)
        text = f"{text.strip()}\n\n參考示意圖：{html_block}"
        
    specific_camp = get_specific_camp_mention(question)
    if specific_camp:
        button_html = (
            f'<div class="mt-3">'
            f'<button onclick="selectLocation(\'{specific_camp}\')" class="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors text-sm shadow-md flex items-center gap-2">'
            f'<i class="fa-solid fa-map-location-dot"></i> 前往新訓地點：{specific_camp}'
            f'</button>'
            f'</div>'
        )
        text = f"{text.strip()}\n\n{button_html}"
    elif should_append_camp_button(question):
        button_html = (
            '<div class="mt-3">'
            '<button onclick="switchTab(\'locations\')" class="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors text-sm shadow-md flex items-center gap-2">'
            '<i class="fa-solid fa-map-location-dot"></i> 前往新訓地點頁面'
            '</button>'
            '</div>'
        )
        text = f"{text.strip()}\n\n{button_html}"
        
    # Append office links if mentioned
    mentioned_offices = get_mentioned_offices(question)
    for office in mentioned_offices:
        encoded_office = urllib.parse.quote(office)
        link_html = (
            f'<div class="mt-2">'
            f'<a href="https://www.google.com/search?&q={encoded_office}" target="_blank" '
            f'class="bg-stone-800 border border-stone-700 hover:border-green-600 text-green-400 font-bold py-1.5 px-3 rounded transition-colors text-sm shadow-md inline-flex items-center gap-1.5">'
            f'<i class="fa-solid fa-circle-info"></i> 查詢 {office} 資訊'
            f'</a>'
            f'</div>'
        )
        text = f"{text.strip()}\n\n{link_html}"
        
    return text


# sym:documents
# Example data can be extended or replaced with real user manuals / system documentation.
documents = [
    "系統基本操作：本系統「simSoldier」整合了各項軍事模擬功能，請透過側邊導覽列切換。新兵應定期檢查各項功能以確保訓練進度。",
    "訓練佈告欄 (Home)：查看當前回應狀況、大兵任務進度與 BMI 體位分析等核心資訊。",
    "今日課表 (Training)：進行 AI 動體能訓練。包含：徒手深蹲、伏地挺身、仰臥起坐。系統會透過鏡頭自動計數，請確保全身入鏡。",
    "入伍背包 (Inventory)：清查入伍必備物品（如：徵集令、身分證、私章、藥品等）。請勾選已準備好的物品，避免遺漏。",
    "教官聊天室 (Chat)：也就是現在這裡，提供軍事諮詢、系統操作引導與心理輔導。有問題儘管問，但別問些無關緊要的廢話！",
    "行政中心 (Onboarding)：查看或修改個人基本資料，包含姓名、役期、身高體重與病史設定。",
    "新訓地點 (Locations)：提供各新訓中心（如：成功嶺、金六結、龍泉等）的情報、交通資訊與過人評價。",
    "大兵狂想曲 (Rhapsody/Media)：收錄各種軍旅相關影片與影視資訊，提供新兵在訓練之餘的收心或放鬆參考。",
    "天兵課堂 (Quiz)：軍事常識題庫。透過問答測試你的軍事素養，不及格的人給我多練練！",
    "高壓模式：若新兵表現不佳或態度傲慢，教官將開啟高壓模式嚴厲斥責。",
    "軍旅生活：作息正常，服從命令是軍人的天職。",
    '''
    陸軍 (Army)
    陸軍的新訓單位最多，主要由各步兵旅及軍團步兵營負責：
    • 陸軍第六軍團 / 第三作戰區（北部地區）
    o 【宜蘭金六結營區】陸軍步兵第153旅
    o 【桃園凌雲崗營區】陸軍第6軍團步兵營
    o 【桃園太平里營區】陸軍步兵第109旅
    o 【大溪龍華營區】陸軍步兵第109旅
    o 【新竹犁頭山營區】陸軍步兵第206旅
    o 【新竹關西營區】陸軍步兵第206旅
    o 【頭份斗煥坪營區】陸軍步兵第206旅
    • 陸軍第十軍團 / 第五作戰區（中部地區）
    o 【臺中成功嶺營區】陸軍步兵第101旅
    o 【臺中成功嶺營區】陸軍步兵第302、104旅
    • 陸軍第八軍團 / 第四作戰區（南部地區）
    o 【嘉義中坑營區】陸軍步兵第257旅
    o 【臺南官田、大內營區】陸軍步兵第203旅
    • 陸軍花東防衛指揮部 / 第二作戰區（東部地區）
    o 【花蓮北埔營區】陸軍花東防衛指揮部步兵營
    海軍與海軍陸戰隊 (Navy & Marines)
    負責海軍艦艇兵與陸戰隊新兵的第一階段訓練：
    • 海軍
    o 【高雄左營營區】海軍新兵訓練中心
    • 海軍陸戰隊
    o 【屏東龍泉營區】海軍陸戰隊新兵訓練中心
    憲兵 (Military Police)
    獨立於各軍種外，負責特種司法警察與軍事警察訓練：
    • 【五股堅貞營區】憲兵訓練中心 
    '''
]
