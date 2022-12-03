import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';
import AnswerComponent from './AnswerComponent';
import Canvas from './Canvas';

function PlayPage() {
  const params = useParams();
  
  //game id: params.gameId
  //quiz id: params.quizId
  const [questionIds, setQuestionIds] = useState([]);
  const [answersPage, setAnswersPage] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState([]);
  const [gotAnswers, setGotAnswers] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const [answerMessage, setAnswerMessage] = useState("");
  const [points, setPoints] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

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
      setAnswerMessage("");
      setShowAnswer(false);
      getActiveQuestion()
      // checkIfAnswerCorrect();
    }
  }, [answersPage])

  useEffect(() => {
    console.log(selectedAnswer);
    if(selectedAnswer.questionId){
      checkIfAnswerCorrect();
    }
  }, [selectedAnswer])

  async function checkIfAnswerCorrect(){
    console.log(selectedAnswer.questionId);
    try{
      const response = await fetch("https://localhost:7283/api/Quiz/submitAnswer", {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("AccessToken")}`
        }, body : JSON.stringify( {
          gameId: params.gameId,
          answerId: selectedAnswer.id
        })
      })
      setSelectedAnswer([]);
      setShowAnswer(true);
      const data = await response.json();
      if(await data == "Correct Answer"){
        setAnswerMessage(data);
        setPoints(prev => prev + 1);
      }else if(await data != "Correct Answer"){
        setAnswerMessage("Wrong Answer");
      }
    }catch(err){
      console.log(err);
    }
  }

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


  async function finishQuiz(){
    const response = await fetch("https://localhost:7283/api/Quiz/finishGame?gameId=" + params.gameId, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("AccessToken")}`
      }
    })
    const data = await response.json();
    console.log(await data);
    setQuizDone(true);
  }
  return (
    <div className='test'>
      <div style={{position: "relative"}}>
        {!quizDone ?
          <div>
            <div style={{display: "flex", justifyContent: "center", marginTop: "100px"}}>
              <div className='quiz-play-card'>
                <div style={{background: "#3498db", padding: "20px", borderRadius: "50px", width: "70%"}}>
                  <h1 style={{color: "white"}}>{params.quizTitle}</h1>
                </div>
                <div style={{display:"flex", flexDirection: "column" ,height: "fit-content"}}>
                  
                  <h1 style={{color: "white"}} className='smallTitle normal'> <u>{activeQuestion.title}</u> </h1>
                  <div style={{display: "flex", justifyContent:"center"}}>
                    <div style={{display: "flex", flexDirection: "column"}}>
                    
                      {gotAnswers && 
                        <>
                          {activeQuestion.answers.map(answer => <AnswerComponent answer={answer} setSelectedAnswer={setSelectedAnswer} showAnswer={showAnswer} />)
                          }
                        </>
                      }
                    </div>
                  </div>
                </div>
                <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                  <div style={{width: "fit-content", display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <div style={{width: "400px", height: "100%", display: "flex", justifyContent: "space-around", alignItems: "center", marginTop: "30px"}}>
                      {/* <li className="button-style login smaller" onClick={decreasePage}>Previus Question</li> */}
                      {showAnswer &&
                        <>
                          {answersPage == questionIds.length-1 ?
                            <li style={{background: "orange"}} className="button-style login smaller" onClick={finishQuiz}>Finish Quiz</li>
                            :
                            <li className="button-style login smaller" onClick={incrementPage}>Next Question</li>
                          }
                        </>
                      }
                      
                      
                    </div>
                    <p style={{color: "yellow"}}>{answerMessage}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          :
          <div style={{marginTop: "100px"}}>
            <h1>You Completed the Quiz!</h1>
            <h2>You got {points}/{questionIds.length} Right!</h2>
            <p style={{color: "green"}}>+{points*3} XP</p>
          </div>
        }
      </div>
      <canvasElement />
      {/* <Canvas /> */}
    </div>
  )
}

export default PlayPage