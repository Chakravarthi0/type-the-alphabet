import { Routes, Route } from "react-router-dom";
import { Home, Game } from "./pages";
import "./App.css";

function App() {
  return (
    <div className="App min-h-[100vh] text-white bg-gray-800">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;
