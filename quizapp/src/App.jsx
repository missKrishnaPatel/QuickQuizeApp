// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
import HomePage from "./pages/Home.jsx";
import Form from "./components/Form.jsx";
import QuizeStart from "./components/QuizeStart.jsx";
import QuizPage from "./components/QuizPage.jsx";
import Result from "./components/Result.jsx";
function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form" element={<Form />} />
        <Route path="/quiz-start" element={<QuizeStart />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/result" element={<Result/>} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>

  );
}

export default App;
