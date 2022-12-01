import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function PlayQuizPage() {
  const [quizId, setQuizId] = useState("");
  const [gameId, setGameId] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const navigatePath = (path) => navigate(`${path}`);

  async function createGame(){
    setGameId("");
    setLoading(true);
    try{
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
    }catch(err){
      setGameId("noquiz");
      console.log(err);
      setLoading(false);
    }
    setLoading(false);
  }
  
  function play (){
    navigatePath(`/playquiz/${quizId}/${gameId}`);
  }

  return (
    <div style={{display: "flex", justifyContent: "center", flexDirection: "column", marginTop: "50px"}}>
      <h1>Play Quiz</h1>
      <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
        <div style={{width: "200px"}}>
          <input type="text" style={{width: "100%"}} className='input-style' placeholder='Enter quiz id' onChange={ev => setQuizId(ev.target.value)}/>
          <div style={{display: "flex", justifyContent: "center", width: "100%", marginTop: "20px"}}>
            <li className="button-style login" onClick={createGame}>Search</li>
          </div>
          {loading &&
            <div style={{display: "flex", justifyContent: "center", marginTop: "15px"}}>
              <div class="loader"></div>
            </div>
          }
          {gameId.length > 10 &&
            <>
              <p style={{color: "green"}}>Quiz Found</p>
              <li onClick={play} className="button-style login">Play</li>
            </>
          }
          {gameId == "noquiz" &&
            <p style={{color: "red"}}>No Quiz Found</p>
          }
          
        </div>
      </div>
    </div>
  )
}
