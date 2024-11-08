let totalTimer, partialTimer;
let totalSeconds = 0;
let partialSeconds = 0;
let isPartialPaused = false;

// Timer Totale
const totalTimerDisplay = document.getElementById('total-timer');
const totalPlayBtn = document.getElementById('total-play');

// Timer Parziale
const partialTimerDisplay = document.getElementById('partial-timer');
const partialPlayPauseBtn = document.getElementById('partial-play-pause');
const partialResetBtn = document.getElementById('partial-reset');

function formatTime(seconds) {
    const hh = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mm = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const ss = String(seconds % 60).padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
}

// Funzione per aggiornare il timer totale
function updateTotalTimer() {
    totalSeconds++;
    totalTimerDisplay.textContent = formatTime(totalSeconds);
}

// Funzione per aggiornare il timer parziale
function updatePartialTimer() {
    if (!isPartialPaused) {
        partialSeconds++;
        partialTimerDisplay.textContent = formatTime(partialSeconds);
    }
}

// Gestione del timer totale
totalPlayBtn.addEventListener('click', () => {
    if (!totalTimer) {
        totalTimer = setInterval(updateTotalTimer, 1000);
        partialTimer = setInterval(updatePartialTimer, 1000);
        totalPlayBtn.textContent = 'In Pausa';
    } else {
        clearInterval(totalTimer);
        clearInterval(partialTimer);
        totalTimer = null;
        partialTimer = null;
        totalPlayBtn.textContent = 'Play';
    }
});

// Gestione del timer parziale: Pausa/Play
partialPlayPauseBtn.addEventListener('click', () => {
    isPartialPaused = !isPartialPaused;
    partialPlayPauseBtn.textContent = isPartialPaused ? 'Play' : 'Pausa';
});

// Gestione del reset del timer parziale
partialResetBtn.addEventListener('click', () => {
    partialSeconds = 0;
    partialTimerDisplay.textContent = '00:00:00';
});
