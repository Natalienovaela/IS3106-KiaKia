import React, { useState } from "react";
import "./placecard.css";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import IconButton from "@mui/material/IconButton";

function BookmarkButton() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <IconButton
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="bookmark-button"
    >
      {isHovered ? <FaRegBookmark /> : <FaBookmark />}
    </IconButton>
  );
}
const PlaceCard = (props) => {
  return (
    <div className="place-card">
      <div className="pc-image-div">
        <img src={props.img} alt="Card" />
        <BookmarkButton />
      </div>

      <div className="card-content">
        <h2 className="card-title">{props.city}</h2>
        <p className="country">{props.country}</p>
      </div>
    </div>
  );
};

export default PlaceCard;
