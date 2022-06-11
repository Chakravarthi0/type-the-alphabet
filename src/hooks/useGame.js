import { useContext, useEffect } from "react";
import { GameContext } from "../context";
import { generateRandomAlphabets } from "../utils";

function useGame() {
  const { gameState, setGameState } = useContext(GameContext);
  const resetGame = () => {
    setGameState((prev) => ({
      ...prev,
      alphabets: generateRandomAlphabets(),
      alphabetIndex: 0,
    }));
  };
  const updateHighScore = (newHighScore) => {
    setGameState((prev) => ({ ...prev, highScore: newHighScore }));
    localStorage.setItem("highScore", JSON.stringify(newHighScore));
  };
  const incrementAlphabetIndex = () => {
    setGameState((prev) => ({
      ...prev,
      alphabetIndex: prev.alphabetIndex + 1,
    }));
  };
  return { gameState, resetGame, updateHighScore, incrementAlphabetIndex };
}

export { useGame };
