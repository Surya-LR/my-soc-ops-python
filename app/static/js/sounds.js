/**
 * Sound effects for the bingo game
 * Uses Web Audio API to generate soft, cozy sounds
 */

class SoundGenerator {
    constructor() {
        this.audioContext = null;
        this.soundsEnabled = this.checkSoundsEnabled();
    }

    initAudioContext() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    checkSoundsEnabled() {
        const userPreference = localStorage.getItem('soc-ops-sound');
        return userPreference !== 'disabled';
    }

    setSoundButtonState() {
        const buttons = document.querySelectorAll('.sound-toggle');
        buttons.forEach(button => {
            button.textContent = this.soundsEnabled ? '🔊' : '🔇';
            button.setAttribute('aria-label', this.soundsEnabled ? 'Disable sounds' : 'Enable sounds');
        });
    }

    toggleSounds() {
        this.soundsEnabled = !this.soundsEnabled;
        localStorage.setItem('soc-ops-sound', this.soundsEnabled ? 'enabled' : 'disabled');
        this.setSoundButtonState();
        return this.soundsEnabled;
    }

    playMarkSound() {
        if (!this.soundsEnabled) return;
        
        try {
            this.initAudioContext();
            const now = this.audioContext.currentTime;
            const duration = 0.2;

            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            
            osc.connect(gain);
            gain.connect(this.audioContext.destination);

            osc.frequency.setValueAtTime(523.25, now);
            osc.frequency.setValueAtTime(659.25, now + 0.05);
            osc.frequency.setValueAtTime(783.99, now + 0.1);

            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

            osc.start(now);
            osc.stop(now + duration);
        } catch (e) {
            console.error('Error playing mark sound:', e);
        }
    }

    playBingoSound() {
        if (!this.soundsEnabled) return;

        try {
            this.initAudioContext();
            const now = this.audioContext.currentTime;
            const tones = [
                { freq: 587.33, start: 0, duration: 0.3 },
                { freq: 739.99, start: 0.15, duration: 0.3 },
                { freq: 987.77, start: 0.3, duration: 0.4 }
            ];

            tones.forEach(tone => {
                const osc = this.audioContext.createOscillator();
                const gain = this.audioContext.createGain();
                
                osc.connect(gain);
                gain.connect(this.audioContext.destination);
                
                osc.frequency.value = tone.freq;
                gain.gain.setValueAtTime(0.2, now + tone.start);
                gain.gain.exponentialRampToValueAtTime(0.01, now + tone.start + tone.duration);
                
                osc.start(now + tone.start);
                osc.stop(now + tone.start + tone.duration);
            });
        } catch (e) {
            console.error('Error playing bingo sound:', e);
        }
    }
}

const soundGenerator = new SoundGenerator();

function updateSoundButtons() {
    soundGenerator.setSoundButtonState();
}

function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.remove('hidden');
    toast.classList.add('show');

    clearTimeout(window.toastTimeout);
    window.toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hidden');
    }, 1800);
}

function toggleSounds() {
    const enabled = soundGenerator.toggleSounds();
    showToast(enabled ? 'Sounds enabled' : 'Sounds muted');
    console.log('Sound toggled:', enabled ? 'enabled' : 'disabled');
    return enabled;
}

window.playMarkSound = () => soundGenerator.playMarkSound();
window.playBingoSound = () => soundGenerator.playBingoSound();
window.toggleSounds = toggleSounds;
window.updateSoundButtons = updateSoundButtons;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateSoundButtons);
} else {
    updateSoundButtons();
}

if (typeof htmx !== 'undefined') {
    document.addEventListener('htmx:afterSwap', updateSoundButtons);
}

