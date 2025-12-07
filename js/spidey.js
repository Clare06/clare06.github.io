
class AudioController {
    constructor() {
        this.sounds = {
            transition: new Audio('assets/audio/transition-activate.mp3'),
            hover: new Audio('assets/audio/hover-glitch.mp3')
        };

        // Settings
        this.sounds.transition.volume = 0.8;
        this.sounds.hover.volume = 0.2;
    }

    async play(soundKey) {
        const sound = this.sounds[soundKey];
        if (!sound) return;

        try {
            sound.currentTime = 0;
            await sound.play();
        } catch (e) {
            console.warn(`Audio play failed for ${soundKey}:`, e);
        }
    }
}

// Global state to hold controller
let spideyAudioController = null;

// Tech Stack Data (Updated for "Tech Pop" overlay)
const techWords = ['JAVA', 'SPRING', '404', 'AWS', 'NULL', 'SYSTEM'];

// Sync Configuration
const DROP_SYNC_MS = 2500;

// Global Function: Trigger Tech Glitch
// Accepts an onComplete callback to synchronize the actual content swap/drop
window.triggerTechGlitch = function(onComplete) {
    console.log("Starting Tech Glitch with Overlay...");

    // Initialize Audio Early if possible
    if (!spideyAudioController) spideyAudioController = new AudioController();
    spideyAudioController.play('transition');

    // Create Tech Overlay if it doesn't exist
    let techOverlay = document.getElementById('tech-overlay');
    if (!techOverlay) {
        const transitionOverlay = document.getElementById('transition-overlay');
        if (transitionOverlay) {
            techOverlay = document.createElement('div');
            techOverlay.id = 'tech-overlay';
            transitionOverlay.appendChild(techOverlay);
        }
    }

    const intervalTime = 100;

    const intervalId = setInterval(() => {
        spawnTechWord(techOverlay);
    }, intervalTime);

    // Stop and Trigger Callback after DROP_SYNC_MS
    setTimeout(() => {
        clearInterval(intervalId);
        // Clean up overlay content or remove it?
        // User didn't specify cleanup, but removing it keeps DOM clean after swap.
        // Since content swap happens immediately after, the whole #transition-overlay (parent)
        // will be hidden anyway, but let's be safe.
        if (techOverlay) techOverlay.innerHTML = '';

        if (onComplete) onComplete();
    }, DROP_SYNC_MS);
};

function spawnTechWord(container) {
    if (!container) return;

    const word = techWords[Math.floor(Math.random() * techWords.length)];
    const span = document.createElement('span');
    span.innerText = word;
    span.classList.add('tech-word-pop');

    // Random Position (0-90% to avoid edge clipping)
    const x = Math.random() * 90;
    const y = Math.random() * 90;
    span.style.left = `${x}%`;
    span.style.top = `${y}%`;

    container.appendChild(span);

    // Remove after 200ms
    setTimeout(() => {
        span.remove();
    }, 200);
}

// Global Function: Initialize Theme Logic (Called AFTER content swap)
window.initSpideyTheme = function() {
    console.log("Initializing Spidey Theme Logic...");

    if (!spideyAudioController) spideyAudioController = new AudioController();

    // Trigger Drop Sequence
    triggerDropSequence();

    // Attach Listeners
    attachListeners();
};

function triggerDropSequence() {
    const dropWrapper = document.getElementById('drop-wrapper');
    const webLine = document.getElementById('web-line');
    const impactWeb = document.getElementById('impact-web');
    const profile = document.getElementById('spidey-profile');

    // Start Drop (Immediately upon this function call, which is now synced)
    if(dropWrapper) {
        void dropWrapper.offsetWidth; // Force Reflow
        dropWrapper.classList.add('animate-drop');
    }

    // Schedule Impact Event (800ms after drop starts)
    setTimeout(() => {
        triggerImpact(webLine, impactWeb, profile);
    }, 800);
}

function triggerImpact(webLine, impactWeb, profile) {
    // Audio/Haptic "Thud"
    if (navigator.vibrate) navigator.vibrate([60]);

    // Visuals
    if (webLine) webLine.style.opacity = '0'; // Vanish line
    if (impactWeb) {
        impactWeb.style.opacity = '1';
        impactWeb.classList.add('pop-in');
    }
}

function attachListeners() {
    // Hover Glitch Sound
    const interactiveElements = document.querySelectorAll('.spidey-card, .spidey-nav-btn, .spidey-menu-link');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
             if(spideyAudioController) spideyAudioController.play('hover');
        });
    });

    // Toggle Button Haptic (Warning)
    const toggleBtn = document.getElementById('spidey-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            if (navigator.vibrate) navigator.vibrate([50, 30, 50, 30, 150]);
        });
    }
}
