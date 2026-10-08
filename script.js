


const settingsBtn =
    document.getElementById("settings-btn");

const settingsPanel =
    document.getElementById("settings-panel");

const closeSettings =
    document.getElementById("close-settings");

const darkModeToggle =
    document.getElementById("dark-mode-toggle");

const soundToggle =
    document.getElementById("sound-toggle");

const autofocusToggle =
    document.getElementById("autofocus-toggle");

const resetDataBtn =
    document.getElementById("reset-data-btn");

const difficultyFilter =
    document.getElementById("difficulty-filter");

const durationFilter =
    document.getElementById("duration-filter");

const averageAccuracyDisplay =
    document.getElementById("average-accuracy");

const totalErrorsDisplay =
    document.getElementById("total-errors");

const totalCharactersDisplay =
    document.getElementById("total-characters");

const totalTimeDisplay =
    document.getElementById("total-time");

const wpmChart =
    document.getElementById("wpm-chart");

const chartContext =
    wpmChart.getContext("2d");

const bestWpmDisplay =
    document.getElementById("best-wpm");

const averageWpmDisplay =
    document.getElementById("average-wpm");

const bestAccuracyDisplay =
    document.getElementById("best-accuracy");

const totalTestsDisplay =
    document.getElementById("total-tests");

const historyContainer =
    document.getElementById("history-container");

const clearHistoryBtn =
    document.getElementById("clear-history-btn");

const difficultyButtons =
    document.querySelectorAll(".difficulty-btn");

    difficultyButtons.forEach(button => {

    button.addEventListener("click", () => {

        difficultyButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentDifficulty =
            button.dataset.difficulty;

        resetTest();
    });

});

const results = document.getElementById("results");
const finalWpm = document.getElementById("final-wpm");
const finalAccuracy = document.getElementById("final-accuracy");
const finalErrors = document.getElementById("final-errors");
const finalCharacters = document.getElementById("final-characters");
const finalTime = document.getElementById("final-time");

const tryAgainBtn = document.getElementById("try-again-btn");

const wpmDisplay = document.getElementById("wpm");
const textDisplay = document.getElementById("text-display");

const passages = {

    easy: [
        "The sun is shining and the weather is beautiful today.",
        "Learning new things can be fun and exciting.",
        "The quick brown fox jumps over the lazy dog.",
        "Practice makes you better at everything you do."
    ],

    medium: [
        "JavaScript allows developers to create interactive and dynamic websites.",
        "Good communication and consistent practice are important skills for success.",
        "Web development combines creativity with logical thinking and problem solving.",
        "Building projects is one of the best ways to improve your programming skills."
    ],

    hard: [
        "Modern web applications require developers to understand performance, accessibility, security, and responsive design.",
        "In 2026, JavaScript remains one of the most widely-used programming languages for creating interactive web experiences.",
        "Debugging complex applications requires patience, logical reasoning, careful observation, and a systematic approach.",
        "Developers often need to balance functionality, performance, maintainability, and user experience when building software."
    ]

};
let currentDifficulty = "easy";
let selectedDuration = 60;
let text = getRandomText();

const durationButtons =
    document.querySelectorAll(".duration-btn");

    durationButtons.forEach(button => {

    button.addEventListener("click", () => {

        durationButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        selectedDuration =
            Number(button.dataset.time);

        resetTest();
    });

});

function displayText() {

    textDisplay.innerHTML = "";

    text.split("").forEach((character, index) => {

        const span = document.createElement("span");

        span.textContent = character;

        if (index === 0) {
            span.classList.add("current");
        }

        textDisplay.appendChild(span);
    });
}

const errorDisplay = document.getElementById("errors");
const accuracyDisplay = document.getElementById("accuracy");
const typingInput = document.getElementById("typing-input");
const restartBtn = document.getElementById("restart-btn");
const timerDisplay = document.getElementById("timer");

let timeLeft = 60;
let timeElapsed = 0;
let timer = null;
let testStarted = false;
let timerRunning = false;

restartBtn.addEventListener("click", startTest);

function startTest() {

    // Hide previous results
    results.classList.add("hidden");

    // Stop any existing timer
    clearInterval(timer);

    timer = null;
    timerRunning = false;

    // Reset time
    timeLeft = selectedDuration;
    timeElapsed = 0;

    timerDisplay.textContent = timeLeft + "s";

    // Generate a new passage
    text = getRandomText();
    displayText();

    // Reset typing input
    typingInput.value = "";
    typingInput.disabled = false;
    typingInput.focus();

    // Reset statistics
    wpmDisplay.textContent = "0";
    accuracyDisplay.textContent = "0%";
    errorDisplay.textContent = "0";

    // Update button
    restartBtn.textContent = "Restart Test";

    // Mark test as ready
    // Timer will NOT start until the user types
    testStarted = true;
}

function endTest() {

    clearInterval(timer);

    timer = null;
    timerRunning = false;
    testStarted = false;

    typingInput.disabled = true;

    restartBtn.textContent = "Restart Test";

    showResults();
}

function showResults() {

    const typedText = typingInput.value;

    let correctCharacters = 0;
    let incorrectCharacters = 0;

    for (let i = 0; i < typedText.length; i++) {

        if (typedText[i] === text[i]) {
            correctCharacters++;
        } else {
            incorrectCharacters++;
        }
    }

    const totalTyped =
        correctCharacters + incorrectCharacters;

    let accuracy = 0;

    if (totalTyped > 0) {

        accuracy =
            (correctCharacters / totalTyped) * 100;
    }

    const minutes = timeElapsed / 60;

    let wpm = 0;

    if (minutes > 0) {

        wpm =
            (typedText.length / 5) / minutes;
    }

    const result = {
    wpm: Math.round(wpm),
    accuracy: Number(accuracy.toFixed(1)),
    errors: incorrectCharacters,
    characters: typedText.length,
    time: timeElapsed,
    difficulty: currentDifficulty,
    duration: selectedDuration,
    date: new Date().toLocaleString()
};

saveResult(result);
displayHistory();
updateAnalytics();
drawWpmChart();

    finalWpm.textContent = Math.round(wpm);

    finalAccuracy.textContent =
        accuracy.toFixed(1) + "%";

    finalErrors.textContent =
        incorrectCharacters;

    finalCharacters.textContent =
        typedText.length;

    finalTime.textContent =
        timeElapsed + "s";

    results.classList.remove("hidden");
}

clearHistoryBtn.addEventListener("click", () => {

    const confirmed =
        confirm("Are you sure you want to clear your test history?");

    if (!confirmed) {
        return;
    }

    localStorage.removeItem("typingHistory");

    difficultyFilter.value = "all";
    durationFilter.value = "all";

    displayHistory();
    updateAnalytics();
    drawWpmChart();
});

displayText();

typingInput.addEventListener("input", checkTyping);

function checkTyping() {

    if (testStarted && !timerRunning) {
    startTimer();
}

    const typedText = typingInput.value;
    if (typedText.length > text.length) {

    typingInput.value =
        typedText.substring(0, text.length);

    return;
}
if (typedText.length === text.length) {
    endTest();
    return;
}

    const characters = textDisplay.querySelectorAll("span");

    let correctCharacters = 0;
    let incorrectCharacters = 0;

    characters.forEach((character, index) => {

        if (index >= typedText.length) {

            character.className = "";

        } else if (typedText[index] === text[index]) {

            character.className = "correct";

            correctCharacters++;

        } else {

            character.className = "incorrect";

            incorrectCharacters++;
        }

        const characters =
    textDisplay.querySelectorAll("span");

characters.forEach(character => {
    character.classList.remove("current");
});

if (typedText.length < text.length) {

    characters[typedText.length]
        .classList.add("current");

    characters[typedText.length]
        .scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
}
    });

    // Update errors
    errorDisplay.textContent = incorrectCharacters;

    // Calculate accuracy
    const totalTyped = correctCharacters + incorrectCharacters;

    if (totalTyped > 0) {

        const accuracy =
            (correctCharacters / totalTyped) * 100;

        accuracyDisplay.textContent =
            accuracy.toFixed(1) + "%";

    } else {

        accuracyDisplay.textContent = "0%";
    }
    calculateWPM(typedText);
}

function calculateWPM(typedText) {

    if (timeElapsed === 0) {
        return;
    }

    const charactersTyped = typedText.length;

    const minutes = timeElapsed / 60;

    const wpm =
        (charactersTyped / 5) / minutes;

    wpmDisplay.textContent = Math.round(wpm);
}

tryAgainBtn.addEventListener("click", () => {

    results.classList.add("hidden");

    startTest();

});

function getRandomText() {

    const currentPassages = passages[currentDifficulty];

    const randomIndex =
        Math.floor(Math.random() * currentPassages.length);

    return currentPassages[randomIndex];
}

function resetTest() {

    clearInterval(timer);

    timer = null;
    timerRunning = false;
    testStarted = false;

    timeLeft = selectedDuration;
    timeElapsed = 0;

    timerDisplay.textContent =
        timeLeft + "s";

    typingInput.value = "";
    typingInput.disabled = true;

    restartBtn.textContent = "Start Test";

    wpmDisplay.textContent = "0";
    accuracyDisplay.textContent = "0%";
    errorDisplay.textContent = "0";

    results.classList.add("hidden");

    text = getRandomText();

    displayText();
}

function startTimer() {

    if (timerRunning) {
        return;
    }

    timerRunning = true;

    timer = setInterval(() => {

        timeLeft--;
        timeElapsed++;

        timerDisplay.textContent =
            timeLeft + "s";

        calculateWPM(typingInput.value);

        if (timeLeft <= 0) {
            endTest();
        }

    }, 1000);
}

function saveResult(result) {

    const history =
        JSON.parse(localStorage.getItem("typingHistory")) || [];

    history.push(result);

    localStorage.setItem(
        "typingHistory",
        JSON.stringify(history)
    );
}

function displayHistory() {

    const history = getFilteredHistory();

    if (history.length === 0) {

        historyContainer.innerHTML = `
            <p class="empty-history">
                No tests completed yet.
            </p>
        `;

        return;
    }

    let tableHTML = `
        <table class="history-table">

            <thead>
                <tr>
                    <th>WPM</th>
                    <th>Accuracy</th>
                    <th>Difficulty</th>
                    <th>Errors</th>
                    <th>Duration</th>
                    <th>Date</th>
                </tr>
            </thead>

            <tbody>
    `;

    history
        .slice()
        .reverse()
        .forEach(result => {

            tableHTML += `
                <tr>
                    <td>${result.wpm}</td>

                    <td>${result.accuracy}%</td>

                    <td>
                        ${result.difficulty}
                    </td>

                    <td>
                        ${result.errors}
                    </td>

                    <td>
                        ${result.duration}s
                    </td>

                    <td>
                        ${result.date}
                    </td>
                </tr>
            `;
        });

    tableHTML += `
            </tbody>

        </table>
    `;

    historyContainer.innerHTML = tableHTML;
}

function updateAnalytics() {

    const history = getFilteredHistory();

    if (history.length === 0) {

    bestWpmDisplay.textContent = "0";

    averageWpmDisplay.textContent = "0";

    bestAccuracyDisplay.textContent = "0%";

    totalTestsDisplay.textContent = "0";

    averageAccuracyDisplay.textContent = "0%";

    totalErrorsDisplay.textContent = "0";

    totalCharactersDisplay.textContent = "0";

    totalTimeDisplay.textContent = "0m";

    return;
}

    // Best WPM

    const bestWpm =
        Math.max(...history.map(result => result.wpm));


    // Average WPM

    const totalWpm =
        history.reduce(
            (sum, result) => sum + result.wpm,
            0
        );

    const averageWpm =
        totalWpm / history.length;


    // Best Accuracy

    const bestAccuracy =
        Math.max(
            ...history.map(result => result.accuracy)
        );


    // Total tests

    const totalTests =
        history.length;

const totalAccuracy =
    history.reduce(
        (sum, result) => sum + result.accuracy,
        0
    );

const averageAccuracy =
    totalAccuracy / history.length;


const totalErrors =
    history.reduce(
        (sum, result) => sum + result.errors,
        0
    );


const totalCharacters =
    history.reduce(
        (sum, result) => sum + result.characters,
        0
    );


const totalSeconds =
    history.reduce(
        (sum, result) => sum + result.time,
        0
    );

const totalMinutes =
    Math.floor(totalSeconds / 60);

const remainingSeconds =
    totalSeconds % 60;

    // Display

    bestWpmDisplay.textContent =
        bestWpm;

    averageWpmDisplay.textContent =
        Math.round(averageWpm);

    bestAccuracyDisplay.textContent =
        bestAccuracy.toFixed(1) + "%";

    totalTestsDisplay.textContent =
        totalTests;

    averageAccuracyDisplay.textContent =
    averageAccuracy.toFixed(1) + "%";

totalErrorsDisplay.textContent =
    totalErrors;

totalCharactersDisplay.textContent =
    totalCharacters;

totalTimeDisplay.textContent =
    `${totalMinutes}m ${remainingSeconds}s`;
}

function drawWpmChart() {

    const history = getFilteredHistory();

    const canvas = wpmChart;
    const ctx = chartContext;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    const devicePixelRatio =
        window.devicePixelRatio || 1;

    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;

    // Reset the canvas transformation
    ctx.setTransform(
        devicePixelRatio,
        0,
        0,
        devicePixelRatio,
        0,
        0
    );

    ctx.clearRect(
        0,
        0,
        width,
        height
    );

    // --------------------------------
    // DARK MODE COLORS
    // --------------------------------

    const isDarkMode =
        document.body.classList.contains("dark-mode");

    const textColor =
        isDarkMode ? "#f5f5f5" : "#333333";

    const gridColor =
        isDarkMode ? "#555555" : "#dddddd";

    const lineColor =
        isDarkMode ? "#8ab4f8" : "#333333";

    // --------------------------------
    // NOTHING TO DRAW
    // --------------------------------

    if (history.length === 0) {

        ctx.font = "16px Arial";

        ctx.textAlign = "center";

        ctx.fillStyle = textColor;

        ctx.fillText(
            "Complete some tests to see your progress.",
            width / 2,
            height / 2
        );

        return;
    }

    const padding = 45;

    const chartWidth =
        width - padding * 2;

    const chartHeight =
        height - padding * 2;

    const values =
        history.map(result => result.wpm);

    const maxWpm =
        Math.max(...values, 10);

    const minWpm = 0;

    // --------------------------------
    // DRAW HORIZONTAL GRID LINES
    // --------------------------------

    ctx.font = "12px Arial";

    ctx.textAlign = "right";

    ctx.fillStyle = textColor;

    ctx.strokeStyle = gridColor;

    ctx.lineWidth = 1;

    for (let i = 0; i <= 5; i++) {

        const y =
            height -
            padding -
            (chartHeight * i / 5);

        const value =
            Math.round(
                minWpm +
                (maxWpm - minWpm) * i / 5
            );

        // Grid line

        ctx.beginPath();

        ctx.moveTo(
            padding,
            y
        );

        ctx.lineTo(
            width - padding,
            y
        );

        ctx.stroke();

        // Y-axis value

        ctx.fillText(
            value,
            padding - 8,
            y + 4
        );
    }

    // --------------------------------
    // DRAW X-AXIS LABELS
    // --------------------------------

    ctx.textAlign = "center";

    ctx.fillStyle = textColor;

    history.forEach((result, index) => {

        const x =
            padding +
            (chartWidth * index /
            Math.max(history.length - 1, 1));

        ctx.fillText(
            index + 1,
            x,
            height - 15
        );
    });

    // --------------------------------
    // DRAW WPM LINE
    // --------------------------------

    ctx.beginPath();

    ctx.strokeStyle = lineColor;

    ctx.lineWidth = 2;

    history.forEach((result, index) => {

        const x =
            padding +
            (chartWidth * index /
            Math.max(history.length - 1, 1));

        const y =
            height -
            padding -
            ((result.wpm - minWpm) /
            Math.max(maxWpm - minWpm, 1)) *
            chartHeight;

        if (index === 0) {

            ctx.moveTo(x, y);

        } else {

            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();

    // --------------------------------
    // DRAW POINTS
    // --------------------------------

    ctx.fillStyle = lineColor;

    history.forEach((result, index) => {

        const x =
            padding +
            (chartWidth * index /
            Math.max(history.length - 1, 1));

        const y =
            height -
            padding -
            ((result.wpm - minWpm) /
            Math.max(maxWpm - minWpm, 1)) *
            chartHeight;

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            4,
            0,
            Math.PI * 2
        );

        ctx.fill();
    });
}

function getFilteredHistory() {

    const history =
        JSON.parse(localStorage.getItem("typingHistory")) || [];

    const selectedDifficulty =
        difficultyFilter.value;

    const selectedDuration =
        durationFilter.value;

    return history.filter(result => {

        const difficultyMatches =
            selectedDifficulty === "all" ||
            result.difficulty === selectedDifficulty;

        const durationMatches =
            selectedDuration === "all" ||
            result.duration === Number(selectedDuration);

        return difficultyMatches && durationMatches;
    });
}

difficultyFilter.addEventListener("change", () => {

    displayHistory();

    updateAnalytics();

    drawWpmChart();
});

durationFilter.addEventListener("change", () => {

    displayHistory();

    updateAnalytics();

    drawWpmChart();
});

settingsBtn.addEventListener("click", () => {

    settingsPanel.classList.remove("hidden");

});

closeSettings.addEventListener("click", () => {

    settingsPanel.classList.add("hidden");

});

darkModeToggle.addEventListener("change", () => {

    document.body.classList.toggle(
        "dark-mode",
        darkModeToggle.checked
    );

    localStorage.setItem(
        "darkMode",
        darkModeToggle.checked
    );

});

const savedDarkMode =
    localStorage.getItem("darkMode") === "true";

darkModeToggle.checked = savedDarkMode;

document.body.classList.toggle(
    "dark-mode",
    savedDarkMode
);

displayHistory();
updateAnalytics();
drawWpmChart();