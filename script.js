let totalStartTime, partialStartTime;
let totalElapsedTime = 0;
let partialElapsedTime = 0;
let totalTimerInterval, partialTimerInterval;
let isPartialPaused = false;

let lastVisibilityChange = Date.now();

// Elementi DOM
const totalTimerDisplay = document.getElementById('total-timer');
const partialTimerDisplay = document.getElementById('partial-timer');

// Funzione per formattare il tempo in hh:mm:ss
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hh = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const mm = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const ss = String(totalSeconds % 60).padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
}

// Funzione per aggiornare i timer
function updateTotalTimer() {
    totalElapsedTime = Date.now() - totalStartTime;
    totalTimerDisplay.textContent = formatTime(totalElapsedTime);
}

function updatePartialTimer() {
    if (!isPartialPaused) {
        partialElapsedTime = Date.now() - partialStartTime;
        partialTimerDisplay.textContent = formatTime(partialElapsedTime);
    }
}

// Event Listener per il cambiamento di visibilità della pagina
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        lastVisibilityChange = Date.now();
    } else {
        const now = Date.now();
        const diff = now - lastVisibilityChange;
        totalStartTime += diff;
        if (!isPartialPaused) {
            partialStartTime += diff;
        }
    }
});

// Funzione per avviare i timer
function startTimers() {
    totalStartTime = Date.now() - totalElapsedTime;
    partialStartTime = Date.now() - partialElapsedTime;
    totalTimerInterval = setInterval(updateTotalTimer, 1000);
    partialTimerInterval = setInterval(updatePartialTimer, 1000);
}

// Avvia i timer
startTimers();
