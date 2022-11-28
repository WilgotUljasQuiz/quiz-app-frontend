import React, { useState } from 'react'
import TemporaryQuizBlock from './TemporaryQuizBlock';

const arr = [
    {id: 0, title: "", isCorrect: false},
    {id: 1, title: "", isCorrect: false},
    {id: 2, title: "", isCorrect: false},
    {id: 3, title: "", isCorrect: false}
];

const question = [
    {title: "", answers: []}
];
export default function CreateQuizPage() {
    const [title, setTitle] = useState("");
    const [quizId, setQuizId] = useState("");
    const [allAnswers, setAllAnswers] = useState(arr);
    const [questionTitle, setQuestionTitle] = useState("")

    const [allQuestions, setAllQuestions] = useState([]);

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
        const newArr = allAnswers.map(answer => {
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

        setAllAnswers(newArr);
    }

    const setAnswerCorrect = (id) => {
        const newArr = allAnswers.map(answer => {
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

        setAllAnswers(newArr);
    }

    async function createQuestion(ev){
        ev.preventDefault();

        console.log(allAnswers);

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
                    {
                        title: allAnswers[0].title,
                        isCorrect: allAnswers[0].isCorrect,
                        questionId: "string"
                    },
                    {
                        title: allAnswers[1].title,
                        isCorrect: allAnswers[1].isCorrect,
                        questionId: "string"
                    },
                    {
                        title: allAnswers[2].title,
                        isCorrect: allAnswers[2].isCorrect,
                        questionId: "string"
                    },
                    {
                        title: allAnswers[3].title,
                        isCorrect: allAnswers[3].isCorrect,
                        questionId: "string"
                    }
                        
                ]
            })
        })
        setQuestionTitle("");
        setAllAnswers(arr);
        const data = await response.json();
        console.log(await data);

        setAllQuestions([
            ...allQuestions,
            {title: questionTitle, answers: [allAnswers[0], allAnswers[1], allAnswers[2], allAnswers[3]], key: data}
        ])
    }

  return (
    <div style={{display: "flex", justifyContent: "center"}}>
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
                                
                                <div>
                                    <input type="text" value={allAnswers[0].title} className='input-style small' placeholder='answer 1' onChange={ev => updateAnswer(ev, 0)}/>
                                    <input type="radio" value={allAnswers[0].isCorrect} name="check" onChange={() => setAnswerCorrect(0)}></input>
                                </div>
                                <div>
                                    <input type="text" value={allAnswers[1].title} className='input-style small' placeholder='answer 2' onChange={ev => updateAnswer(ev, 1)}/>
                                    <input type="radio" value={allAnswers[1].isCorrect} name="check" onChange={() => setAnswerCorrect(1)} ></input>
                                </div>
                                <div>
                                    <input type="text" value={allAnswers[2].title} className='input-style small' placeholder='answer 3' onChange={ev => updateAnswer(ev, 2)}/>
                                    <input type="radio" value={allAnswers[2].isCorrect} name="check" onChange={() => setAnswerCorrect(2)}></input>
                                </div>
                                <div>
                                    <input type="text" value={allAnswers[3].title} className='input-style small' placeholder='answer 4' onChange={ev =>  updateAnswer(ev, 3)}/>
                                    <input type="radio" value={allAnswers[3].isCorrect} name="check" onChange={() => setAnswerCorrect(3)}></input>
                                </div>
                            </div>
                            <li onClick={createQuestion} className="button-style login smaller">Add Question</li>
                        </>
                    }
                </div>
                
                
                    
                
            </div>
            <div style={{marginTop: "100px", display: "flex", justifyContent: "center"}}>
                <div>
                    <h1>Questions:</h1>
                    {allQuestions.map(question => <TemporaryQuizBlock key={question.data} title={question.title} answers={question.answers} />)}
                </div>
            </div>
        </div>
    </div>
  )
}
