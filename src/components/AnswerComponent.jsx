import React, { useState } from 'react'

export default function AnswerComponent({answer, setSelectedAnswer, showAnswer}) {
    const [clicked, setClicked] = useState(false);
  return ( 
    <div className={clicked ? "answer-card clicked" : "answer-card"} style={{background: showAnswer && (answer.isCorrect ? "green" : "red")}} onClick={() =>{ 
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
