import React, { useState, useEffect } from "react";
import "./placecard.css";
import IconButton from "@mui/material/IconButton";
import marina from "../../../Assets/marina.png";
import merlion from "../../../Assets/merlion.png";
import botanic from "../../../Assets/botanic.png";
import gardens from "../../../Assets/gardens.png";
import louvre from "../../../Assets/louvre.png";
import eiffel from "../../../Assets/eiffel.png";
import bigben from "../../../Assets/bigben.png";
import { Bookmark, BookmarkBorder } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const PlaceCard = (props) => {
  const [click, setclick] = useState(false);
  const [img, setImg] = useState("");
  const navigate = useNavigate();
  const user = props.userId;

  const handleClick = () => {
    navigate(`/PlacesContent/${props.placeId}`);
  };

  const handleBookmark = () => {
    setclick(!click);
    console.log("clicked");
    if (props.onClick) {
      props.onClick(props.card);
    }
  };

  useEffect(() => {
    if (props.name === "Marina Bay Sands") {
      setImg(marina);
    } else if (props.name === "Merlion Park") {
      setImg(merlion);
    } else if (props.name === "Singapore Botanic Gardens") {
      setImg(botanic);
    } else if (props.name === "Gardens by the Bay") {
      setImg(gardens);
    } else if (props.name === "Louvre Museum") {
      setImg(louvre);
    } else if (props.name === "Eiffel Tower") {
      setImg(eiffel);
    } else if (props.name === "Big Ben") {
      setImg(bigben);
    }
  }, []);

  return (
    <div className="place-card">
      <div className="pc-image-div">
        <img src={img} alt="Card" />
        {user ? (
          <IconButton
            onClick={handleBookmark}
            fontSize="large"
            sx={{ color: "white" }}
            className="bookmark-button"
          >
            {click ? <Bookmark /> : <BookmarkBorder />}
          </IconButton>
        ) : (
          <></>
        )}
      </div>

      <div className="card-content" onClick={handleClick}>
        <h2 className="card-title">{props.name}</h2>
        <p className="country">{props.country}</p>
      </div>
    </div>
  );
};

export default PlaceCard;
