import React, { useEffect, useState } from 'react'

function RegisterPage() {
  const [loginMessage, setLoginMessage] = useState("")
  const [succes, setSucces] = useState(false)

  const register = ev => {
    ev.preventDefault();
    //register

    //if succesful
    setSucces(true)
    setLoginMessage("Succes")

    //else
    // setSucces(false)
    // setLoginMessage("Error")
  }

  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      <div style={{width: "500px", height: "500px", background: "#DEECFC", boxShadow: "0px 2px 2px 1px rgba(0, 0, 0, 0.2)"}}> 
        <h1>Register</h1>
        <div style={{width: "100%", display: "flex", justifyContent: "center", height: "300px", alignItems: "center"}}>  
          <div style={{display: "flex", flexDirection: "column", width: "fit-content", gap: "40px"}}>  
            <input type="text" className='input-style' placeholder='User name'/>
            <input type="text" className='input-style' placeholder='Email adress'/>
            <input type="text" className='input-style' placeholder='Password'/>
            <div>
              <li onClick={register} className="button-style login smaller">Register</li>
            </div>
            {loginMessage != "" &&
              <p style={{color: succes ? "green" : "red"}}>{loginMessage}</p>
            }
          </div>
          
        </div>        
      </div>
      
    </div>
  )
}

export default RegisterPage