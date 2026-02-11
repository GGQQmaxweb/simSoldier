/**
 * SIMSOLDIER UTILITIES
 * 純計算邏輯：BMI, 役別判斷, 日期計算
 */

export function bmi(h, w) {
    if (!h || !w) return 0;
    const heightM = h / 100;
    return (w / (heightM * heightM)).toFixed(1);
}

export function determineServiceType(bmiValue, role, disabilityType = 'none', birthYearStr) {
    // 預設邏輯 (可以根據需求調整)
    
    // 1. 免役體位
    if (bmiValue < 16.5 || bmiValue > 31.5) {
        return { type: '免役', reason: 'BMI體位免役', instruction: '恭喜！您已獲得國家級認證的自由身。' };
    }

    // 2. 替代役 (這裡簡化判斷，實際還有家庭因素等)
    if (role === 'rd_substitute' || (bmiValue >= 16.5 && bmiValue < 17) || (bmiValue > 31 && bmiValue <= 31.5)) {
        return { type: '替代役', reason: '體位/申請因素', instruction: '準備申請替代役甄選，注意梯次時間。' };
    }

    // 3. 補充兵 (12天)
    if (role === 'supplementary_12days') {
        return { type: '補充兵', reason: '家庭/體位因素', instruction: '12天夏令營，進去發呆一下就出來了。' };
    }

    // 4. 判斷常備役役期 (1年 vs 4個月)
    // 94年次 (2005) 以後出生為 1 年
    // Parse Year
    let year = 1990;
    if (birthYearStr) {
        year = new Date(birthYearStr).getFullYear();
    }

    if (year >= 2005) {
        return { type: '常備役 (1年)', reason: '94年次以後出生', instruction: '做好心理準備，這是一場持久戰。' };
    } else {
        return { type: '常備役 (4個月)', reason: '93年次以前出生', instruction: '軍事訓練役，忍一下就過去了。' };
    }
}

export function calculateDaysRemaining(targetDate) {
    if (!targetDate) return 0;
    const now = new Date();
    const target = new Date(targetDate);
    const diff = target - now;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// 格式化日期 (YYYY-MM-DD)
export function formatDate(dateStr) {
    if(!dateStr) return '';
    return new Date(dateStr).toISOString().split('T')[0];
}
