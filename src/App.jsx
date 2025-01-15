import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useNavigate } from 'react-router-dom'

function App() {


  const questions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

  const navigate = useNavigate();

  const handleClick = (qid) => {
    console.log("Something was clicked");

    navigate(`/q${qid}`);
  }

  return (
    <>
     <div className='page'>

    
    {questions.map((q, index) => (
      <div onClick={() => handleClick(q)} className='question-box' key={`q-${q}`}>{index + 1}</div>)
    )}

     </div>

    </>
  )
}

export default App
