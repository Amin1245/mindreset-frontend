const circle = document.getElementById("circle");
const breathStep = document.getElementById("breath-step");
const totalTimer = document.getElementById("total-timer");
const endButton = document.getElementById("end-session");
const startButton = document.getElementById("start-btn");
const breathUI = document.getElementById("breath-ui");
const instructions = document.getElementById("instructions");

// Sounds
const soundIn = document.getElementById("sound-in");
const soundHold = document.getElementById("sound-hold");
const soundOut = document.getElementById("sound-out");

// Pick feeling
const feeling = localStorage.getItem("feeling");

// Default technique
let inhaleTime = 4;
let holdTime = 2;
let exhaleTime = 4;
let techniqueTitle = "4–2–4 Breathing";

// Real techniques
if (feeling === "Anxious") {
    inhaleTime = 4;
    holdTime = 4;
    exhaleTime = 4;
    techniqueTitle = "Box Breathing (4-4-4)";
}

if (feeling === "Overwhelmed") {
    inhaleTime = 4;
    holdTime = 0;
    exhaleTime = 6;
    techniqueTitle = "Extended Exhale (4-6)";
}

if (feeling === "Tired") {
    inhaleTime = 3;
    holdTime = 1;
    exhaleTime = 3;
    techniqueTitle = "Energizing Breath (3-1-3)";
}

if (feeling === "Distracted") {
    inhaleTime = 5;
    holdTime = 2;
    exhaleTime = 5;
    techniqueTitle = "Focused Breathing (5-2-5)";
}

document.getElementById("technique-title").textContent = techniqueTitle;

// Animation values
let totalDuration = 120;
let phase = "inhale";
let phaseTime = inhaleTime;
let elapsed = 0;
let started = false;
let lastTime = null;

const minScale = 0.9;
const maxScale = 1.35;

startButton.addEventListener("click", () => {
    startButton.style.display = "none";
    instructions.style.display = "none";
    breathUI.style.display = "block";
    totalTimer.style.display = "block";
    started = true;
});

function playSound(p) {
    if (p === "inhale") soundIn.play();
    if (p === "hold") soundHold.play();
    if (p === "exhale") soundOut.play();
}

function animate(timestamp) {
    requestAnimationFrame(animate);
    if (!started) return;

    if (!lastTime) lastTime = timestamp;
    const delta = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    elapsed += delta;
    totalDuration -= delta;

    if (totalDuration <= 0) return endSession();

    totalTimer.textContent = `${Math.ceil(totalDuration)} sec`;

    // Change phase
    if (elapsed >= phaseTime) {
        elapsed = 0;

        if (phase === "inhale") {
            phase = holdTime > 0 ? "hold" : "exhale";
            phaseTime = holdTime > 0 ? holdTime : exhaleTime;
        }
        else if (phase === "hold") {
            phase = "exhale";
            phaseTime = exhaleTime;
        }
        else {
            phase = "inhale";
            phaseTime = inhaleTime;
        }

        playSound(phase);
    }

    let progress = elapsed / phaseTime;

    if (phase === "inhale") {
        breathStep.textContent = "Breathe In…";
        circle.style.transform = `scale(${minScale + (maxScale - minScale) * progress})`;
    }
    else if (phase === "hold") {
        breathStep.textContent = "Hold…";
        circle.style.transform = `scale(${maxScale})`;
    }
    else if (phase === "exhale") {
        breathStep.textContent = "Breathe Out…";
        circle.style.transform = `scale(${maxScale - (maxScale - minScale) * progress})`;
    }

    circle.textContent = Math.ceil(phaseTime - elapsed);
}

requestAnimationFrame(animate);

function endSession() {
    localStorage.setItem("duration", 120);
    window.location.href = "finish.html";
}

endButton.addEventListener("click", endSession);
