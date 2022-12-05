import React, { useRef, useState } from 'react'
import QuizCollection from './QuizCollection';
import { useNavigate } from 'react-router-dom';
import QuizComponent from './QuizComponent';

import {IoIosAddCircle} from 'react-icons/io'
import{AiOutlineSearch} from 'react-icons/ai'
import {BsArrowDownCircle} from 'react-icons/bs'

export default function Home2() {
    const popularQuizSection = useRef(null)

    const [searchHovering, setSearchHovering] = useState(false);
    const [createHovering, setCreateHovering] = useState(false);

    const navigate = useNavigate();
    const navigatePath = (path) => navigate(`${path}`);

    const scrollToSection = (elementRef) => {
        window.scrollTo({
            top: elementRef.current.offsetTop,
            behavior: 'smooth'
        })
        console.log("hre");
    }


    const checkIfLoggedIn = () => {
        if(localStorage.getItem("AccessToken") != ""){
            return true;
        }else{
            return false;
        }
    }

    return (
        <div style={{ width: "100%" }}>
            <div className='top-background2' style={{ width: "100%", padding: 0, margin: 0 }}>
                <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                    <div style={{ position: "relative", width: "fit-content", height: "500px",}}>
                        {/* <QuizComponent />
                        <QuizComponent />
                        <QuizComponent /> */}
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "500px"}}>
                            <div>
                                <h1 className='bigTitle'>Pi-Quiz</h1>
                                <p className='underText'>Create and play Quizes</p>
                            </div>
                        </div>
                        <div style={{display:"flex", justifyContent: "center", gap: "50px"}}>
                            <div>
                                <AiOutlineSearch onClick={() => checkIfLoggedIn() ? navigatePath("/playquizpage") : navigatePath("/login")} className="icon"  onMouseEnter={() => setSearchHovering(true)} onMouseLeave={() => setSearchHovering(false)}/>
                                <div style={{width: "100px"}}>  
                                    {searchHovering &&
                                        <p style={{color: "white", transition: "0.2s"}}>Search Quizes</p>
                                    } 
                                </div>
                            </div>
                            <div >
                                <IoIosAddCircle onClick={() => checkIfLoggedIn() ? navigatePath("/createquiz") : navigatePath("/login")} className="icon" onMouseEnter={() => setCreateHovering(true)} onMouseLeave={() => setCreateHovering(false)} />
                                <div style={{width: "100px"}}> 
                                    {createHovering &&
                                        <p style={{color: "white", transition: "0.2s"}}>Create Quizes</p> 
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style={{ display: "block" }}>
                    <path fill="#EDF4FF" fill-opacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>
                <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                    <div style={{}}>
                        <li onClick={() => scrollToSection(popularQuizSection)} className="button-style home">Browse Quizes</li>
                        <div>
                            <BsArrowDownCircle style={{width: "55px", height: "55px"}} />
                        </div>
                    </div>
                </div>
            
            <div style={{ background: "#EDF4FF", height: "1300px", width: "100%", paddingTop: "500px" }}>
                <div style={{ width: "100%" }}>
                    <div ref={popularQuizSection} style={{ width: "100%", height: "fit-content" }}>
                        <p id='quiz-section' className='smallTitle'>Popular Quizes:</p>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <QuizCollection />
                        </div>
                    </div>
                </div>
                <div style={{ height: "50%", width: "100%" }}>
                    <div style={{ width: "100%", height: "100%" }}>
                        <p className='smallTitle'>Trending Quizes:</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
