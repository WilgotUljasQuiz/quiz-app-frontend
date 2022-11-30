import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function PlayQuizPage() {
  const [quizId, setQuizId] = useState("");
  const [gameId, setGameId] = useState("");

  const navigate = useNavigate();
  const navigatePath = (path) => navigate(`${path}`);

  async function createGame(){
    const response = await fetch("https://localhost:7283/api/Quiz/createGame?QuizId="+ quizId.toString(), {
      method: 'POST',
      headers : {
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("AccessToken")}`
      }
    })
    const data = await response.json();
    console.log(await data);
    setGameId(await data);
  }
  
  return (
    <div style={{display: "flex", justifyContent: "center", flexDirection: "column", marginTop: "50px"}}>
      <h1>Play Quiz</h1>
      <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
        <div style={{width: "200px"}}>
          <input type="text" style={{width: "100%"}} className='input-style' placeholder='Enter quiz id' onChange={ev => setQuizId(ev.target.value)}/>
          <div style={{display: "flex", justifyContent: "center", width: "100%", marginTop: "20px"}}>
            <li className="button-style login" onClick={createGame}>Play</li>
          </div>
          <li onClick={() => navigatePath("/playquiz/100")} className="button-style login">My Profile</li>
        </div>
      </div>
    </div>
  )
}
