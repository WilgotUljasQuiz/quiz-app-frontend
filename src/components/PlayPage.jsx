import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';

function PlayPage() {
  const params = useParams();
  
  //game id: params.gameId
  //quiz id: params.quizId
  const [questionIds, setQuestionIds] = useState([]);

  const [activeCount, setActiveCount] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState([]);

  

  useEffect(() => {
    console.log(params.quizId);
    getQuestionIds();
  }, [])

  async function getQuestionIds(){
    // try{
      const response = await fetch("https://localhost:7283/api/Quiz/getQuestionIds?quizid=" + params.quizId, {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      console.log(await response.json());

      const data = await response.json();
      setQuestionIds(await data);
    // }catch(err){
    //   console.log(err);
    // }
  }

  

  async function getActiveQuestion(){
    console.log(questionIds[0]);
    // try{
      const response = await fetch("https://localhost:7283/api/Quiz/getQuestion?questionId=" + questionIds[0], {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      // console.log(await response.json())
      const data = await response.json();
      // setActiveQuestion(await data);
      console.log(await data)
    // }catch(err){
    //   console.log(err);
    // }
    // console.log(activeQuestion);
    // setActiveCount(prev => prev + 1);
  }
  return (
    <div>
      <h1 className='regularTitle'>Playing quiz: <u>{params.gameId}</u> </h1>

      <div style={{display: "flex", justifyContent: "center"}}>
        <div style={{width: "600px", height: "600px", background: "gray", display: "flex", flexDirection: "column"}}>
          <h1 >Question: </h1>
          <div style={{background: "blue", height: "400px"}}>
            <h1>{activeQuestion.title}</h1>
            <div style={{display: "flex", flexDirection: "column"}}>
              {/* answers: */}
              {/* {activeQuestion != undefined &&
                <>
                  {activeQuestion.answers.map(answer => <p>{answer.title}</p>)}
                </>
              } */}
            </div>
          </div>
          <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
            <div style={{width: "fit-content", background: "orange", display: "flex", flexDirection: "column"}}>
              <div style={{width: "200px"}}>
                <li className="button-style login smaller" onClick={getActiveQuestion}>Next Question</li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayPage