import React, { useEffect, useState } from 'react'
import QuizComponent from './QuizComponent';

export default function PlayQuizPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchedQuizes, setSearchedQuizes] = useState([]);

  const [allQuizes, setAllQuizes] = useState([]);

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
      setAllQuizes(await data)
    }catch(err){
      console.log(err);
      setLoading(false);
    }
    setLoading(false);
  }

  function search () {
    const filt = allQuizes.filter(quiz => {
      const name = quiz.quizName.toLowerCase();
      if(name.includes(searchTerm.toLowerCase())){
        return quiz;
      }
    })
    setSearchedQuizes(filt);
  }

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
        </div>
      </div>
    </div>
  )
}
