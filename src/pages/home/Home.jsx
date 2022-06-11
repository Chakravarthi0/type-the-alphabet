import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../components";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="text-center">
      <h1 className="text-4xl pt-[9rem]">Type the alphabet</h1>
      <p className="mt-4 text-lg">Check your typing speed</p>

      <div className="mt-[5rem] mb-8">
        <h2 className="text-3xl">Rules</h2>
        <ul className="text-lg mt-5">
          <li>You have to type in 20 alphabets</li>
          <li>Timer will start as soon as you start typing</li>
          <li>Typing a wrong alphabet will lead to penalty of 0.5sec</li>
          <li>You can finish the game by typing 20 alphabets correctly</li>
        </ul>
      </div>
      <PrimaryButton clickHandler={() => navigate("/game")}>
        Start
      </PrimaryButton>
    </div>
  );
}

export { Home };
