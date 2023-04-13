import React, { useState, useEffect } from "react";
import "./itinerarycard.css";
import image from "../../../Assets/img.jpg";
import Chip from "@mui/material/Chip";
import Profile from "../../Profile/Profile";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import { Bookmark, BookmarkBorder } from "@mui/icons-material";
import Button from "@mui/material/Button";

const dummyData = [
  {
    img: image,
    places: ["Marina Bay Sands", "Haw Par Villa", "Lau Pa Sat"],
    tags: ["Singapore", "SEA", "Summer"],
  },
];

const ItineraryCard = (props) => {
  const placeHighlight = props.places?.map((place) => (
    <li className="place">{place}</li>
  ));
  const [click, setclick] = useState(false);

  const handleClick = () => {
    setclick(!click);
    console.log("clicked");
  };

  const tags = props.tags?.map((tag) => <Chip label={tag}></Chip>);

  return (
    <div className="itinerary-card">
      <div className="itinerary-imageDiv">
        <img src={props.img} alt="City" className="itinerary-card-image" />
        <div className="img-overlay">
          <Profile />

          <IconButton
            onClick={handleClick}
            size="large"
            sx={{ color: "white" }}
          >
            {click ? <Bookmark /> : <BookmarkBorder />}
          </IconButton>
        </div>

        <div className="city-div">
          <h2>{props.cityName}</h2>
          <p className="num-of-days">{props.numOfDays} days</p>
        </div>
      </div>

      <div className="card-details">
        <ul className="place-highlight">{placeHighlight}</ul>
        <p className="card-desc">{props.desc}</p>
        <div className="tags">{tags}</div>
      </div>
    </div>
  );
};

export default ItineraryCard;
