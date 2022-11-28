import './App.css';
import Home from './components/Home';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Navbar from './components/Navbar';
import UserPage from './components/UserPage';
import QuizPage from './components/QuizPage';
import CreateQuizPage from './components/CreateQuizPage';


function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<LoginPage />} />
        <Route exact path='/register' element={<RegisterPage />} />
        <Route exact path='/user' element={<UserPage />} />
        <Route exact path='/quiz' element={<QuizPage />} />
        <Route exact path='/createquiz' element={<CreateQuizPage />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
