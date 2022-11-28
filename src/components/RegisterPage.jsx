import React, { useEffect, useState } from 'react'

function RegisterPage() {
  const [loginMessage, setLoginMessage] = useState("")
  const [succes, setSucces] = useState(false)

  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const register = async (ev) => {
    ev.preventDefault();
    //register
  
    try{
      const response = await fetch("https://localhost:7283/api/Users/register", {
        method: 'POST',
        headers : {
          'Access-Control-Allow-Origin':'*',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body : JSON.stringify( {
          username: username,
          email: email,
          password: password
        })
      })
      

      console.log(response);
      setSucces(true)
      setLoginMessage("Succes")

    }catch (err){
      console.log(err)
      setSucces(false)
      setLoginMessage(err.toString())
    }

    setUserName("");
    setEmail("");
    setPassword("");
  }

  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      <div style={{width: "500px", height: "500px", background: "#DEECFC", boxShadow: "0px 2px 2px 1px rgba(0, 0, 0, 0.2)"}}> 
        <h1>Register</h1>
        <div style={{width: "100%", display: "flex", justifyContent: "center", height: "300px", alignItems: "center"}}>  
          <div style={{display: "flex", flexDirection: "column", width: "fit-content", gap: "40px"}}>  
            <input value={username} type="text" className='input-style' placeholder='User name' onChange={ev => setUserName(ev.target.value)}/>
            <input value={email} type="text" className='input-style' placeholder='Email adress' onChange={ev => setEmail(ev.target.value)}/>
            <input value={password} type="password" className='input-style' placeholder='Password' onChange={ev => setPassword(ev.target.value)}/>
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