import React from 'react';
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Wishlist from "./Pages/Wishlist/Wishlist";
import Trip from "./Pages/Trip/Trip";
import Profile from "./Pages/Profile/Profile";
import Home from "./Pages/Home/Home";
import Explore from "./Pages/Explore/Explore";
import Footer from "./Components/Footer/Footer";
import TripContent from "./Pages/TripContent/TripContent";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {

    return (
        <>
            <Navbar/>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/TripContent" element={<TripContent/>}/> {/*Need to change to /Trip/:id later on */}
                    <Route path="/Trip" element={<Trip/>}/>
                    <Route path="/Wishlist" element={<Wishlist/>}/>
                    <Route path="/Profile" element={<Profile/>}/>
                    <Route path="/Explore" element={<Explore/>}/>
                </Routes>   
            </div>
            {/* Will change this component */}
            <Footer/>
        </>
    )
}

export default App