import React, { useState } from 'react';
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Wishlist from "./Pages/Wishlist/Wishlist";
import Trip from "./Pages/Trip/Trip";
import Profile from "./Pages/Profile/Profile";
import Home from "./Pages/Home/Home";
import Explore from "./Pages/Explore/Explore";
import Footer from "./Components/Footer/Footer";
import TripContent from "./Pages/TripContent/TripContent";
import PublicLanding from "./Pages/PublicLanding/PublicLanding";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import CreateTrip from "./Pages/CreateTrip/CreateTrip";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TripNotesTest from './Components/TripComponents/TripNotesTest';
import TripNotes from './Components/TripComponents/TripNotes';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <>
            <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            <div className="container">
                <Routes>
                    <Route path="/" element={<PublicLanding />} />
                    <Route path="/Home/:userId" element={<Home />} />
                    <Route path="/Signup" element={<Signup handleLogin={handleLogin} />} />
                    <Route path="/Login" element={<Login handleLogin={handleLogin} />} />
                    <Route path="/CreateTrip" element={<CreateTrip />} />
                    <Route path="/TripContent" element={<TripContent />} /> {/*Need to change to /Trip/:id later on */}
                    <Route path="/Trip" element={<Trip />} />
                    <Route path="/Wishlist" element={<Wishlist />} />
                    <Route path="/Profile" element={<Profile />} />
                    <Route path="/Explore" element={<Explore />} />
                    <Route path="/TripNotes" element={<TripNotes />} />
                </Routes>
            </div>
            {/* Will change this component */}
            <Footer />
        </>
    )
}

export default App
