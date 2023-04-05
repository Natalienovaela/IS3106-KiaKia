import React from 'react'
import image from '../../../Assets/img.jpg'


const ItineraryCard = (props) => {
  const cityList = props.places?.map((city) => (<li className="city">{city}</li>))
  return (
    <div className="card">
      <div className="imageDiv">
        <img src={props.img} alt="Card" className="card-image" />
      </div>
        
        <div className="card-content">
            <small className="tripTag">{props.tripTag}</small>
            <h2 className="card-title">{props.cardTitle}</h2>
            <ul className="places">{cityList}</ul>
            <p className="card-description">{props.description}</p>
        </div>
    </div>
    
  )
}

export default ItineraryCard