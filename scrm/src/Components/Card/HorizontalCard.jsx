import React from 'react'
import image from '../../Assets/img.jpg'
import './horizontalCard.css'

const HorizontalCard = () => {
  return (
    <div className="card">
        <img src={image} alt="Card" className="card-image" />
        <div className="card-content">
            <h2 className="card-title">Card Title</h2>
            <p className="card-description">this is the description</p>
        </div>
    </div>
    
  )
}

export default HorizontalCard