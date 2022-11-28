import React, { useState } from 'react'


function LoginPage() {
  const [loginMessage, setLoginMessage] = useState("")
  const [succes, setSucces] = useState(false)

  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const login = async (ev) => {
    ev.preventDefault();

    try{
      const response = await fetch("http://localhost:7283/api/Users/register", {
        method: 'POST',
        headers : {
          'Content-Type': 'application/json',
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

    
    setEmail("");
    setPassword("");
  }

  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      <div style={{width: "500px", height: "500px", background: "#DEECFC", boxShadow: "0px 2px 2px 1px rgba(0, 0, 0, 0.2)"}}> 
        <h1>Login</h1>
        <div style={{width: "100%", display: "flex", justifyContent: "center", height: "300px", alignItems: "center"}}>  
          <div style={{display: "flex", flexDirection: "column", width: "fit-content", gap: "40px"}}>  
            <input value={email} type="text" className='input-style' placeholder='Email adress' onChange={ev => setEmail(ev.target.value)}/>
            <input value={password} type="password" className='input-style' placeholder='Password' onChange={ev => setPassword(ev.target.value)}/>
            <div>
              <li onClick={login} className="button-style login smaller">Login</li>
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

export default LoginPage