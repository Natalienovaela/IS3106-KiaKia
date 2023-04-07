import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useMatch, useResolvedPath, useNavigate } from 'react-router-dom';
import './navbar.css'
import { MdOutlineTravelExplore } from 'react-icons/md'
import { AccountCircle } from '@mui/icons-material';
import { AiFillCloseCircle } from 'react-icons/ai'
import { TbGridDots } from 'react-icons/tb'

function Navbar({ isLoggedIn, handleLogout }) {
  const [active, setActive] = useState('navBar')
  const navigate = useNavigate();

  //function to toggle bar
  const showNav = () => {
    setActive('navBar activeNavbar')
  }

  //function to close bar
  const closeNav = () => {
    setActive('navBar');
  }

  const handleLogoutClick = () => {
    handleLogout(false);
    navigate('/');
  }

  return (
    <section className='navBarSection'>
      <header className="header flex">

        <div className="logoDiv">
          <Link to="/" className="logo flex">
            <h1> <MdOutlineTravelExplore className="icon" /> KiaKia</h1>
          </Link>
        </div>

        {isLoggedIn ? (
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
                  <CustomLink to="/CreateTrip">Plan A Trip</CustomLink>
                </button>

                <span className="user">
                  Hello, Natasha!
                </span>

                <li className="profile">
                  <Link to="/Profile" className="logo flex">
                    <AccountCircle className="icon" fontSize="large" />
                  </Link>
                </li>

                <button onClick={handleLogoutClick}>Log out</button>
              </ul>
            </nav>

            <div onClick={closeNav} className="closeNavbar">
              <AiFillCloseCircle className="icon" />
            </div>

          </div>
        ) : (
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
                  <CustomLink to="/Login" className="navLink">Log in</CustomLink>
                </li>

                <li className="navItem">
                  <CustomLink to="/Signup" className="navLink">Sign up</CustomLink>
                </li>
              </ul>
            </nav>

            <div onClick={closeNav} className="closeNavbar">
              <AiFillCloseCircle className="icon" />
            </div>

          </div>
        )}

        <div onClick={showNav} className="toggleNavbar">
          <TbGridDots className="icon" />
        </div>

      </header>
    </section>
  )
}


export default Navbar;

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <div className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </div>
  )
}