import { useEffect, useRef, useState } from "react";
import MovingComponent from "react-moving-text";
import { PrimaryButton } from "../../components";
import { useGame } from "../../hooks";

function Game() {
  const { gameState, resetGame, updateHighScore, incrementAlphabetIndex } =
    useGame();
  const { alphabets, alphabetIndex, highScore } = gameState;
  useEffect(() => {
    if (gameState.alphabets.length < 1 || alphabetIndex >= 19) {
      resetGame();
    }
  }, []);

  const initialTime = {
    min: 0,
    sec: 0,
    milliSec: 0,
    overAllMilliseconds: 0,
  };
  const [time, setTime] = useState(initialTime);
  const [inputValue, setInputValue] = useState("");
  const [showPenalty, setShowPenalty] = useState(false);

  const timerID = useRef();

  const inputHandler = (event) => {
    setInputValue(event.target.value);
    if (!timerID.current && alphabetIndex < 1) {
      startTimer();
    }

    if (alphabetIndex <= 19) {
      if (
        event.target.value.slice(-1).toLowerCase() ===
        alphabets[alphabetIndex].toLowerCase()
      ) {
        if (alphabetIndex === 18) {
          stopTimer();
          if (
            (highScore.milliSec === 0 &&
              highScore.sec === 0 &&
              highScore.min === 0) ||
            time.overAllMilliseconds < highScore.overAllMilliseconds
          ) {
            updateHighScore(time);
          }
        }
        incrementAlphabetIndex();
      } else {
        console.log("err");
        setShowPenalty(true);
        setTimeout(() => {
          setShowPenalty(false);
        }, 400);
        setTime((prev) => {
          const newState = {
            milliSec: prev.milliSec,
            sec: prev.sec,
            min: prev.min,
            overAllMilliseconds: prev.overAllMilliseconds + 500,
          };
          if (prev.milliSec < 49) {
            newState.milliSec = prev.milliSec + 50;
          } else {
            newState.milliSec = (prev.milliSec + 50) % 100;
            if (prev.sec < 58) {
              newState.sec = prev.sec + 1;
            } else {
              newState.sec = 0;
              newState.min = prev.min + 1;
            }
          }
          console.log(newState);

          return newState;
        });
      }
    } else {
      stopTimer();
    }
  };

  const startTimer = () => {
    timerID.current = setInterval(() => {
      setTime((prev) => {
        const newState = {
          milliSec: prev.milliSec,
          sec: prev.sec,
          min: prev.min,
          overAllMilliseconds: prev.overAllMilliseconds + 10,
        };
        if (prev.milliSec === 99) {
          newState.milliSec = 0;
          if (prev.sec === 59) {
            newState.min = prev.min + 1;
            newState.sec = 0;
          } else {
            newState.sec = prev.sec + 1;
          }
        } else {
          newState.milliSec = prev.milliSec + 1;
        }
        console.log(newState);

        return newState;
      });
    }, 10);

    console.log(timerID.current);
  };

  const stopTimer = () => {
    console.log(timerID.current);
    clearTimeout(timerID.current);
  };

  const reset = () => {
    stopTimer();
    resetGame();
    timerID.current = null;
    setTime(initialTime);
    setInputValue("");
  };
  return (
    <div className="text-center">
      <h1 className="text-4xl pt-[9rem]">Type the alphabet</h1>
      <p className="mt-4 text-lg">
        Typing game to see how fast you type. Timer starts when you do :)
      </p>
      <div className="h-[10rem] w-[90%] max-w-[400px] mx-auto my-10 bg-white rounded-xl">
        <p className="text-[100px] text-green-700">
          {alphabetIndex <= 19 ? (
            alphabets[alphabetIndex]
          ) : highScore.overAllMilliseconds >= time.overAllMilliseconds ? (
            "Success"
          ) : (
            <p className="text-red-500">Failure</p>
          )}
        </p>
      </div>

      <div className="flex items-center w-[180px] m-auto gap-x-2">
        <p className="text-xl font-medium">
          Time: {time.min > 0 && `${time.min}:`}
          {time.sec <= 9 ? `0${time.sec}` : `${time.sec}`}:
          {time.milliSec <= 9 ? `0${time.milliSec}` : time.milliSec}s
        </p>

        {showPenalty && (
          <div className="text-red-500 font-bold">
            <MovingComponent
              type="slideInFromRight"
              duration="400ms"
              delay="0s"
              direction="normal"
              timing="ease"
              iteration="1"
              fillMode="none"
            >
              +0.5s
            </MovingComponent>
          </div>
        )}
      </div>

      <p className="text-lg mt-4 mr-3">
        My best time:
        {console.log("hig ", highScore)}
        {highScore.milliSec === 0 && highScore.sec === 0 && highScore.min === 0
          ? "N/A"
          : highScore.min > 0
          ? `${highScore.min <= 9 ? `0${highScore.min}` : `${highScore.min}`}:${
              highScore.sec <= 9 ? `0${highScore.sec}` : `${highScore.sec}`
            }:${
              highScore.milliSec <= 9
                ? `0${highScore.millisec}`
                : `${highScore.millisec}`
            }s`
          : `${highScore.sec}:${highScore.milliSec}s`}
      </p>

      <div className="mt-5">
        <label>
          <input
            value={inputValue}
            onChange={inputHandler}
            className="py-1.5 text-black rounded-md mr-3"
          />
        </label>
        <PrimaryButton clickHandler={reset}> Reset</PrimaryButton>
      </div>
    </div>
  );
}

export { Game };
