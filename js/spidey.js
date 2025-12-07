
class AudioController {
    constructor() {
        this.sounds = {
            transition: new Audio('assets/audio/transition-activate.mp3'),
            hover: new Audio('assets/audio/hover-glitch.mp3')
        };

        // Settings
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

class SpideyThemeManager {
    constructor() {
        this.audio = new AudioController();
        this.init();
    }

    init() {
        console.log("Spidey Theme Initialized");

        // 1. Play Activation Sound immediately
        this.audio.play('transition');

        // 2. Trigger Drop Animation Logic
        this.triggerDropSequence();

        // 3. Attach Interaction Listeners
        this.attachListeners();
    }

    triggerDropSequence() {
        const dropWrapper = document.getElementById('drop-wrapper');
        const webLine = document.getElementById('web-line');
        const impactWeb = document.getElementById('impact-web');
        const profile = document.getElementById('spidey-profile');

        // Start Drop
        if(dropWrapper) {
            // Force reflow
            void dropWrapper.offsetWidth;
            dropWrapper.classList.add('animate-drop');
        }

        // Schedule Impact Event (800ms)
        setTimeout(() => {
            this.triggerImpact(webLine, impactWeb, profile);
        }, 800);
    }

    triggerImpact(webLine, impactWeb, profile) {
        // Audio/Haptic "Thud"
        this.triggerHaptic([60]);

        // Visuals
        if (webLine) webLine.style.opacity = '0'; // Vanish line
        if (impactWeb) {
            impactWeb.style.opacity = '1';
            impactWeb.classList.add('pop-in');
        }

        // Profile overshoot is handled via CSS keyframe inside 'animate-drop'
        // or we can add a specific class if we split animations.
        // Current plan: Use CSS keyframes on the wrapper/image for the full motion.
    }

    triggerHaptic(pattern) {
        if (navigator.vibrate) {
            navigator.vibrate(pattern);
        }
    }

    attachListeners() {
        // Hover Glitch Sound
        const interactiveElements = document.querySelectorAll('.spidey-card, .spidey-nav-btn, .spidey-menu-link');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => this.audio.play('hover'));
        });

        // Toggle Button Haptic (Warning) - We need to find the main toggle button
        const toggleBtn = document.getElementById('spidey-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                // Warning buzz before switching back
                this.triggerHaptic([50, 30, 50, 30, 150]);
            });
        }
    }
}

// Initialize when script loads
new SpideyThemeManager();
