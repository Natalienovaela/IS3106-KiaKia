import React, { useState, useEffect } from "react";
import "./itinerarycard.css";
import image from "../../../Assets/img.jpg";
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router-dom";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import { Bookmark, BookmarkBorder } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Api from "../../../Helpers/Api";

const dummyData = [
  {
    img: image,
    places: ["Marina Bay Sands", "Haw Par Villa", "Lau Pa Sat"],
    tags: ["Singapore", "SEA", "Summer"],
  },
];

const ItineraryCard = ({
  id,
  onClick,
  img,
  places,
  tags,
  desc,
  cityName,
  numOfDays,
  card,
  userId,
  ...props
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/TripContent/${userId}/${props.tripId}`);
  };
  const placeHighlight = places?.map((place) => (
    <li className="place">{place}</li>
  ));
  const [click, setclick] = useState(false);

  const handleBookmarkClick = () => {
    // add item to selected folder
    setclick(!click);
    console.log("button is clicked");
    onClick({ card });
  };

  const [userFolder, setUserFolder] = useState("");

  return (
    <div className="itinerary-card">
      <div className="itinerary-imageDiv">
        <img src={img} alt="City" className="itinerary-card-image" />
        <div className="img-overlay">
          {props.inTrip !== true || userId === undefined ? (
            <IconButton
              onClick={handleBookmarkClick}
              size="large"
              sx={{ color: "white" }}
            >
              {click ? <Bookmark /> : <BookmarkBorder />}
            </IconButton>
          ) : (
            <></>
          )}
        </div>

        <div className="city-div" onClick={handleClick}>
          <h2>{cityName}</h2>
          <p className="num-of-days">{numOfDays} days</p>
        </div>
      </div>

      <div className="card-details">
        <ul className="place-highlight">{placeHighlight}</ul>
        <p className="card-desc">{desc}</p>
      </div>
    </div>
  );
};

export default ItineraryCard;
