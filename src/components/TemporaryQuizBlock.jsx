import React from 'react'

export default function TemporaryQuizBlock({title, answers}) {
  return (
    <div style={{height: "350px", minWidth: "300px", background:"#E2306C", borderRadius: "5px", color: "white", padding: "10px"}}>
      <h1 className='regularTitle small' style={{height: "fit-content"}}><u>{title}</u></h1>
      <div style={{display: "flex", flexDirection: "column", gap: "10px", overflowY: "scroll", height: "250px"}}>
        {answers.map(answer => <p className='textStyle'>{answer.title} {answer.isCorrect && <b>  Correct</b>}</p>)}
      </div>
    </div>
  )
}
