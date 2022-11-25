import React, { useEffect, useState } from 'react'

export default function QuizComponent({id}) {
    const [title, setTitle] = useState("[Title]")
    const [cathegory, setCathegory] = useState("not defined");
    const [quiestionsCount, setQuestionsCount] = useState(0);
    const [difficulty, setDifficulty] = useState("not defined")

    const [questions, setQuestions] = useState([]);
    
    useEffect(() => {
        //get all data from API
    }, [])

    function openQuiz(){
        //open quiz with id
        //then route to new page with Quiz.jsx component with the right id
    }
  return (
    <div style={{width: "300px", height: "400px", background: "blue"}} onClick={openQuiz}>
        <h1>{title}</h1>
        <p>Cathegory: {cathegory}</p>
        <p>Difficulty: {difficulty}</p>
        <p>Questions: {quiestionsCount}</p>
    </div>
  )
}
