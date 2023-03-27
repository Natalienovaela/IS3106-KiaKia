import React from 'react';
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Wishlist from "./Pages/Wishlist/Wishlist";
import Trip from "./Pages/Trip/Trip";
import Profile from "./Pages/Profile/Profile";


const App = () => {
    
    let page
    switch(window.location.pathname) {
        case "/":
            page = <Wishlist/>;
            break
        case "/Trip":
            page = <Trip/>;
            break;
        case "/Wishlist":
            page = <Wishlist/>;
            break;
        case "/Profile":
            page = <Profile/>;
            break
        default: 
            page = <Wishlist/>
    }
    
    return (
        <>
            <Navbar/>
            {page}
        </>
    )
}

export default App