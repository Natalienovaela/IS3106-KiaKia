import React from 'react'
import ItineraryCard from "../../Components/Card/ItineraryCard/ItineraryCard"
import image from '../../Assets/img.jpg'

const cardData = [
  {
    img: image,
    city: 'Singapore',
    days: 5,
    places: ["Marina Bay Sands", "Haw Par Villa", "Lau Pa Sat"],
    description: 'Must visit restaurants in Singapore',
    tags: ["Singapore", "SEA", "Summer"]
  }
]
const Explore = () => {
  return (
    <>
      <div>Explore</div>
      <ItineraryCard
        
        img={cardData.img}
        tripTag={cardData.tags}
        cardTitle={cardData.city}
        places={cardData.places}
        description={cardData.description}/>
      
    </>
    
  )
}

export default Explore