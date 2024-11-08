let totalStartTime, partialStartTime;
let totalElapsedTime = 0;
let partialElapsedTime = 0;
let totalTimerInterval, partialTimerInterval;
let isPartialPaused = true;
let isTotalPaused = true;

let lastVisibilityChange = Date.now();

// Elementi DOM
const totalTimerDisplay = document.getElementById('total-timer');
const partialTimerDisplay = document.getElementById('partial-timer');
const totalPlayPauseBtn = document.getElementById('total-play-pause');
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

// Funzione per aggiornare il timer totale
function updateTotalTimer() {
    if (!isTotalPaused) {
        totalElapsedTime = Date.now() - totalStartTime;
        totalTimerDisplay.textContent = formatTime(totalElapsedTime);
    }
}

// Funzione per aggiornare il timer parziale
function updatePartialTimer() {
    if (!isPartialPaused) {
        partialElapsedTime = Date.now() - partialStartTime;
        partialTimerDisplay.textContent = formatTime(partialElapsedTime);
    }
}

// Funzione per avviare il timer totale
function startTotalTimer() {
    totalStartTime = Date.now() - totalElapsedTime;
    totalTimerInterval = setInterval(updateTotalTimer, 1000);
}

// Funzione per avviare il timer parziale
function startPartialTimer() {
    partialStartTime = Date.now() - partialElapsedTime;
    partialTimerInterval = setInterval(updatePartialTimer, 1000);
}

// Gestione del pulsante Play/Pausa per il timer totale
totalPlayPauseBtn.addEventListener('click', () => {
    if (isTotalPaused) {
        isTotalPaused = false;
        totalPlayPauseBtn.textContent = "Pausa Totale";
        startTotalTimer();
    } else {
        isTotalPaused = true;
        totalPlayPauseBtn.textContent = "Play Totale";
        clearInterval(totalTimerInterval);
    }
});

// Gestione del pulsante Play/Pausa per il timer parziale
partialPlayPauseBtn.addEventListener('click', () => {
    if (isPartialPaused) {
        isPartialPaused = false;
        partialPlayPauseBtn.textContent = "Pausa Parziale";
        startPartialTimer();
    } else {
        isPartialPaused = true;
        partialPlayPauseBtn.textContent = "Play Parziale";
        clearInterval(partialTimerInterval);
    }
});

// Gestione del pulsante Riavvia per il timer parziale
partialResetBtn.addEventListener('click', () => {
    partialElapsedTime = 0;
    partialTimerDisplay.textContent = "00:00:00";
    clearInterval(partialTimerInterval);
    if (!isPartialPaused) {
        startPartialTimer();
    }
});

// Event Listener per il cambiamento di visibilità della pagina
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        lastVisibilityChange = Date.now();
        clearInterval(totalTimerInterval);
        clearInterval(partialTimerInterval);
    } else {
        const now = Date.now();
        const diff = now - lastVisibilityChange;

        if (!isTotalPaused) {
            totalStartTime += diff;
            startTotalTimer();
        }
        if (!isPartialPaused) {
            partialStartTime += diff;
            startPartialTimer();
        }
    }
});

// Inizializza i display
totalTimerDisplay.textContent = "00:00:00";
partialTimerDisplay.textContent = "00:00:00";
