export function initShootingGame() {
    const startBtn = document.getElementById('btn-start-shooting');
    const retryBtn = document.getElementById('btn-retry-shooting');
    
    // Screens
    const startScreen = document.getElementById('shooting-start-screen');
    const mnemonicScreen = document.getElementById('shooting-mnemonic-screen');
    const aimingArea = document.getElementById('shooting-aiming-area');
    const endScreen = document.getElementById('shooting-end-screen');
    
    // HUD
    const hud = document.getElementById('shooting-hud');
    const scoreDisplay = document.getElementById('shooting-score');
    const roundsDisplay = document.getElementById('shooting-rounds');
    const flash = document.getElementById('shooting-flash');
    const targetArea = document.getElementById('shooting-target-area'); // For floating texts and bullet holes
    
    // Mnemonic Elements
    const mnemonicOptions = document.getElementById('mnemonic-options');
    const mnemonicProgress = document.getElementById('mnemonic-progress');
    
    // Aiming Elements
    const crosshair = document.getElementById('aim-crosshair');
    const btnHold = document.getElementById('btn-hold-breath');
    const btnShoot = document.getElementById('btn-shoot-gun');
    const gameContainer = document.getElementById('shooting-game-container');

    // End Elements
    const finalScoreDisplay = document.getElementById('shooting-final-score');
    const rankDisplay = document.getElementById('shooting-rank');

    if (!startBtn) return;

    // --- State Variables ---
    let score = 0;
    let maxRounds = 5;
    let currentRound = 0;
    
    // Mnemonic State
    const MNEMONICS = ['托', '抵', '握', '貼', '瞄', '停', '扣', '報'];
    let currentMnemonicStep = 0;
    
    // Aiming State
    let isAiming = false;
    let isHoldingBreath = false;
    let timeElapsed = 0;
    let aimInterval;
    
    // Crosshair physics
    let cx = 50; // percentage
    let cy = 50; // percentage
    let baseX = 50;
    let baseY = 50;
    let recoilX = 0;
    let recoilY = 0;
    
    // Mouse Tracking (for Desktop)
    let mousePctX = 50;
    let mousePctY = 50;

    // Event Listeners
    startBtn.addEventListener('click', startMnemonicPhase);
    retryBtn.addEventListener('click', startMnemonicPhase);

    // Track mouse position on desktop
    gameContainer.addEventListener('mousemove', (e) => {
        if (!isAiming || window.innerWidth < 768) return;
        const rect = gameContainer.getBoundingClientRect();
        mousePctX = ((e.clientX - rect.left) / rect.width) * 100;
        mousePctY = ((e.clientY - rect.top) / rect.height) * 100;
    });

    // Keyboard Spacebar for hold breath
    window.addEventListener('keydown', (e) => {
        if (isAiming && window.innerWidth >= 768 && e.code === 'Space') {
            e.preventDefault();
            isHoldingBreath = true;
        }
    });
    window.addEventListener('keyup', (e) => {
        if (window.innerWidth >= 768 && e.code === 'Space') {
            isHoldingBreath = false;
        }
    });

    // Mouse click on container for shooting
    gameContainer.addEventListener('mousedown', (e) => {
        if (isAiming && window.innerWidth >= 768) {
            e.preventDefault();
            fireShot();
        }
    });

    // Mobile Aiming Controls
    const holdStart = (e) => { e.preventDefault(); isHoldingBreath = true; btnHold.classList.add('scale-95'); };
    const holdEnd = (e) => { e.preventDefault(); isHoldingBreath = false; btnHold.classList.remove('scale-95'); };
    
    btnHold.addEventListener('mousedown', holdStart);
    btnHold.addEventListener('touchstart', holdStart, {passive: false});
    btnHold.addEventListener('mouseup', holdEnd);
    btnHold.addEventListener('mouseleave', holdEnd);
    btnHold.addEventListener('touchend', holdEnd, {passive: false});
    
    const shootAction = (e) => {
        e.preventDefault();
        btnShoot.classList.add('scale-95');
        setTimeout(() => btnShoot.classList.remove('scale-95'), 100);
        if (isAiming) {
            fireShot();
        }
    };
    btnShoot.addEventListener('mousedown', shootAction);
    btnShoot.addEventListener('touchstart', shootAction, {passive: false});


    // --- Phase 1: Mnemonic Phase ---
    function startMnemonicPhase() {
        // Reset state
        score = 0;
        currentRound = 0;
        currentMnemonicStep = 0;
        targetArea.innerHTML = '';
        
        startScreen.classList.add('hidden');
        endScreen.classList.add('hidden');
        hud.classList.add('hidden');
        aimingArea.classList.add('hidden');
        mnemonicScreen.classList.remove('hidden');
        
        renderMnemonicUI();
    }
    
    function renderMnemonicUI() {
        mnemonicOptions.innerHTML = '';
        mnemonicProgress.innerHTML = '';
        
        // Progress dots
        for (let i = 0; i < MNEMONICS.length; i++) {
            const dot = document.createElement('div');
            dot.className = `flex-1 rounded flex items-center justify-center text-xs font-bold transition-colors ${i < currentMnemonicStep ? 'bg-green-500 text-stone-900 shadow-[0_0_5px_rgba(34,197,94,0.8)]' : 'bg-stone-700 text-stone-500'}`;
            dot.textContent = i < currentMnemonicStep ? MNEMONICS[i] : (i + 1);
            mnemonicProgress.appendChild(dot);
        }
        
        if (currentMnemonicStep >= MNEMONICS.length) {
            // Success! Move to shooting phase
            setTimeout(() => {
                startAimingPhase();
            }, 600);
            return;
        }

        let optionsToShow = [...MNEMONICS];
        // Shuffle array
        for (let i = optionsToShow.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [optionsToShow[i], optionsToShow[j]] = [optionsToShow[j], optionsToShow[i]];
        }
        
        optionsToShow.forEach(word => {
            const btn = document.createElement('button');
            const isClicked = MNEMONICS.indexOf(word) < currentMnemonicStep;
            
            btn.className = `w-16 h-16 md:w-20 md:h-20 text-xl md:text-2xl font-bold rounded-xl border-2 transition-all shadow-lg select-none ${
                isClicked 
                ? 'bg-stone-700 border-stone-600 text-stone-500 opacity-30 cursor-not-allowed' 
                : 'bg-stone-800 border-stone-500 text-white hover:bg-stone-700 hover:border-green-400 active:scale-95 cursor-pointer hover:shadow-[0_0_10px_rgba(34,197,94,0.3)]'
            }`;
            btn.textContent = word;
            
            if (!isClicked) {
                const onClick = (e) => {
                    e.preventDefault();
                    handleMnemonicClick(word, btn);
                };
                btn.addEventListener('mousedown', onClick);
                btn.addEventListener('touchstart', onClick, {passive: false});
            }
            
            mnemonicOptions.appendChild(btn);
        });
    }
    
    function handleMnemonicClick(word, btnElement) {
        if (word === MNEMONICS[currentMnemonicStep]) {
            // Correct
            btnElement.classList.replace('border-stone-500', 'border-green-500');
            btnElement.classList.replace('text-white', 'text-green-400');
            currentMnemonicStep++;
            triggerFlash(true, 'bg-green-500/20');
            renderMnemonicUI();
        } else {
            // Wrong
            btnElement.classList.replace('border-stone-500', 'border-red-500');
            btnElement.classList.replace('bg-stone-800', 'bg-red-600');
            triggerFlash(true, 'bg-red-500/40');
            setTimeout(() => {
                // Reset progress on failure
                currentMnemonicStep = 0;
                renderMnemonicUI();
            }, 400);
        }
    }


    // --- Phase 2: Aiming Phase ---
    function startAimingPhase() {
        mnemonicScreen.classList.add('hidden');
        aimingArea.classList.remove('hidden');
        hud.classList.remove('hidden');
        
        currentRound = 0;
        score = 0;
        scoreDisplay.textContent = score;
        updateRoundsDisplay();
        
        // Reset aim position
        baseX = 50;
        baseY = 50;
        cx = 50;
        cy = 50;
        recoilX = 0;
        recoilY = 0;
        mousePctX = 50;
        mousePctY = 50;
        
        isAiming = true;
        isHoldingBreath = false;
        timeElapsed = 0;
        
        clearInterval(aimInterval);
        aimInterval = setInterval(updateAimPhysics, 30);
    }
    
    function updateAimPhysics() {
        if (!isAiming) return;
        timeElapsed += 0.03;
        
        const isDesktop = window.innerWidth >= 768;
        
        // Decay recoil
        recoilX *= 0.85;
        recoilY *= 0.85;
        
        // Sway parameters
        const speed = isHoldingBreath ? 0.4 : 2.0;
        const amplitudeX = isHoldingBreath ? 1.5 : (isDesktop ? 6 : 18);
        const amplitudeY = isHoldingBreath ? 1.5 : (isDesktop ? 4 : 12);
        
        if (isDesktop) {
            // Desktop: Base smoothly follows mouse
            baseX += (mousePctX - baseX) * 0.15;
            baseY += (mousePctY - baseY) * 0.15;
        } else {
            // Mobile: Base drifts automatically
            baseX += (Math.random() - 0.5) * (isHoldingBreath ? 0.1 : 1.2);
            baseY += (Math.random() - 0.5) * (isHoldingBreath ? 0.1 : 1.2);
            // Keep base within bounds
            baseX = Math.max(20, Math.min(80, baseX));
            baseY = Math.max(20, Math.min(80, baseY));
        }

        // Lissajous curve for natural motion
        const swayX = Math.sin(timeElapsed * speed * 1.9) * amplitudeX + Math.cos(timeElapsed * speed * 1.1) * (amplitudeX * 0.4);
        const swayY = Math.cos(timeElapsed * speed * 1.6) * amplitudeY + Math.sin(timeElapsed * speed * 0.8) * (amplitudeY * 0.4);
        
        cx = baseX + swayX + recoilX;
        cy = baseY + swayY + recoilY;
        
        // Clamp to edges
        cx = Math.max(0, Math.min(100, cx));
        cy = Math.max(0, Math.min(100, cy));
        
        crosshair.style.left = `${cx}%`;
        crosshair.style.top = `${cy}%`;
    }
    
    function fireShot() {
        if (!isAiming) return;
        
        const isDesktop = window.innerWidth >= 768;
        
        // Recoil effect
        recoilY -= (isDesktop ? 15 : 12) + Math.random() * 5; // Kick up heavily
        recoilX += (Math.random() - 0.5) * (isDesktop ? 10 : 15); // Random horizontal kick
        
        triggerFlash(true, 'bg-yellow-200/40');
        
        // Calculate hit
        // Center of target is at 50%, 50%
        const dx = cx - 50;
        const dy = cy - 50;
        const distance = Math.sqrt(dx*dx + dy*dy); // Distance in percentage
        
        let roundScore = 0;
        let ringText = '脫靶';
        let textColor = 'text-red-500';
        
        if (distance < 2.5) {
            roundScore = 10;
            ringText = '10 環';
            textColor = 'text-yellow-400';
        } else if (distance < 5.0) {
            roundScore = 9;
            ringText = '9 環';
            textColor = 'text-green-400';
        } else if (distance < 8.0) {
            roundScore = 8;
            ringText = '8 環';
            textColor = 'text-green-500';
        } else if (distance < 12.0) {
            roundScore = 7;
            ringText = '7 環';
            textColor = 'text-stone-300';
        } else if (distance < 18.0) {
            roundScore = 6;
            ringText = '6 環';
            textColor = 'text-stone-400';
        } else if (distance < 25.0) {
            roundScore = 5;
            ringText = '5 環';
            textColor = 'text-stone-500';
        }
        
        score += roundScore;
        scoreDisplay.textContent = score;
        currentRound++;
        updateRoundsDisplay();
        
        showFloatingText(`${ringText} (+${roundScore})`, textColor, cx, cy);
        
        // Draw bullet hole
        const hole = document.createElement('div');
        hole.className = 'absolute w-2 h-2 md:w-3 md:h-3 bg-black rounded-full shadow-[0_0_2px_rgba(255,255,255,0.5)] z-10';
        hole.style.left = `${cx}%`;
        hole.style.top = `${cy}%`;
        hole.style.transform = 'translate(-50%, -50%)';
        targetArea.appendChild(hole);
        
        if (currentRound >= maxRounds) {
            isAiming = false;
            setTimeout(() => {
                endGame();
            }, 1500);
        }
    }
    
    function showFloatingText(text, colorClass, pctX, pctY) {
        const floatText = document.createElement('div');
        floatText.textContent = text;
        floatText.className = `absolute font-bold text-xl md:text-3xl pointer-events-none z-30 shadow-black drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] ${colorClass}`;
        floatText.style.left = `${pctX}%`;
        floatText.style.top = `${pctY}%`;
        floatText.style.transform = 'translate(-50%, -100%)';
        floatText.style.transition = 'all 1.5s cubic-bezier(0.165, 0.84, 0.44, 1)';
        targetArea.appendChild(floatText);

        requestAnimationFrame(() => {
            floatText.style.transform = 'translate(-50%, -250%)';
            floatText.style.opacity = '0';
        });

        setTimeout(() => floatText.remove(), 1500);
    }
    
    function updateRoundsDisplay() {
        roundsDisplay.textContent = `${currentRound}/${maxRounds}`;
    }

    function triggerFlash(show, bgClass = 'bg-yellow-200/30') {
        flash.className = `absolute inset-0 z-30 pointer-events-none mix-blend-overlay ${bgClass}`;
        flash.classList.remove('hidden');
        setTimeout(() => {
            flash.classList.add('hidden');
        }, 60);
    }

    function endGame() {
        clearInterval(aimInterval);
        
        endScreen.classList.remove('hidden');
        finalScoreDisplay.textContent = score;

        let rank = '';
        let rankClass = '';
        // Max score = 50
        if (score >= 45) {
            rank = '神槍手 (特優)';
            rankClass = 'text-yellow-400';
        } else if (score >= 35) {
            rank = '合格射手 (優良)';
            rankClass = 'text-green-400';
        } else if (score >= 25) {
            rank = '菜鳥射手 (及格)';
            rankClass = 'text-stone-300';
        } else {
            rank = '天兵 (不及格)';
            rankClass = 'text-red-500';
        }

        rankDisplay.textContent = `評等：${rank}`;
        rankDisplay.className = `text-xl font-bold mb-8 bg-stone-900 py-2 rounded-lg border border-stone-700 w-full ${rankClass}`;
    }
}
