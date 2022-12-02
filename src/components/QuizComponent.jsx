import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function QuizComponent(props) {
  const navigate = useNavigate();
  const navigatePath = (path) => navigate(`${path}`);

  
  const [quizId, setQuizId] = useState("");
  const [gameId, setGameId] = useState("");
    
  return (
    <div className='quiz-card' onClick={() => navigatePath(`/playquiz/${quizId}/${gameId}`)}>
      <div className='main-card'>
        <h1 className='titleStyle'>{props.quizName}</h1>
        <p>Category: </p>
        <p>Difficulty: </p>
        <p>Questions: </p>
      </div>
    </div>
  )
}
