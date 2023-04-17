import React from "react";
import "./TripCard.css";
import { useNavigate } from "react-router-dom";

const TripCard = (props) => {
    const navigate = useNavigate();


    const handleClick = () => {
        navigate(`/TripContent/${props.userId}/${props.tripId}`);
    };

    return (
        <div className="trip-card" onClick={handleClick}>
            <div className="pc-image-div">
                <img src={props.img} alt="Card" />
            </div>

            <div className="card-content">
                <h2 className="card-title">{props.city}</h2>
                <p className="country">{props.country}</p>
            </div>
        </div>
    );
};

export default TripCard;
