import React, { useState } from 'react'
import './itinerarycard.css'
import image from '../../../Assets/img.jpg'
import Chip from '@mui/material/Chip'
import Profile from '../../Profile/Profile'
import Icon from '@mui/material/Icon'
import IconButton from '@mui/material/IconButton'
import {FaRegBookmark, FaBookmark} from 'react-icons/fa'

const dummyData = [
  {
    places: ["Marina Bay Sands", "Haw Par Villa", "Lau Pa Sat"],
  }
  
]

function BookmarkButton() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <IconButton 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="bookmark-button">
        {isHovered ? <FaRegBookmark /> : <FaBookmark/>}
    </IconButton>
  )
}

const ItineraryCard = () => {
  const placeHighlight = dummyData.map((data) =>
  data.places?.map((place) => <li className="place">{place}</li>)
);

 
  return (
    <div className="itinerary-card">

      <div className="itinerary-imageDiv">
        
        <img src={image} alt="City" className='itinerary-card-image'/>
    
            <Profile />
            <BookmarkButton/>
          
        <div className="city-div">
          <h2>Singapore</h2>
          <p className='num-of-days'>5 days</p>
        </div>
      </div>

      <div className="card-details">
        <ul className='place-highlight'>
          {placeHighlight}
        </ul>
        <p className='card-desc'>Must visit restaurants in Singapore</p>
        <div className="tags">
            <Chip label="#Singapore"/>
            <Chip label="#SEA"/>
            <Chip label="#Summer"/>
        </div>
      </div>
      
    </div>
    
  )
}

export default ItineraryCard