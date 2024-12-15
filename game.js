const emojiList = [
  "😃",
  "😂",
  "😍",
  "🤔",
  "😎",
  "🤩",
  "🥳",
  "🤠",
  "😇",
  "🙃",
  "😜",
  "😛",
  "🤓",
  "👻",
  "🎃",
];

// Initialize players
let players = initializePlayers();
let turn = 0;
let pool = [...countriesAndCapitals];
let currentCountry = getRandomCountry(pool);

// DOM elements cache
const elements = {
  player1Score: document.getElementById("player1-score"),
  player2Score: document.getElementById("player2-score"),
  countryName: document.getElementById("country-name"),
  continentSelector: document.getElementById("continent-selector"),
  capitalInput: document.getElementById("capital-input"),
  message: document.getElementById("message"),
  guessLog: document.getElementById("guess-log"),
};

// Utility functions
function initializePlayers() {
  return [
    { name: `${getRandomEmoji()} Player 1`, score: 0 },
    { name: `${getRandomEmoji()} Player 2`, score: 0 },
  ];
}

function getRandomEmoji() {
  return emojiList[Math.floor(Math.random() * emojiList.length)];
}

function getRandomCountry(countryList) {
  return countryList[Math.floor(Math.random() * countryList.length)];
}

// UI Update Functions
function updateScores() {
  elements.player1Score.textContent = `${players[0].name}: ${players[0].score} points`;
  elements.player2Score.textContent = `${players[1].name}: ${players[1].score} points`;
}

function updateCountryDisplay(countryData) {
  const { country, code } = countryData;
  const flagHTML = `<img src="https://flagcdn.com/80x60/${code.toLowerCase()}.png" srcset="https://flagcdn.com/160x120/${code.toLowerCase()}.png 2x" width="108" height="81" alt="${country}">`;
  elements.countryName.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; gap: 16px;">
      ${flagHTML} ${country}
    </div>`;
  highlightCountry(currentCountry.country, "#ff007f");
}

function highlightCountry(country, color, borderColor = null) {
  const elements = document.querySelectorAll(`[name="${country}"]`);
  if (!elements.length) {
    console.error("No elements found for", country);
    return;
  }
  elements.forEach((element) => {
    element.style.fill = color;
    if (borderColor) {
      element.style.stroke = borderColor;
      element.style.strokeWidth = "2px";
    }
  });
}

// Event Handlers
function handleContinentFilter() {
  const selectedContinent = elements.continentSelector.value;
  pool =
    selectedContinent === "All"
      ? [...countriesAndCapitals]
      : countriesAndCapitals.filter(
          (country) => country.continent === selectedContinent
        );

  document.querySelector("html").className = selectedContinent.toLowerCase();
  currentCountry = getRandomCountry(pool);
  updateCountryDisplay(currentCountry);
}

function handleGuessSubmission() {
  const guess = elements.capitalInput.value.trim().toLowerCase();
  const correctCapital = currentCountry.capital.toLowerCase();
  const guessEntry = document.createElement("div");
  guessEntry.className = "guess-log-entry";

  if (guess === correctCapital) {
    processCorrectGuess(guessEntry);
  } else if (levenshteinDistance(guess, correctCapital) <= 2) {
    processCloseGuess(guessEntry, guess);
  } else {
    processIncorrectGuess(guessEntry, correctCapital);
  }

  elements.guessLog.prepend(guessEntry);
  elements.capitalInput.value = ""; // Clear input field
  switchTurn();
  updateGameStatus();
}

function processCorrectGuess(entry) {
  players[turn].score += 1;
  elements.message.textContent = `${players[turn].name} guessed correctly!`;
  entry.classList.add("correct");
  highlightCountry(currentCountry.country, "#0FA4AF", "#024950");
  entry.textContent = `${players[turn].name}: Correct guess for ${currentCountry.country} (${currentCountry.capital})`;
}

function processCloseGuess(entry, guess) {
  players[turn].score += 0.5;
  elements.message.textContent = `${players[turn].name} made a typo, but it's close enough!`;
  entry.classList.add("typo");
  highlightCountry(currentCountry.country, "#FF6E00", "#CC5500");
  entry.textContent = `${players[turn].name}: Typo for ${currentCountry.country} (${currentCountry.capital}), guessed "${guess}"`;
}

function processIncorrectGuess(entry, correctCapital) {
  elements.message.innerHTML = `Wrong guess! The capital of ${currentCountry.country} is <span class="capital">${correctCapital}</span>.`;
  entry.classList.add("wrong");
  highlightCountry(currentCountry.country, "#c1121f", "#a70000");
  entry.textContent = `${players[turn].name}: Incorrect guess for ${currentCountry.country}. Correct: ${correctCapital}`;
}

function updateGameStatus() {
  updateScores();
  pool = pool.filter((country) => country !== currentCountry);
  if (pool.length) {
    currentCountry = getRandomCountry(pool);
    updateCountryDisplay(currentCountry);
  } else {
    elements.message.textContent = "Game over! No more countries to guess.";
  }
}

function switchTurn() {
  turn = 1 - turn;
}

// Levenshtein Distance Function
function levenshteinDistance(a, b) {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      matrix[i][j] =
        b[i - 1] === a[j - 1]
          ? matrix[i - 1][j - 1]
          : Math.min(
              matrix[i - 1][j - 1] + 1,
              matrix[i][j - 1] + 1,
              matrix[i - 1][j] + 1
            );
    }
  }
  return matrix[b.length][a.length];
}

// Event Listeners
elements.continentSelector.addEventListener("change", handleContinentFilter);
elements.capitalInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    handleGuessSubmission();
  }
});

// Initial Setup
updateScores();
updateCountryDisplay(currentCountry);
