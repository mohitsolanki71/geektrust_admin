import logo from "./logo.svg";
import "./App.css";
import { Navbar } from "./components/navbar";
import Home from "./components/home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
