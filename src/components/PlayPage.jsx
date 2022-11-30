import React from 'react'
import {BrowserRouter as Router, Routes, Route, Link, useParams} from 'react-router-dom';

function PlayPage() {
    const params = useParams();
    console.log(params.gameId);
  return (
    <div>
        <h1 className='regularTitle'>Playing quiz <u>{params.gameId}</u> </h1>
    </div>
  )
}

export default PlayPage