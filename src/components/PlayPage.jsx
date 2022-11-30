import React from 'react'
import { useParams } from 'react-router-dom'

function PlayPage() {
    const params = useParams();
    console.log(params);
  return (
    <div>
        <h1>{params}</h1>
    </div>
  )
}

export default PlayPage