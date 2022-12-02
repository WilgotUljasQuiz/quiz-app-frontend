import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';

function PlayPage() {
  const params = useParams();
  
  //game id: params.gameId
  //quiz id: params.quizId
  const [questionIds, setQuestionIds] = useState([]);
  const [answersPage, setAnswersPage] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState([]);
  const [gotAnswers, setGotAnswers] = useState(false);

  useEffect(() => {
    getQuestionIds();
  }, [])

  async function getQuestionIds(){
    const response = await fetch("https://localhost:7283/api/Quiz/getQuestionIds?quizid=" + params.quizId, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    const data = await response.json();
    setQuestionIds(await data);
  }

  useEffect(() => {
    if(questionIds.length > 0){
      console.log(questionIds.length);
      getActiveQuestion()
    }
  }, [questionIds])

  useEffect(() => {
    if(questionIds.length > 0){
      getActiveQuestion()
    }
  }, [answersPage])

  

  async function getActiveQuestion(){
    try{
      const response = await fetch("https://localhost:7283/api/Quiz/getQuestion?questionId=" + questionIds[answersPage], {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      const data = await response.json();
      setActiveQuestion(await data);
      setGotAnswers(true);   
    }catch(err){
      console.log(err);
    }
  }

  const incrementPage = () => answersPage < questionIds.length-1 && setAnswersPage(prev => prev + 1)
  const decreasePage = () => answersPage > 0 && setAnswersPage(prev => prev - 1);

  return (
    <div>
      <h1 className='regularTitle'>Playing quiz: <u>{params.gameId}</u> </h1>
      <div style={{display: "flex", justifyContent: "center"}}>
        <div style={{width: "600px", height: "600px", background: "gray", display: "flex", flexDirection: "column"}}>
          <h1>Quiz Name</h1>
          <div style={{background: "blue", height: "400px"}}>
            <h1>{activeQuestion.title}</h1>
            <div style={{display: "flex", flexDirection: "column"}}>
              {gotAnswers && 
                <>
                  {activeQuestion.answers.map(answer => <div key={Math.random() * 1000}>{answer.title} <input name='answer' type="radio"></input> </div>)}
                </>
              }
            </div>
          </div>
          <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
            <div style={{width: "fit-content", background: "orange", display: "flex", flexDirection: "column"}}>
              <div style={{width: "fit-content", display: "flex"}}>
                <li className="button-style login smaller" onClick={decreasePage}>Previus Question</li>
                <li className="button-style login smaller" onClick={incrementPage}>Next Question</li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayPage