import React from 'react';
import "./wishlist.css";
import HorizontalCard from '../../Components/Card/HorizontalCard/HorizontalCard';
import ItineraryCard from '../../Components/Card/ItineraryCard/ItineraryCard';
import img from '../../Assets/img.jpg'
import {MdOutlineEdit} from 'react-icons/md'
import { Button } from '@mui/material';

const Wishlist = () => {
    return (
        <>
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
                        <HorizontalCard />
                        <HorizontalCard />
                        <HorizontalCard />
                        
                    </div> 
                </div>
                <div className="subSec">
                    <div className="subSecTitle">
                        <h3>USA</h3><button className="btn-no"><MdOutlineEdit className="icon"/></button>
                    </div>
                    <div className="list">
                        <HorizontalCard />
                        <HorizontalCard />
                        <HorizontalCard />
                    </div> 
                </div>
                
            </div>

            
            
        </>
    )
}

export default Wishlist