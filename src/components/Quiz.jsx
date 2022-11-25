import React, { useState } from 'react'

export default function Quiz({id}) {
  //Get all quiz data from id^


  return (
    <div style={{width: "100%"}}>
        <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
            <h1>{title}</h1>
            
            <div style={{background: "gray", width: "500px", height: "500px"}}>
              <p> Question x {activeQuestion}</p>

            </div>
        </div>
    </div>
  )
}
