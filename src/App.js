import './App.css';
import Home from './components/Home';
import { HashRouter as Router, Route, Routes , useParams} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Navbar from './components/Navbar';
import UserPage from './components/UserPage';
import QuizPage from './components/QuizPage';
import CreateQuizPage from './components/CreateQuizPage';
import PlayQuizPage from './components/PlayQuizPage';
import PlayPage from './components/PlayPage';
import Home2 from './components/Home2';


function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home2 />} />
        <Route exact path='/login' element={<LoginPage />} />
        <Route exact path='/register' element={<RegisterPage />} />
        <Route exact path='/user' element={<UserPage />} />
        <Route exact path='/quiz' element={<QuizPage />} />
        <Route exact path='/createquiz' element={<CreateQuizPage />} />
        <Route exact path='/playquizpage' element={<PlayQuizPage />} />
        <Route exact path='/playquiz/:quizId/:gameId/:quizTitle' element={<PlayPage />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
