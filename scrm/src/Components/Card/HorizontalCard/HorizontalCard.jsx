import React from 'react'
import image from '../../../Assets/img.jpg'
import './horizontalCard.css'

const HorizontalCard = () => {
  return (
    <div className="card">
      <div className="imageDiv">
        <img src={image} alt="Card" className="card-image" />
      </div>
        
        <div className="card-content">
            <small className="tripTag">Summer 2023 - 14 days trip</small>
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
            <p className="card-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus a, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
        </div>
    </div>
    
  )
}

export default HorizontalCard