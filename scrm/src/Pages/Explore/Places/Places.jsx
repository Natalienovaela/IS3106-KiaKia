import React, { useEffect, useState } from "react";
import japan from "../../../Assets/japan.png";
import tokyo from "../../../Assets/tokyo.jpg";
import singapore from "../../../Assets/singapore.png";
import PlaceCard from "../../../Components/Card/PlaceCard/PlaceCard";
import SearchBar from "../../../Components/SearchBar/SearchBar";
import Emoji from "a11y-react-emoji";
import Api from "../../../Helpers/Api";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SavePlaceToWishlist from "./SavePlaceToWishlist";

const dummyData = [
  {
    city: "Singapore",
    country: "Singapore",
    img: singapore,
  },
  {
    city: "Tokyo",
    country: "Japan",
    img: tokyo,
  },
];
const Places = ({ userId }) => {
  const [inputValue, setInputValue] = React.useState("");
  const [thisUserId, setUserId] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [places, setPlaces] = useState([]);
  const [placesData, setPlacesData] = useState([]);

  const handleCloseButton = () => {
    console.log(selectedCard);
    setShowPopup(false);
    setSelectedCard(false);
  };

  const handleCardClick = (card) => {
    setShowPopup(true);
    setSelectedCard(card);
    console.log("this place is clicked");
  };
  useEffect(() => {
    setUserId(userId);
  }, [userId]);

  const handleSaveButton = async () => {
    if (!selectedCard) {
      alert("No card has been selected");
      return;
    }

    try {
      await Api.linkUserWithWishlistPlace(userId, selectedCard.placeId);
      setShowPopup(false);
      setSelectedCard(null);
    } catch (error) {
      console.log(error.message);
    }
  };
  //const placeCards = dummyData?.map((cardData) => (
  //<PlaceCard key={cardData.id} {...cardData} />
  //));

  const getPlaces = () => {
    Api.getAllPlaces()
      .then((response) => response.json())
      .then((data) => {
        setPlacesData(data);
      });
  };

  useEffect(() => {
    getPlaces();
  }, []);
  const placeCards = placesData?.map((data) => (
    <PlaceCard
      key={data.id}
      {...data}
      onClick={() => handleCardClick(data)}
      userId={userId}
    />
  ));

  return (
    <>
      <div className="page-dec">
        <p className="page-content">Find your next destination</p>
        <Emoji symbol="📍" label="earth emoji" className="icon" />
      </div>

      <div className="cards">{placeCards}</div>
      {selectedCard && (
        <SavePlaceToWishlist
          selectedCard={selectedCard}
          onCloseButtonClick={handleCloseButton}
          onSaveButtonClick={handleSaveButton}
        />
      )}
    </>
  );
};

export default Places;
