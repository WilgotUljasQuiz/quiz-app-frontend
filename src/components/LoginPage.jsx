import React, { useState } from 'react'


function LoginPage() {
  const [loginMessage, setLoginMessage] = useState("")
  const [succes, setSucces] = useState(false)

  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const login = async (ev) => {
    ev.preventDefault();

    try{
      const response = await fetch("https://localhost:7283/api/Users/login", {
        method: 'POST',
        headers : {
          'mode':'no-cors',
          'Access-Control-Allow-Origin':'*',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body : JSON.stringify( {
          username: username,
          password: password
        })
      })

      const data = await response.json();
      if(response.status === 200)
      {
        console.log(data);
        localStorage.setItem("AccessToken", data);
      }else{
        alert(data)
      }

      setSucces(true)
      setLoginMessage("Succes")

    }catch (err){
      console.log(err)
      setSucces(false)
      setLoginMessage(err.toString())
    }

    
    setUserName("");
    setPassword("");
  }

  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      <div style={{width: "500px", height: "500px", background: "#DEECFC", boxShadow: "0px 2px 2px 1px rgba(0, 0, 0, 0.2)"}}> 
        <h1>Login</h1>
        <div style={{width: "100%", display: "flex", justifyContent: "center", height: "300px", alignItems: "center"}}>  
          <div style={{display: "flex", flexDirection: "column", width: "fit-content", gap: "40px"}}>  
            <input value={username} type="text" className='input-style' placeholder='User name' onChange={ev => setUserName(ev.target.value)}/>
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