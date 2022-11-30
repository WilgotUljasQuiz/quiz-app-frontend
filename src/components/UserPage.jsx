import React, { useState } from 'react'
import QuizCollection from './QuizCollection';
import { useEffect } from 'react';
import QuizComponent from './QuizComponent';
export default function UserPage() {
    const [userName, setUserName] = useState("Wilgot");
    const [allQuizComponents, setAllQuizComponents] = useState([]);

    useEffect(() => {
      fetchMyQuizComponents();
    }, [])
  
    async function fetchMyQuizComponents(){
      try {
        const response = await fetch("https://localhost:7283/api/Quiz/getMyQuizzes", {
          method: 'GET',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("AccessToken")}`
          }
        })
  
        const data = await response.json();
        if (response.status === 200) {
          console.log(data);
          setAllQuizComponents(data);
        } else {
          alert(data);
        }
  
      } catch (err) {
        console.log(err.toString())
      }
    }


  return (
    <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
      <div style={{width: "80%", height: "fit-content", background: "#DEECFC", boxShadow: "0px 2px 2px 1px rgba(0, 0, 0, 0.2)", padding: "50px"}}>
        <div style={{display: "flex", flexDirection: "column"}}>
          <div style={{display: "flex", width: "100%"}}>  
            <div style={{width: "350px", height: "350px", background: "orange", display: "flex", justifyContent: "center", alignItems: "center"}}>
              <h1>Uername</h1>
            </div>
            <div style={{width: "1000px", display: "flex", justifyContent: "left", paddingLeft: "20px"}}>
              <div>
                <p className='description-text underline'><b>Joined:</b> 18 months ago</p>
                <p className='description-text underline'><b>Quizes:</b> 7</p>
                <p className='description-text underline'><b>Rank:</b> PRO</p>
              </div>
            </div>
          </div>
          <div>
            <h1>Quizes:</h1>
            <div style={{width:"100%", display:"flex"}}>
            {allQuizComponents.map(quiz => <div style={{width:"200px"}}><QuizComponent quizName = {quiz.quizName} /></div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
