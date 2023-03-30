import React from 'react';
import "./wishlist.css";
import HorizontalCard from '../../Components/Card/HorizontalCard/HorizontalCard';
import ItineraryCard from '../../Components/Card/ItineraryCard/ItineraryCard';
import image from '../../Assets/img.jpg'
import {MdOutlineEdit} from 'react-icons/md'
import { Button } from '@mui/material';

const dummyData = [
    {
      img: image,
      tripTag: 'Summer 2023 - 14 days trip',
      cardTitle: 'Japan',
      places: ["Tokyo", "Osaka", "Kyoto"],
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus a, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.'
    },
    {
      img: image,
      tripTag: 'Winter 2023 - 14 days trip',
      cardTitle: 'East Coast',
      places: ["New York", "Bronx", "Washington D.C."],
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus a, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.'
    },
    {
        img: image,
        tripTag: 'Winter 2023 - 14 days trip',
        cardTitle: 'East Coast',
        places: ["New York", "Bronx", "Washington D.C."],
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus a, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.'
      },
      {
        img: image,
        tripTag: 'Winter 2023 - 14 days trip',
        cardTitle: 'East Coast',
        places: ["New York", "Bronx", "Washington D.C."],
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus a, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.'
      },
  ]
const Wishlist = () => {
    const horizontalCards = dummyData?.map((cardData) => (
        <HorizontalCard 
            key={cardData.key}
            img={cardData.img}
            tripTag={cardData.tripTag}
            cardTitle={cardData.cardTitle}
            places={cardData.places}
            description={cardData.description}/>
    ));
    
    return (
        <>
        <div className="container">
        <div className="pageTitle">
                <h1>Wishlist</h1>
            </div>
            
            <div className="sec">
                <div className="secTitle">
                    <h2>Trips You Love</h2>
                </div>
                <div className="subSec">
                    <div className="subSecTitle">
                        <h3>Summer 2023</h3><button className="btn-no"><MdOutlineEdit className="icon"/></button>
                    </div>
                    <div className="list">                        
                        {horizontalCards}
                    </div> 
                </div>
                <div className="subSec">
                    <div className="subSecTitle">
                        <h3>USA</h3><button className="btn-no"><MdOutlineEdit className="icon"/></button>
                    </div>
                    <div className="list">
                        {horizontalCards}
                    </div> 
                </div>
                
            </div>

            
            
        </div>
           
        </>
    )
}

export default Wishlist