
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import NoteState from "./context/notes/NoteState";


function App() {
 

  return (
    <>
    <NoteState>
      <BrowserRouter>
        <Routes>
      <Route path="/navbar" element={<Navbar />} />
      <Route index element={<Home/>} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      
        </Routes>
      </BrowserRouter>
      </NoteState>
      
    </>
  );
}

export default App;
