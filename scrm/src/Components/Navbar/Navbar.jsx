import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useMatch,
  useResolvedPath,
  useNavigate,
} from "react-router-dom";
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Avatar } from "@mui/material";
import "./navbar.css";
import { MdOutlineTravelExplore } from "react-icons/md";
import { AccountBox, Key, Logout } from "@mui/icons-material";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import PropTypes from "prop-types";
import Api from "../../Helpers/Api";

function Navbar({ isLoggedIn, handleLogout, userId, refreshData }) {
  const [active, setActive] = useState("navBar");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const[firstLetter, setFirstLetter] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //function to toggle bar
  const showNav = () => {
    setActive("navBar activeNavbar");
  };

  //function to close bar
  const closeNav = () => {
    setActive("navBar");
  };

  const handleLogoutClick = () => {
    handleLogout(false);
    navigate("/");
  };

  useEffect(() => {
    Api.getUser(userId)
      .then((response) => response.json())
      .then((data) => {
        const name = data.name;
        setName(name);
        const first = name.charAt(0).toUpperCase();
        setFirstLetter(first); 
      })
      .catch((error) => {
        console.log(
          `Error retrieving user data for user with ID ${userId}: ${error}`
        );
      });
  }, [userId]);

  return (
    <section className="navBarSection">
      <header className="header flex">
        {isLoggedIn ? (
          <div className="logoDiv">
            <Link to={`/Home/${userId}`} className="logo flex">
              <h1>
                {" "}
                <MdOutlineTravelExplore className="icon" /> KiaKia
              </h1>
            </Link>
          </div>
        ) : (
          <div className="logoDiv">
            <Link to="/" className="logo flex">
              <h1>
                {" "}
                <MdOutlineTravelExplore className="icon" /> KiaKia
              </h1>
            </Link>
          </div>
        )}

        {isLoggedIn ? (
          <div className={active}>
            <nav>
              <ul className="navLists flex">
                <li className="navItem">
                  <CustomLink to={`/Trip/${userId}`} className="navLink">
                    Trip
                  </CustomLink>
                </li>

                <li className="navItem">
                  <CustomLink to="/Explore" className="navLink">
                    Explore
                  </CustomLink>
                </li>

                <li className="navItem">
                  <CustomLink to={`/Wishlist/${userId}`} className="navLink">
                    Wishlist
                  </CustomLink>
                </li>

                <button className="btn">
                  <CustomLink to={`/CreateTrip/${userId}`}>
                    Plan A Trip
                  </CustomLink>
                </button>

                <span className="user">Hello, {name}!</span>

                <li className="profile">
                  <IconButton
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <Avatar className="icon">{firstLetter}</Avatar>
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => handleClose()}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem
                      component={CustomLink}
                      onClick={handleClose}
                      to={`/Profile/${userId}`}
                    >
                      <ListItemIcon>
                        <AccountBox />
                      </ListItemIcon>
                      <ListItemText primary="Profile" />
                    </MenuItem>
                    <MenuItem
                      component={CustomLink}
                      onClick={handleClose}
                      to={`/ResetPassword`}
                    >
                      <ListItemIcon>
                        <Key />
                      </ListItemIcon>
                      <ListItemText primary="Reset password" />
                    </MenuItem>
                    <MenuItem onClick={handleLogoutClick} onClose={handleClose}>
                      <ListItemIcon>
                        <Logout />
                      </ListItemIcon>
                      <ListItemText primary="Log out" />
                    </MenuItem>
                  </Menu>
                </li>
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
                  <CustomLink to="/Trip" className="navLink">
                    Trip
                  </CustomLink>
                </li>

                <li className="navItem">
                  <CustomLink to="/Explore" className="navLink">
                    Explore
                  </CustomLink>
                </li>

                <li className="navItem">
                  <CustomLink to="/Login" className="navLink">
                    Log in
                  </CustomLink>
                </li>

                <li className="navItem">
                  <CustomLink to="/Signup" className="navLink">
                    Sign up
                  </CustomLink>
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
  );
}

Navbar.propTypes = {
  handleClick: PropTypes.func,
};

export default Navbar;

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <div className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </div>
  );
}
