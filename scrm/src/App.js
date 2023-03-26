import React from 'react';
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Main from "./Components/Main/Main";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import HorizontalCard from './Components/Card/HorizontalCard';

const App = () => {
    return (
        <>
            <Navbar/>
            <HorizontalCard />
            <HorizontalCard />
            <HorizontalCard />
        </>
    )
}

export default App