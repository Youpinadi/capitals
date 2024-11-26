import React, { useState } from "react";

interface CountryData {
  country: string;
  capital: string;
}

interface InputFormProps {
  currentCountry: CountryData;
  updateScores: (playerIndex: number, score: number) => void;
  setMessage: (message: string) => void;
  handleNextCountry: () => void;
}

const InputForm: React.FC<InputFormProps> = ({
  currentCountry,
  updateScores,
  setMessage,
  handleNextCountry,
}) => {
  const [capital, setCapital] = useState<string>("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (capital.toLowerCase() === currentCountry.capital.toLowerCase()) {
      setMessage(
        `Correct! The capital of ${currentCountry.country} is ${currentCountry.capital}.`
      );
      updateScores(0, 1); // Assuming player 1's turn
    } else {
      setMessage(
        `Incorrect! The capital of ${currentCountry.country} is ${currentCountry.capital}.`
      );
    }
    setCapital("");
    handleNextCountry();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div id="continent-selector">
        {/* Add continent selector if needed */}
      </div>
      <input
        id="capital-input"
        type="text"
        value={capital}
        onChange={(e) => setCapital(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default InputForm;
