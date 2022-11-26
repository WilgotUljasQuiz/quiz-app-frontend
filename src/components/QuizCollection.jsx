import React, { useEffect, useState } from 'react'
import QuizComponent from './QuizComponent'

export default function QuizCollection() {
    const [allQuizComponents, setAllQuizComponents] = useState([]);

    useEffect(() => {
        //fetch all quizes components from api
    }, [])
  return (
    <div className='quiz-grid'>
        {allQuizComponents.map(quiz => <QuizComponent id={quiz.id}/>)}
        <QuizComponent />
        <QuizComponent />
        <QuizComponent />
        <QuizComponent />
        <QuizComponent />
        <QuizComponent />
        <QuizComponent />
        <QuizComponent />
        <QuizComponent />
        <QuizComponent />
        <QuizComponent />
        <QuizComponent />
    </div>
  )
}