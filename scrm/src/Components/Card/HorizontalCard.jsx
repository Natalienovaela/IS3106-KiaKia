import React from 'react'
import image from '../../Assets/img.jpg'
import './horizontalCard.css'

const HorizontalCard = () => {
  return (
    <div className="card">
        <img src={image} alt="Card" className="card-image" />
        <div className="card-content">
            <small>Summer 2023 - 14 days trip</small>
            <h2 className="card-title">Card Title</h2>
            <ul className="places">
              <li className="city">
                  Tokyo
              </li>
              <li className="city">
                  Osaka
              </li>
              <li className="city">
                  Kyoto
              </li>
            </ul>
            <p className="card-description">this is the description</p>
        </div>
    </div>
    
  )
}

export default HorizontalCard