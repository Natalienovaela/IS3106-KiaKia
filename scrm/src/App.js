import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
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
import TripNotes from './Components/TripComponents/TripNotes';
import TripPolls from './Components/TripComponents/TripPolls';
import UploadFile from './Components/TripComponents/UploadFile';
import PollTest from './Components/TripComponents/PollTest';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState('');
    const [tripId, setTripId] = useState('');
    const [refreshData, setRefreshData] = useState(false);

    const handleLogin = (userId) => {
        setIsLoggedIn(true);
        setUserId(userId);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    const handleRefresh = () => {
        setRefreshData(!refreshData);
    };

    const handleTrip = (tripId) => {
        setTripId(tripId);
    }

    return (
        <>  <DndProvider backend={HTML5Backend}>
            <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} userId={userId} refreshData={refreshData} />
            <div className="container">
                <Routes>
                    <Route path="/" element={<PublicLanding />} />
                    <Route path="/Home/:userId" element={<Home />} />
                    <Route path="/Signup" element={<Signup handleLogin={handleLogin} />} />
                    <Route path="/Login" element={<Login handleLogin={handleLogin} />} />
                    <Route path="/CreateTrip/:userId" element={<CreateTrip userId={userId} handleTrip={handleTrip}/>} />
                    <Route path="/TripContent" element={<TripContent userId={userId} tripId={tripId} />} /> {/*Need to change to /Trip/:id later on */}
                    <Route path="/Trip" element={<Trip />} />
                    <Route path="/Wishlist/:userId" element={<Wishlist userId={userId}/>} />
                    <Route path="/Profile/:userId" element={<Profile userId={userId} handleRefresh={handleRefresh}/>} />
                    <Route path="/Explore" element={<Explore userId={userId}/>} />
                    <Route path="/TripNotes" element={<TripNotes />} />
                    <Route path="/PollTest" element={<PollTest />} />
                    <Route path="/TripPolls" element={<TripPolls />} />
                    <Route path="/UploadFile" element={<UploadFile />} />
                </Routes>
            </div>
            {/* Will change this component */}
            <Footer />
        </DndProvider>
        </>
    )
}

export default App
