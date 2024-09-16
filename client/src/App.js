import "./index.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
