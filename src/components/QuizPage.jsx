import React from 'react'

export default function QuizPage() {
  return (
    <div style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
        <h1>Quiz Name</h1>
        <div style={{display: "flex", flexDirection: "column"}}>
            <h2>Question 1</h2>
            <div style={{display: "flex", justifyContent: "center"}}>
              <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                <div>Alt-1</div>
                <div>Alt-2</div>
                <div>Alt-3</div>
                <div>Alt-4</div>
              </div>
            </div>
        </div>
    </div>
  )
}
