import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function QuizComponent(props) {
  const navigate = useNavigate();
  const navigatePath = (path) => navigate(`${path}`);
  const [gameId, setGameId] = useState("");
  
  useEffect(() => {
    if(gameId != ""){
      navigatePath(`/playquiz/${props.quizId}/${gameId}`)
    }
  }, [gameId])

  async function createGame(){

    //check if user logged in:

    if(localStorage.getItem("AccessToken") == ""){
      navigatePath("/login");
      return;
    }

    try{
      const response = await fetch("https://localhost:7283/api/Quiz/createGame?QuizId="+ props.quizId.toString(), {
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
      play();
    }catch(err){
      console.log(err);
    }
  }

  function play(){
    
  }
  return (
    <div className='quiz-card' onClick={createGame}>
      <div className='main-card'>
        <h1 className='titleStyle'>{props.quizName}</h1>
        <p>Category: </p>
        <p>Difficulty: </p>
        <p>Questions: </p>
      </div>
    </div>
  )
}
