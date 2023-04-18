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
import newyork from "../../../Assets/newyork.png";
import japan from "../../../Assets/japan.png";
import singapore from "../../../Assets/singapore.png";

const dummyData = [
  {
    img: image,
    places: ["Marina Bay Sands", "Haw Par Villa", "Lau Pa Sat"],
    tags: ["Singapore", "SEA", "Summer"],
  },
];

// const ItineraryCard = ({
//   tripId,
//   onClick,
//   img,
//   places,
//   tags,
//   desc,
//   cityName,
//   numOfDays,
//   card,
// }) => {
//   const placeHighlight = places?.map((place) => (
//     <li className="place">{place}</li>
//   ));

const ItineraryCard = (props) => {
  const [click, setclick] = useState(false);
  const [img, setImg] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/TripContent/${props.tripId}`);
  };

  const handleBookmarkClick = () => {
    // add item to selected folder
    setclick(!click);
    console.log("button is clicked");
    if (props.onClick) {
      props.onClick(props.card);
    }
  };

  useEffect(() => {
    if (props.name === "Japan") {
      setImg(japan);
    } else if (props.name === "New York") {
      setImg(newyork);
    } else if (props.name === "Singapore") {
      setImg(singapore);
    }
  }, []);

  const [userFolder, setUserFolder] = useState("");

  // const tagsin = tags?.map((tag) => <Chip label={tag}></Chip>);

  return (
    <div className="itinerary-card">
      <div className="itinerary-imageDiv">
        <img src={img} alt="City" className="itinerary-card-image" />
        <div className="img-overlay">
          {props.userId || (props.userId && props.inTrip !== true) ? (
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
          <h2>{props.name}</h2>
          <p className="num-of-days">{props.numOfDays} days</p>
        </div>
      </div>

      <div className="card-details">
        {/* <ul className="place-highlight">{placeHighlight}</ul> */}
        <p className="card-desc">{props.description}</p>
        {/* <div className="tags">{tagsin}</div> */}
      </div>
    </div>
  );
};

export default ItineraryCard;
