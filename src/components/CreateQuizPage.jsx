import React, { useState } from 'react'
import TemporaryQuizBlock from './TemporaryQuizBlock';

let lastId = 1;

export default function CreateQuizPage() {
    const [title, setTitle] = useState("");
    const [quizId, setQuizId] = useState("");
    // const [allAnswers, setAllAnswers] = useState();
    const [questionTitle, setQuestionTitle] = useState("")

    const [allQuestions, setAllQuestions] = useState([]);

    const [enterTitle, setEnterTitle] = useState(false);

    const [answerId, setAnswerId] = useState(0);
    const [answerList, setAnswerList] = useState([{
        title: "",
        isCorrect: false,
        answerId: 0
    }]);

    const createQuiz = async(ev) => {
        ev.preventDefault();

        if(title.length <= 0){
            setEnterTitle(true);
            return;
        }

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

        lastId = 1;
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
    <div>
        <div style={{display: "flex", width: "100%", justifyContent: "space-around", background: "#4D4DF5", height: "100px", color: "white", marginBottom: "100px"}}>
            <h1><u>Create Quiz</u></h1>
            
        </div>
        <div style={{display: "flex", height: "fit-content", justifyContent: allQuestions.length > 0 ? "space-around" : "center"}}>
            <div style={{display:"flex", flexDirection: "column"}}>
                <div style={{ height: "fit-content", display: "flex"}}>
                    <div style={{minHeight: "fit-content", borderRadius: "10px"}}>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            {quizId == "" ?
                                <>
                                    <div>
                                        {enterTitle && 
                                            
                                            <p style={{color: "red"}}>Enter a Title</p>
                                        }
                                    </div>
                                    <div style={{marginBottom: "20px"}}>
                                        <input type="text" className='input-style' placeholder='Enter your Quiz Title' onChange={ev => setTitle(ev.target.value)}/>
                                    </div>
                                    <li onClick={createQuiz} className="button-style login smaller">Enter</li>
                                    
                                    <label for="caregory">Choose a Category:</label>
                                    <select  name="categories" id="category">
                                        <option value="other">Others</option>
                                        <option value="sport">Sport</option>
                                        <option value="fun">Fun</option>
                                        <option value="music">Music</option>
                                        <option value="science">Science</option>
                                        <option value="tv">TV</option>
                                        <option value="news">News</option>
                                        <option value="generalknowledge">General Knowledge</option>
                                        <option value="language">Language</option>
                                        <option value="programming">Programming</option>
                                        <option value="geography">Geography</option>
                                        <option value="history">History</option>
                                    </select>

                                    <label for="difficulty">Choose a Difficulty:</label>
                                    <select  name="difficulties" id="difficulty">
                                        <option value="easy">Easy</option>
                                        <option value="medium">Medium</option>
                                        <option value="hard">Hard</option>
                                        <option value="expert">Expert</option>
                                    </select>
                                    
                                </>
                                : 
                                <>
                                    <h1 className='regularTitle'><u>{title}</u></h1>
                                    <div style={{marginBottom: "20px", display: "flex", flexDirection: "column", gap: "10px", boxShadow: "0px 2px 2px 2px rgba(0, 0, 0, 0.2)", padding: "50px"}}>
                                        <div>
                                            <input type="text" value={questionTitle} className='input-style thick' placeholder='question' onChange={ev => setQuestionTitle(ev.target.value)}/>
                                        </div>
                                        <div style={{display: 'flex', justifyContent: "center", width: "100%"}}>
                                            <div style={{height: "150px", width: "fit-content", overflowY: "scroll", padding:"10px", margin: "10px", boxShadow: "0px 2px 2px 1px rgba(0, 0, 0, 0.2)"}}>
                                                {answerList.map(answer => 
                                                        <div>
                                                            <input type="text" value={answer.title} className='input-style small' placeholder={answer.id == undefined ? "answer 1" : "answer " + answer.id} onChange={ev => updateAnswer(ev, answer.id)}/>
                                                            <input type="radio" value={answer.isCorrect} name="check" onChange={() => setAnswerCorrect(answer.id)}></input>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{display: "flex", gap: "20px", marginTop: "40px", justifyContent: "center"}}>
                                        <li onClick={addAnswer} className="button-style login smaller">Add Answer</li>
                                        <li onClick={createQuestion} className="button-style login smaller">Add Question</li>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
                
            </div>
            {allQuestions.length > 0 &&
                <div style={{height: "fit-content"}}>
                    <h1 className='regularTitle'><u>Questions:</u></h1>
                    <div style={{padding: "25px", boxShadow: "0px 2px 2px 2px rgba(0, 0, 0, 0.2)"}}>
                        <div style={{display: "flex", justifyContent: "center", width: "fit-content", height: "400px"}}>
                            <div style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px", overflowY: "scroll"}} >
                                {allQuestions.map(question => <TemporaryQuizBlock key={question.data} title={question.title} answers={question.answers} />)}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    </div>
  )
}
