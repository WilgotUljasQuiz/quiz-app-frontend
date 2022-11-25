import React, { useEffect, useState } from 'react'
import QuizComponent from './QuizComponent'

export default function QuizCollection() {
    const [allQuizComponents, setAllQuizComponents] = useState([]);

    useEffect(() => {
        //fetch all quizes components from api
    }, [])
  return (
    <div>
        {allQuizComponents.map(quiz => <QuizComponent id={quiz.id}/>)}
    </div>
  )
}