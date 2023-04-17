import React, { useState } from "react";
import "./placecard.css";
import IconButton from "@mui/material/IconButton";
import { Bookmark, BookmarkBorder } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const PlaceCard = (props) => {
  const [click, setclick] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/PlacesContent/${props.placeId}`);
  };

  const handleBookmark = () => {
    setclick(!click);
    console.log("clicked");
  }

  return (
    <div className="place-card" onClick={handleClick}>
      <div className="pc-image-div">
        <img src={props.img} alt="Card" />
        <IconButton
          onClick={handleBookmark}
          fontSize="large"
          sx={{ color: "white" }}
          className="bookmark-button"
        >
          {click ? <Bookmark /> : <BookmarkBorder />}
        </IconButton>
      </div>

      <div className="card-content">
        <h2 className="card-title">{props.name}</h2>
        <p className="country">{props.country}</p>
      </div>
    </div>
  );
};

export default PlaceCard;
