import React, { useState, useEffect } from "react";
import ScoreBoard from "./ScoreBoard";
import CountryDisplay from "./CountryDisplay";
import InputForm from "./InputForm";
import { countriesAndCapitals } from "./capitals";
import { WorldMap } from "./WorldMap";
import "./App.css";

const emojiList: string[] = [
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

interface Player {
  name: string;
  score: number;
}

function App() {
  const [players, setPlayers] = useState<Player[]>(initializePlayers());
  const [turn, setTurn] = useState<number>(0);
  const [selectedContinent, setSelectedContinent] = useState<string>("All");
  const [pool, setPool] = useState(countriesAndCapitals);
  const [currentCountry, setCurrentCountry] = useState(getRandomCountry(pool));
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const filteredPool =
      selectedContinent === "All"
        ? countriesAndCapitals
        : countriesAndCapitals.filter(
            (country) => country.continent === selectedContinent
          );
    setPool(filteredPool);
    setCurrentCountry(getRandomCountry(filteredPool));
    resetScores();
  }, [selectedContinent]);

  function initializePlayers(): Player[] {
    return [
      { name: `${getRandomEmoji()} Player 1`, score: 0 },
      { name: `${getRandomEmoji()} Player 2`, score: 0 },
    ];
  }

  function getRandomEmoji(): string {
    return emojiList[Math.floor(Math.random() * emojiList.length)];
  }

  function getRandomCountry(
    countryList: typeof countriesAndCapitals
  ): (typeof countriesAndCapitals)[0] {
    return countryList[Math.floor(Math.random() * countryList.length)];
  }

  function updateScores(playerIndex: number, score: number) {
    const newPlayers = [...players];
    newPlayers[playerIndex].score += score;
    setPlayers(newPlayers);
  }

  function resetScores() {
    setPlayers(initializePlayers());
  }

  function handleNextCountry() {
    setCurrentCountry(getRandomCountry(pool));
    setMessage("");
  }

  return (
    <div className="App">
      <WorldMap />
      <div className="game-container">
        <ScoreBoard players={players} />
        <CountryDisplay countryData={currentCountry} />
        <select
          className="continent-selector"
          name="continent"
          onChange={(e) => setSelectedContinent(e.target.value)}
        >
          <option value="All">🌏 All</option>
          <option value="Africa">🦒 Africa</option>
          <option value="Asia">🐪 Asia</option>
          <option value="Australia">🐨 Australia/Oceania</option>
          <option value="Europe">🏰 Europe</option>
          <option value="North America">🗽 North America</option>
          <option value="South America">🦜 South America</option>
        </select>

        <InputForm
          currentCountry={currentCountry}
          updateScores={updateScores}
          setMessage={setMessage}
          handleNextCountry={handleNextCountry}
        />
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default App;
