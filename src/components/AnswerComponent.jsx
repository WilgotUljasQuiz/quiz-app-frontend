import React, { useEffect, useState } from 'react'

export default function AnswerComponent({answer, setSelectedAnswer, showAnswer}) {
    const [clicked, setClicked] = useState(false);
    useEffect(() => {
        if(clicked){
            setClicked(false)
        }
    }, [showAnswer])
  return ( 
    <div className={clicked ? "answer-card clicked" : "answer-card"} style={{background: showAnswer && (answer.isCorrect ? "white" : "none"), color: showAnswer &&"black", border: showAnswer && "5px solid rgb(255,255,255)"}} onClick={() =>{ 
        setSelectedAnswer(answer)
        setClicked(clicked ? false : true)
        }
    }>
        <div>
            <h2 style={{color: "white"}}>{answer.title}</h2> 
        </div>
    </div>
  )
}
