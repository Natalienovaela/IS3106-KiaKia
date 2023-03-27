import React, {useState} from 'react'
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import './navbar.css'
import Wishlist from '../../Pages/Wishlist/Wishlist'
import { MdOutlineTravelExplore } from 'react-icons/md'
import { AiFillCloseCircle} from 'react-icons/ai'
import { TbGridDots } from 'react-icons/tb'

const Navbar = () => {
  const [active, setActive]= useState('navBar')
  // function to toggle navbar
  const showNav = () => {
    setActive('navBar activeNavbar')
  }

  // function to close navbar
  const closeNav = () => {
    setActive('navBar');
  }

  return (
    <section className='navBarSection'>
        <header className="header flex">
          
            <div className="logoDiv">
                <a href="#" className="logo flex">
                    <h1> <MdOutlineTravelExplore className="iicon"/> KiaKia</h1>
                </a>
            </div>
          
            <div className={active}>
            <Router>
             <nav>
                <ul className="navLists flex">
                  <li className="navItem">
                    <Link to="/" className="navLink">Trip</Link>
                  </li>

                  <li className="navItem">
                    <Link to="/" className="navLink">Explore</Link>
                  </li>

                  <li className="navItem">
                    <Link to="/Wishlist" className="navLink">Wishlist</Link>
                  </li>

                  <button className="btn">
                    <Link to="/">Plan A Trip</Link>
                  </button>

                  {/*need to edit late*/}
                  <span className="profile">
                    hello, Natasha
                  </span>

                </ul>
                </nav>
                  <Routes>
                    <Route path="/Wishlist" component={Wishlist} />
                  </Routes>
                </Router>
              <div onClick={closeNav} className="closeNavbar">
                <AiFillCloseCircle className="icon"/>
              </div>

            </div>

           

            <div onClick={showNav} className="toggleNavbar">
              <TbGridDots className="icon"/>
            </div>
            

        </header>

    </section>
  )
}

export default Navbar