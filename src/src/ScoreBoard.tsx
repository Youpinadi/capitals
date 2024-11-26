import React from "react";

interface Player {
  name: string;
  score: number;
}

interface ScoreBoardProps {
  players: Player[];
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ players }) => {
  return (
    <div className="scoreboard">
      <div id="player1-score">
        {players[0].name}: {players[0].score} points
      </div>
      <div id="player2-score">
        {players[1].name}: {players[1].score} points
      </div>
    </div>
  );
};

export default ScoreBoard;
