import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';

function PlayPage() {
  const params = useParams();
  const [questionIds, setQuestionIds] = useState([]);

  const [activeCount, setActiveCount] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState([]);

  useEffect(() => {
    getQuestionIds();
  }, [])
  async function getQuestionIds(){
    try{
      const response = await fetch("https://localhost:7283/api/Quiz/getQuestionIds?quizid=" + params.gameId, {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      const data = await response.json();
      setQuestionIds(await data);
      console.log(await data)
    }catch(err){
      console.log(err);
    }
  }

  async function getActiveQuestion(){
    try{
      const response = await fetch("https://localhost:7283/api/Quiz/getQuestion?questionId=" + questionIds[activeCount], {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      const data = await response.json();
      setQuestionIds(await data);
      console.log(await data)
    }catch(err){
      console.log(err);
    }

    activeCount(prev => prev + 1);
  }
  return (
    <div>
      <h1 className='regularTitle'>Playing quiz: <u>{params.gameId}</u> </h1>

      <div style={{display: "flex", justifyContent: "center"}}>
        <div style={{width: "600px", height: "600px", background: "gray"}}>
          <h1></h1>
        </div>
      </div>
    </div>
  )
}

export default PlayPage