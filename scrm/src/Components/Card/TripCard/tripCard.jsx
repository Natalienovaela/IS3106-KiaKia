import React from 'react';
import './tripCard.css';


const TripCard = (props) => {
  return (
    <div className="card">
      <div className="imageDiv">
        <img src={props.img} alt="Card" className="card-image" />
      </div>

      <div className="card-content">
            <h2 className="card-title">{props.title}</h2>
            <p className="card-description">{props.description}</p>
        </div>
    </div>
    
  )
}

export default TripCard