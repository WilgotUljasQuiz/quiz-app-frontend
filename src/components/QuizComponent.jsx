import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function QuizComponent(props) {
    const navigate = useNavigate();
    const navigatePath = (path) => navigate(`/${path}`);
    
    function openQuiz(){

        //open quiz with id
        //then route to new page with Quiz.jsx component with the right id
    }
  return (
    <div className='quiz-card' onClick={() => navigatePath("quiz")}>
      <div className='main-card'>
        <h1 className='titleStyle'>{props.quizName}</h1>
        <p>Cathegory: </p>
        <p>Difficulty: </p>
        <p>Questions: </p>
      </div>
    </div>
  )
}
