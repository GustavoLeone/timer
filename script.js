let totalStartTime, partialStartTime;
let totalElapsedTime = 0;
let partialElapsedTime = 0;
let totalTimerInterval, partialTimerInterval;
let isPartialPaused = false;

// Elementi DOM
const totalTimerDisplay = document.getElementById('total-timer');
const totalPlayBtn = document.getElementById('total-play');
const partialTimerDisplay = document.getElementById('partial-timer');
const partialPlayPauseBtn = document.getElementById('partial-play-pause');
const partialResetBtn = document.getElementById('partial-reset');

// Funzione per formattare il tempo in hh:mm:ss
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hh = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const mm = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const ss = String(totalSeconds % 60).padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
}

// Funzione per aggiornare il display del timer totale
function updateTotalTimer() {
    const currentTime = Date.now();
    totalElapsedTime = currentTime - totalStartTime;
    totalTimerDisplay.textContent = formatTime(totalElapsedTime);
}

// Funzione per aggiornare il display del timer parziale
function updatePartialTimer() {
    if (!isPartialPaused) {
        const currentTime = Date.now();
        partialElapsedTime = currentTime - partialStartTime;
        partialTimerDisplay.textContent = formatTime(partialElapsedTime);
    }
}

// Gestione del timer totale
totalPlayBtn.addEventListener('click', () => {
    if (!totalTimerInterval) {
        // Avvia i timer
        totalStartTime = Date.now() - totalElapsedTime;
        partialStartTime = Date.now() - partialElapsedTime;
        totalTimerInterval = setInterval(updateTotalTimer, 1000);
        partialTimerInterval = setInterval(updatePartialTimer, 1000);
        totalPlayBtn.textContent = 'In Pausa';
    } else {
        // Ferma i timer
        clearInterval(totalTimerInterval);
        clearInterval(partialTimerInterval);
        totalTimerInterval = null;
        partialTimerInterval = null;
        totalPlayBtn.textContent = 'Play';
    }
});

// Gestione del timer parziale: Pausa/Play
partialPlayPauseBtn.addEventListener('click', () => {
    if (!isPartialPaused) {
        isPartialPaused = true;
        partialElapsedTime = Date.now() - partialStartTime;
        partialPlayPauseBtn.textContent = 'Play';
    } else {
        isPartialPaused = false;
        partialStartTime = Date.now() - partialElapsedTime;
        partialPlayPauseBtn.textContent = 'Pausa';
    }
});

// Gestione del reset del timer parziale
partialResetBtn.addEventListener('click', () => {
    partialElapsedTime = 0;
    partialStartTime = Date.now();
    partialTimerDisplay.textContent = '00:00:00';
});
