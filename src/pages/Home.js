import React from 'react'
import { useNavigate } from 'react-router-dom';  

export default function Home() {

  const navigate = useNavigate();

  const handleClick = ()=>{
    navigate('/form')
  }

  return (
    <div class="css-card" onClick={handleClick} Link>
      Create Form
    </div>
  )
}
