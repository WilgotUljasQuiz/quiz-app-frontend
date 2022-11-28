import React, { useState } from 'react'
import QuizCollection from './QuizCollection';

export default function UserPage() {
    const [userName, setUserName] = useState("Wilgot");

  return (
    <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
      <div style={{width: "80%", height: "fit-content", background: "#DEECFC", boxShadow: "0px 2px 2px 1px rgba(0, 0, 0, 0.2)", padding: "50px"}}>
        <div style={{display: "flex", flexDirection: "column"}}>
          <div style={{display: "flex", width: "100%"}}>  
            <div style={{width: "350px", height: "350px", background: "orange", display: "flex", justifyContent: "center", alignItems: "center"}}>
              <h1>{userName}{localStorage.getItem("AccessToken")}</h1>
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
            <QuizCollection />
          </div>
        </div>
      </div>
    </div>
  )
}
