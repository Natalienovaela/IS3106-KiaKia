import React, { useState } from "react";
import "./placecard.css";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import IconButton from "@mui/material/IconButton";
import { Bookmark, BookmarkBorder } from "@mui/icons-material";

const PlaceCard = (props) => {
  const [click, setclick] = useState(false);

  const handleClick = () => {
    setclick(!click);
    console.log("clicked");
  };

  return (
    <div className="place-card">
      <div className="pc-image-div">
        <img src={props.img} alt="Card" />
        <IconButton
          onClick={handleClick}
          fontSize="large"
          sx={{ color: "white" }}
          className="bookmark-button"
        >
          {click ? <Bookmark /> : <BookmarkBorder />}
        </IconButton>
      </div>

      <div className="card-content">
        <h2 className="card-title">{props.city}</h2>
        <p className="country">{props.country}</p>
      </div>
    </div>
  );
};

export default PlaceCard;
