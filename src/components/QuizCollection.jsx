import React, { useEffect, useState } from 'react'
import QuizComponent from './QuizComponent'

export default function QuizCollection() {
  const [allQuizComponents, setAllQuizComponents] = useState([]);

  useEffect(() => {
    fetchQuizComponents();
  }, [])

  async function fetchQuizComponents(){
    try {
      const response = await fetch("https://localhost:7283/api/Quiz/getQuizzes", {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })

      const data = await response.json();
      if (response.status === 200) {
        setAllQuizComponents(data);
      } else {
        alert(data);
      }

    } catch (err) {
      console.log(err.toString())
    }
  }

  return (
    <div className='quiz-grid'>
      {allQuizComponents.map(quiz => <QuizComponent quizName={quiz.quizName} />)}
    </div>
  )
}