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
    <div style={{width: "300px", height: "400px", background: "blue"}} onClick={() => navigatePath("quiz")}>
        <h1>{props.quizName}</h1>
        <p>Cathegory: </p>
        <p>Difficulty: </p>
        <p>Questions: </p>
    </div>
  )
}
