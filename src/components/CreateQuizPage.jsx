import React, { useState } from 'react'

const arr = [
    {id: 0, title: "", isCorrect: false},
    {id: 1, title: "", isCorrect: false},
    {id: 2, title: "", isCorrect: false},
    {id: 3, title: "", isCorrect: false}
];

export default function CreateQuizPage() {
    const [title, setTitle] = useState("");
    const [quizId, setQuizId] = useState("");

    // const [allQuestions, setAllQuestions] = useState([]);

    const [allAnswers, setAllAnswers] = useState(arr);
    const [questionTitle, setQuestionTitle] = useState("")

    // const [question, setQuestion] = useState({});

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

    const updateAnswer = (id) => {
        console.log("hehe")
        setAllAnswers([
            ...allAnswers,
            allAnswers.filter((answer) => answer.id == id)
        ])
    }

    async function createQuestion(ev){
        ev.preventDefault();

        const response = await fetch("https://localhost:7283/api/Quiz/createQuestion", {
            method: 'POST',
            headers : {
                'mode':'no-cors',
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
                    title: allAnswers[0],
                    isCorrect: true,
                    questionId: "string"
                    },
                    {
                    title: allAnswers[1],
                    isCorrect: true,
                    questionId: "string"
                    },
                    {
                    title: allAnswers[2],
                    isCorrect: true,
                    questionId: "string"
                    },
                    {
                    title: allAnswers[3],
                    isCorrect: true,
                    questionId: "string"
                    }
                        
                ]
            })
        })

        setQuestionTitle("");
        setAllAnswers(arr);
        console.log(await response.json());
    }

  return (
    <div style={{display: "flex", justifyContent: "center"}}>
        <div style={{display:"flex", flexDirection: "column"}}>
            <h1>Quiz Creator</h1>
            <div style={{width: "300px", height: "1000px", paddingTop: "100px"}}>
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
                            <input type="text" className='input-style' placeholder='question' onChange={ev => setQuestionTitle(ev.target.value)}/>
                            
                            <div>
                                <input type="text" className='input-style small' placeholder='answer 1' onChange={updateAnswer(0)}/>
                                <input type="checkbox" checked="checked"></input>
                            </div>
                            <div>
                                <input type="text" className='input-style small' placeholder='answer 2' onChange={updateAnswer(1)}/>
                                <input type="checkbox" checked="checked"></input>
                            </div>
                            <div>
                                <input type="text" className='input-style small' placeholder='answer 3' onChange={updateAnswer(2)}/>
                                <input type="checkbox" checked="checked"></input>
                            </div>
                            <div>
                                <input type="text" className='input-style small' placeholder='answer 4' onChange={updateAnswer(3)}/>
                                <input type="checkbox" checked="checked"></input>
                            </div>
                        </div>
                        <li onClick={createQuiz} className="button-style login smaller">Add Question</li>
                    </>
                }
                
                    
                
            </div>
        </div>
    </div>
  )
}
