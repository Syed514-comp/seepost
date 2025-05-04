import React from "react";
import './Card.css'



const Card = ({id, text, onDelete, background}) => {
  return (
    <div className="card" style={{background}}>
        

        <p>{text}</p>
        <button className="close-btn" onClick={()=> onDelete(id)}><p id="close-symbol">X</p></button>
      
    </div>
  )
}

export default Card
