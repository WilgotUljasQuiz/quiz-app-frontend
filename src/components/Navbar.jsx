import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [loggedIn, setLoggedIn] = useState(true);

    const navigate = useNavigate();
    const navigatePath = (path) => navigate(`/${path}`);

    useEffect(() => {
        //see if user is logged in
        //then => setLoggedIn(true)
    }, [])
  return (
    <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <div style={{width: "90%", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <h1 onClick={() => navigatePath("/")} style={{userSelect: "none", cursor: "pointer"}}>Quiz App</h1>
            <div style={{display: "flex", gap: "20px"}}>
                {!loggedIn ?
                    <>
                        <div>
                            <li onClick={() => navigatePath("login")} className="button-style login">Login</li>
                        </div>
                        <div>
                            <li onClick={() => navigatePath("register")} className="button-style login register" style={{background: "7094FF"}}>Register</li>
                        </div>
                    </>
                    : <>
                        <div>
                            <li onClick={() => navigatePath("user")} className="button-style login">My Profile</li>
                        </div>
                    </>
                }
            </div>
        </div>
        
    </div>
  )
}
