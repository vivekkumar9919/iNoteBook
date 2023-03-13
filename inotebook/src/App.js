
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomeMain from './components/HomeMain';
import Home from './components/Home';
import About from './components/About'
import Notestate from './Context/notes/NoteState';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';

function App() {
  return (
    <div className="App">
      <Notestate>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeMain />} >
            <Route path="" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<LoginPage/>} />
            <Route path="signup" element={<SignupPage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
      </Notestate>
    </div>
  );
}

export default App;
