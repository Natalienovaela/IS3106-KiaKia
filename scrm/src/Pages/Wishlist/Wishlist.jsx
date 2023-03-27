import React from 'react';
import "./wishlist.css";
import Navbar from "../../Components/Navbar/Navbar";
import HorizontalCard from '../../Components/Card/HorizontalCard';

const Wishlist = () => {
    return (
        <>
            <div className="pageTitle">
                <h1>Wishlist</h1>
            </div>
            
            <div className="firstPart">
                <h2>Trips You Love</h2>

                <div className="list">
                    <HorizontalCard />
                    <HorizontalCard />
                    <HorizontalCard />
                    
                </div> 
            </div>
            
        </>
    )
}

export default Wishlist