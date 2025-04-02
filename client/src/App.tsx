import { Routes, Route } from "react-router-dom";
import Lobby from "./pages/Lobby";
import Room from "./pages/Room";
import Home from "./pages/Home";
import MouseMoveEffect from "./components/MouseMoveEffect";

function App() {
  return (
    <div className="App">
      {/* <CustomCursor /> */}
      <MouseMoveEffect />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/room/:roomId" element={<Room />} />
      </Routes>
    </div>
  );
}

export default App;