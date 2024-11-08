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
    const currentTime = Date.now();
    totalElapsedTime = currentTime - totalStartTime;
    totalTimerDisplay.textContent = formatTime(totalElapsedTime);
}

function updatePartialTimer() {
    if (!isPartialPaused) {
        const currentTime = Date.now();
        partialElapsedTime = currentTime - partialStartTime;
        partialTimerDisplay.textContent = formatTime(partialElapsedTime);
    }
}

// Funzione per avviare i timer
function startTimers() {
    totalStartTime = Date.now() - totalElapsedTime;
    partialStartTime = Date.now() - partialElapsedTime;
    clearInterval(totalTimerInterval);
    clearInterval(partialTimerInterval);
    totalTimerInterval = setInterval(updateTotalTimer, 1000);
    partialTimerInterval = setInterval(updatePartialTimer, 1000);
}

// Event Listener per il cambiamento di visibilità della pagina
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Salva il tempo corrente quando la pagina diventa invisibile
        lastVisibilityChange = Date.now();
        clearInterval(totalTimerInterval);
        clearInterval(partialTimerInterval);
    } else {
        // Calcola il tempo trascorso mentre la pagina era nascosta
        const now = Date.now();
        const diff = now - lastVisibilityChange;

        // Aggiorna i tempi di inizio e riavvia i timer
        totalStartTime += diff;
        if (!isPartialPaused) {
            partialStartTime += diff;
        }
        startTimers(); // Riavvia i timer
    }
});

// Inizializza i timer
startTimers();
