import React from 'react'
import QuizCollection from './QuizCollection';


export default function Home() {
  return (
    <div style={{width: "100%"}}>
        <div className='top-background' style={{width: "100%", padding: 0, margin: 0}}>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div style={{width: "500px", height: "300px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <p className="title">Quiz App</p>
                </div>
                <div style={{ width: "700px", height: "300px", display: "flex", alignItems: "center", gap:"40px"}}>
                    <a className="button-style">Create new Quiz</a>
                    <a href='#quiz-section' className="button-style">Browse existing Quizes</a>
                </div>
            </div>
            
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style={{display: "block"}}>
                <path fill="#EDF4FF" fill-opacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
        </div>
        <div style={{background: "#EDF4FF", height: "1300px", width: "100%", paddingTop: "500px"}}>
            <div style={{height: "50%", width: "100%"}}>
                <div style={{width: "100%", height: "100%"}}>
                    <p id='quiz-section' className='smallTitle'>Popular Quizes:</p>
                    <QuizCollection />
                </div>
            </div>
            <div style={{height: "50%", width: "100%"}}>
                <div style={{width: "100%", height: "100%"}}>
                    <p className='smallTitle'>Trending Quizes:</p>
                </div>
            </div>
        </div>
    </div>
  )
}
