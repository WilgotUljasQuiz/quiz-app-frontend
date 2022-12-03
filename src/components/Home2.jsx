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
                                <h1 className='bigTitle'>Quiz App</h1>
                                <p className='underText'>Create and play Quizes</p>
                            </div>
                        </div>
                        <div style={{display:"flex", justifyContent: "center", gap: "50px"}}>
                            <div>
                                <AiOutlineSearch onClick={() => navigatePath("/playquizpage")} className="icon"  onMouseEnter={() => setSearchHovering(true)} onMouseLeave={() => setSearchHovering(false)}/>
                                <div style={{width: "100px"}}>  
                                    {searchHovering &&
                                        <p style={{color: "white", transition: "0.2s"}}>Search Quizes</p>
                                    } 
                                </div>
                            </div>
                            <div >
                                <IoIosAddCircle onClick={() => navigatePath("/createquiz")} className="icon" onMouseEnter={() => setCreateHovering(true)} onMouseLeave={() => setCreateHovering(false)} />
                                <div style={{width: "100px"}}> 
                                    {createHovering &&
                                        <p style={{color: "white", transition: "0.2s"}}>Create Quizes</p> 
                                    }
                                </div>
                            </div>
                        </div>
                        {/* <div style={{width: "160px"}}>
                            <li className="buttonStyle2">Click</li>
                        </div> */}
                        {/* <div className='hiddenCard'>

                        </div> */}
                        
                        {/* <div className='middleBar'>

                         </div> */}
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
                            {/* <svg className='arrow' width="80px" height="80px" version="1.1" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg">
                                <g>
                                    <path d="m350 507.5c-125.45 0-227.5-102.05-227.5-227.5s102.05-227.5 227.5-227.5 227.5 102.05 227.5 227.5-102.05 227.5-227.5 227.5zm0-420c-106.14 0-192.5 86.355-192.5 192.5s86.355 192.5 192.5 192.5 192.5-86.355 192.5-192.5-86.355-192.5-192.5-192.5z" />
                                    <path d="m412.82 290.32c-4.4766 0-8.957-1.7109-12.375-5.1289l-50.449-50.449-50.449 50.449c-6.8359 6.8359-17.91 6.8359-24.746 0-6.8359-6.8359-6.8359-17.91 0-24.746l62.824-62.824c6.8359-6.8359 17.91-6.8359 24.746 0l62.824 62.824c6.8359 6.8359 6.8359 17.91 0 24.746-3.4219 3.418-7.8984 5.1289-12.375 5.1289z" />
                                    <path d="m350 367.5c-9.6641 0-17.5-7.8359-17.5-17.5v-140c0-9.6641 7.8359-17.5 17.5-17.5s17.5 7.8359 17.5 17.5v140c0 9.6641-7.8359 17.5-17.5 17.5z" />
                                </g>
                            </svg> */}
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
