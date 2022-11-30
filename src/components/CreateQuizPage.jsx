import React, { useState } from 'react'
import TemporaryQuizBlock from './TemporaryQuizBlock';

let lastId = 0;

export default function CreateQuizPage() {
    const [title, setTitle] = useState("");
    const [quizId, setQuizId] = useState("");
    // const [allAnswers, setAllAnswers] = useState();
    const [questionTitle, setQuestionTitle] = useState("")

    const [allQuestions, setAllQuestions] = useState([]);

    const [answerId, setAnswerId] = useState(0);
    const [answerList, setAnswerList] = useState([{
        title: "",
        isCorrect: false,
        answerId: 0
    }]);

    const createQuiz = async(ev) => {
        ev.preventDefault();

        const response = await fetch("https://localhost:7283/api/Quiz/createQuiz", {
            method: 'POST',
            headers : {
                'mode':'no-cors',
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("AccessToken")}`
            },
            body : JSON.stringify( {
                quizName: title,
            })
        })
        
        const data = await response.json();
        if(response.status === 200)
        {
            console.log(data);
            setQuizId(data);
        }else{
            console.log("error: ")
            console.log(data)
            setQuizId("");
        }
    }

    const updateAnswer = (ev, id) => {
        const newArr = answerList.map(answer => {
            if(answer.id == id){
                return answer = {
                    id: answer.id,
                    title: ev.target.value,
                    isCorrect: answer.isCorrect 
                }
            }else{
                return answer
            }
        })
        setAnswerList(newArr);
    }

    const setAnswerCorrect = (id) => {
        const newArr = answerList.map(answer => {
            if(answer.id == id){
                return answer = {
                    id: answer.id,
                    title: answer.title,
                    isCorrect: true 
                }
            }else{
                return answer = {
                    id: answer.id,
                    title: answer.title,
                    isCorrect: false 
                }
            }
        })

        setAnswerList(newArr);
    }

    async function createQuestion(ev){
        ev.preventDefault();

        console.log(answerList);

        const response = await fetch("https://localhost:7283/api/Quiz/createQuestion", {
            method: 'POST',
            headers : {
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("AccessToken")}`
            },
            body : JSON.stringify( {
                title: questionTitle,
                quizId: quizId,
                createAnswerDtos: [
                    ...answerList                        
                ]
            })
        })
        setQuestionTitle("");
        const data = await response.json();
        console.log(await data);

        setAllQuestions([
            ...allQuestions,
            {title: questionTitle, answers: [...answerList], key: data}
        ])

        setAnswerList([{
            title: "",
            isCorrect: false,
            answerId: 0
        }]);
    }

    function addAnswer(){
        lastId++;
        setAnswerList([
            ...answerList,
            {
                title: "",
                isCorrect: false,
                id: lastId
            }
        ])
    }
  return (
    <div style={{display: "flex", justifyContent: "center", height: "100vh"}}>
        <div style={{display:"flex", flexDirection: "column"}}>
            <h1>Quiz Creator</h1>
            
            <div style={{width: "1000px", height: "fit-content", paddingTop: "100px", display: "flex", justifyContent: "center"}}>
                <div style={{display: "flex", flexDirection: "column"}}>
                    {quizId == "" ?
                        <>
                            <div style={{marginBottom: "20px"}}>
                                <input type="text" className='input-style' placeholder='Quiz Title' onChange={ev => setTitle(ev.target.value)}/>
                            </div>
                            <li onClick={createQuiz} className="button-style login smaller">Enter</li>
                            
                        </>
                        : 
                        <>
                            <h1>{title}</h1>
                            <div style={{marginBottom: "20px", display: "flex", flexDirection: "column", gap: "10px"}}>
                                <div>
                                    <input type="text" value={questionTitle} className='input-style' placeholder='question' onChange={ev => setQuestionTitle(ev.target.value)}/>
                                </div>
                                
                                {answerList.map(answer => 
                                        <div>
                                            <input type="text" value={answer.title} className='input-style small' placeholder='answer 1' onChange={ev => updateAnswer(ev, answer.id)}/>
                                            <input type="radio" value={answer.isCorrect} name="check" onChange={() => setAnswerCorrect(answer.id)}></input>
                                        </div>
                                    )
                                }
                            </div>
                            <div style={{display: "flex", gap: "20px", marginTop: "40px"}}>
                                <li onClick={addAnswer} className="button-style login smaller">Add Answer</li>
                                <li onClick={createQuestion} className="button-style login smaller">Add Question</li>
                            </div>
                        </>
                    }
                </div>
                
                
                    
                
            </div>
            <div style={{marginTop: "100px", display: "flex", justifyContent: "center"}}>
                <div>
                    {allQuestions.length > 0 &&
                        <h1>Questions:</h1>
                    }
                    
                    {allQuestions.map(question => <TemporaryQuizBlock key={question.data} title={question.title} answers={question.answers} />)}
                </div>
            </div>
        </div>
    </div>
  )
}
