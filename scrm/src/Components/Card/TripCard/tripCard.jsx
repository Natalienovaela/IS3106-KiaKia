import React from 'react';
import './tripCard.css';


const TripCard = (props) => {
  const tripList = props.trips?.map((trip) => (<li className="trip">{trip}</li>))
  return (
    <div className="card">
      <div className="imageDiv">
        <img src={props.img} alt="Card" className="card-image" />
        <ul className="places">{tripList}</ul>
      </div>
    </div>
    
  )
}

export default TripCard