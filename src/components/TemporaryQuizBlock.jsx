import React from 'react'

export default function TemporaryQuizBlock({title, answers}) {
  return (
    <div style={{width: "500px", height: "fit-content", background:"rgb(142,170,255)"}}>
      <h1>{title}</h1>
      <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
        {answers.map(answer => <p>{answer.title} {answer.isCorrect && "[Correct]"}</p>)}
      </div>
    </div>
  )
}
