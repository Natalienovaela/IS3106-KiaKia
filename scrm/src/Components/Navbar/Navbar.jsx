import React, {useState} from 'react'
import './navbar.css'
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
             
                <ul className="navLists flex">
                  <li className="navItem">
                    <a href="#" className="navLink">Trip</a>
                  </li>

                  <li className="navItem">
                    <a href="#" className="navLink">Explore</a>
                  </li>

                  <li className="navItem">
                    <a href="#" className="navLink">Wishlist</a>
                  </li>

                  <button className="btn">
                    <a href="#">Plan A Trip</a>
                  </button>

                  {/*need to edit late*/}
                  <span className="profile">
                    hello, Natasha
                  </span>

                  
                </ul>

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