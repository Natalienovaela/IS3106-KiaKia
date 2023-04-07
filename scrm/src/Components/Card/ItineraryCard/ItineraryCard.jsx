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
    img: image,
    places: ["Marina Bay Sands", "Haw Par Villa", "Lau Pa Sat"],
    tags: ["Singapore", "SEA", "Summer"]
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

const ItineraryCard = (props) => {
  const placeHighlight = props.places?.map((place) => <li className="place">{place}</li>);
  
  const tags = props.tags?.map(((tag) => <Chip label={tag}></Chip> ))

 
  return (
    <div className="itinerary-card">

      <div className="itinerary-imageDiv">
        
        <img src={props.img} alt="City" className='itinerary-card-image'/>
    
            <Profile />
            <BookmarkButton/>
          
        <div className="city-div">
          <h2>{props.cityName}</h2>
          <p className='num-of-days'>{props.numOfDays} days</p>
        </div>
      </div>

      <div className="card-details">
        <ul className='place-highlight'>
          {placeHighlight}
        </ul>
        <p className='card-desc'>{props.desc}</p>
        <div className="tags">
            {tags}
        </div>
      </div>
      
    </div>
    
  )
}

export default ItineraryCard