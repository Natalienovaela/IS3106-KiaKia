import React, { useEffect, useState } from 'react';
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
import PlacesContent from "./Pages/PlacesContent/PlacesContent";
import PublicLanding from "./Pages/PublicLanding/PublicLanding";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import CreateTrip from "./Pages/CreateTrip/CreateTrip";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import TripNotes from './Components/TripComponents/TripNotes';
import TripPolls from './Components/TripComponents/TripPolls';
import UploadFile from './Components/TripComponents/UploadFile';
import PollTest from './Components/TripComponents/PollTest';
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import CreatePoll from './Components/TripComponents/CreatePoll';
import Searchresult from "./Pages/SearchResult/Searchresult";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState('');
    const [tripId, setTripId] = useState('');
    const [refreshData, setRefreshData] = useState(false);
    // const [token, setToken] = useToken();

    useEffect(() => {
        // Check if user is logged in on component mount
        const token = sessionStorage.getItem('token');
        if (token) {
            setIsLoggedIn(false);
            sessionStorage.removeItem('token');
        }
    }, []);

    const handleLogin = (userId, token) => {
        setIsLoggedIn(true);
        setUserId(userId);
        sessionStorage.setItem('token', token)
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        sessionStorage.removeItem('token');

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
                    <Route path="/Signup" element={<Signup handleLogin={handleLogin} />} />
                    <Route path="/Login" element={<Login  handleLogin={handleLogin} />} />
                    <Route path="/Explore" element={<Explore userId={userId} />} />
                    <Route path="/SearchResult/:query" element={<Searchresult />} />
                    <Route path="/TripContent/:tripId" element={ <TripContent />}/>

                    <Route path="/Home/:userId" element={isLoggedIn ? <Home /> : <Navigate to="/Login" />} />
                    <Route path="/ResetPassword" element={isLoggedIn ?<ResetPassword userId={userId} /> : <Navigate to="/Login" />} />
                    <Route path="/CreateTrip/:userId" element={isLoggedIn ? <CreateTrip userId={userId} handleTrip={handleTrip} /> : <Navigate to="/Login" />} />
                    <Route path="/TripContent/:userId/:tripId" element={isLoggedIn ? <TripContent /> : <Navigate to="/Login" />} />
                    <Route path="/PlacesContent/:placeId" element={isLoggedIn ? <PlacesContent /> : <Navigate to="/Login" />} />
                    <Route path="/Trip/:userId" element={isLoggedIn ? <Trip userId={userId} /> : <Navigate to="/Login" />} />
                    <Route path="/Wishlist/:userId" element={isLoggedIn ? <Wishlist userId={userId} /> : <Navigate to="/Login" />} />
                    <Route path="/Profile/:userId" element={isLoggedIn ? <Profile userId={userId} handleRefresh={handleRefresh} /> : <Navigate to="/Login" />} />
                    <Route path="/TripNotes" element={isLoggedIn ? <TripNotes /> : <Navigate to="/Login" />} />
                    <Route path="/PollTest" element={isLoggedIn ? <PollTest /> : <Navigate to="/Login" />} />
                    <Route path="/TripPolls" element={isLoggedIn ? <TripPolls /> : <Navigate to="/Login" />} />
                    <Route path="/UploadFile" element={isLoggedIn ? <UploadFile /> : <Navigate to="/Login" />} />
                    <Route path="/CreatePoll" element={isLoggedIn ? <CreatePoll /> : <Navigate to="/Login" />} />
                </Routes>
            </div>
            {/* Will change this component */}
            <Footer />
        </DndProvider >
        </>
    )
}

export default App
