import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import QuizComponent from './QuizComponent';

export default function PlayQuizPage() {
  const [quizId, setQuizId] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [gameId, setGameId] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const navigatePath = (path) => navigate(`${path}`);

  // const [allQuizes, setAllQuizes] = useState([]);

  const [searchedQuizes, setSearchedQuizes] = useState([]);

  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    getAllQuizes();
  }, [])

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      searchTerm != "" ? search() : getAllQuizes();
      setLoading(false);
    }, 700);
  }, [searchTerm]);

  async function getAllQuizes(){
    setLoading(true);
    try{
      const response = await fetch("https://localhost:7283/api/Quiz/getQuizzes", {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })

      const data = await response.json();
      setSearchedQuizes(await data)
    }catch(err){
      console.log(err);
      setLoading(false);
    }
    setLoading(false);
  }

  function search () {
    console.log()
    const filt = searchedQuizes.filter(quiz => {
      if(quiz.quizName.includes(searchTerm)){
        return quiz;
      }
    })
    setSearchedQuizes(filt);

    setFiltered(filt);
    console.log(filtered)
  }
  // async function createGame(){
  //   setGameId("");
  //   setLoading(true);
  //   try{
  //     const response = await fetch("https://localhost:7283/api/Quiz/createGame?QuizId="+ quizId.toString(), {
  //       method: 'POST',
  //       headers : {
  //         'Access-Control-Allow-Origin':'*',
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json',
  //         'Authorization': `Bearer ${localStorage.getItem("AccessToken")}`
  //       }
  //     })
  //     const data = await response.json();
  //     setGameId(await data);
  //   }catch(err){
  //     setGameId("noquiz");
  //     console.log(err);
  //     setLoading(false);
  //   }
  //   setLoading(false);
  // }
  
  // function play (){
  //   navigatePath(`/playquiz/${quizId}/${gameId}`);
  // }

  return (
    <div style={{display: "flex", justifyContent: "center", flexDirection: "column", marginTop: "50px"}}>
      <h1>Play Quiz</h1>
      <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
        <div>
          <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
            <div style={{width: "200px"}}>
              <div style={{display: "flex"}}>
                <input type="text" style={{width: "100%"}} className='input-style' placeholder='Enter a search term' onChange={ev => setSearchTerm(ev.target.value)}/>
                {loading &&
                  <div>
                    <div className="loader small"></div>
                  </div>
                }
              </div>
              <div style={{display: "flex", justifyContent: "center", width: "100%", marginTop: "20px", marginBottom: "40px"}}>
                <li className="button-style login" onClick={search}>Search</li>
              </div>
            </div>
          </div>
          <div className='quiz-grid'>
            {searchedQuizes.length > 0 && searchedQuizes.map(quiz => <QuizComponent quizName={quiz.quizName} quizId={quiz.id} />)
    
            }
            
          </div>
          
          {gameId.length > 10 &&
            <>
              <p style={{color: "green"}}>Quiz Found</p>
              {/* <li onClick={play} className="button-style login">Play</li> */}
            </>
          }
          {gameId == "noquiz" &&
            <p style={{color: "red"}}>No Quiz Found</p>
          }
          
        </div>
      </div>
    </div>
  )
}
