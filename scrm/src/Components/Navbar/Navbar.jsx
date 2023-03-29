import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useMatch, useResolvedPath } from 'react-router-dom';
import './navbar.css'
import { MdOutlineTravelExplore } from 'react-icons/md'
import { AiFillCloseCircle } from 'react-icons/ai'
import { TbGridDots } from 'react-icons/tb'

function Navbar() {

  const [active, setActive] = useState('navBar')
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
                <Link to="/" className="logo flex">
                    <h1> <MdOutlineTravelExplore className="icon"/> KiaKia</h1>
                </Link>
            </div>
          
            <div className={active}>

             <nav>
                <ul className="navLists flex">
                  <li className="navItem">
                    <CustomLink to="/Trip" className="navLink">Trip</CustomLink>
                  </li>

                <li className="navItem">
                  <CustomLink to="/Explore" className="navLink">Explore</CustomLink>
                </li>

                <li className="navItem">
                  <CustomLink to="/Wishlist" className="navLink">Wishlist</CustomLink>
                </li>

                <button className="btn">
                  <CustomLink to="/">Plan A Trip</CustomLink>
                </button>

                {/*need to edit late*/}
                <span className="profile">
                  hello, Natasha
                </span>

              </ul>
            </nav>
         
          <div onClick={closeNav} className="closeNavbar">
            <AiFillCloseCircle className="icon" />
          </div>

        </div>
        <div onClick={showNav} className="toggleNavbar">
          <TbGridDots className="icon" />
        </div>


      </header>

    </section>
  )
}

export default Navbar;

function CustomLink({ to, children, ...props}) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({path: resolvedPath.pathname, end: true})

  return (
   <li className={isActive ? "active" : ""}>
    <Link to={to} {...props}>
      {children}
    </Link>
   </li> 
  )
}