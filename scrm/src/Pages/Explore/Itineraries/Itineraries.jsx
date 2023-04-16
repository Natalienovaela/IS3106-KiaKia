import React, { useState, useEffect } from "react";
import singapore from "../../../Assets/singapore.png";
import newyork from "../../../Assets/newyork.png";
import ItineraryCard from "../../../Components/Card/ItineraryCard/ItineraryCard";
import SearchBar from "../../../Components/SearchBar/SearchBar";
import japan from "../../../Assets/japan.png";
import Emoji from "a11y-react-emoji";
import Api from "../../../Helpers/Api";
import Popup from "../Popup/Popup";

const dummyData = [
  {
    id: 1,
    img: singapore,
    cityName: "Singapore",
    places: ["Marina Bay Sands", "Haw Par Villa", "Lau Pa Sat"],
    tags: ["Singapore", "SEA", "Summer"],
    desc: "Must visit restaurants in Singapore",
    numOfDays: 5,
  },
  {
    id: 2,
    img: newyork,
    cityName: "New York",
    places: ["Broadway", "NYC"],
    tags: ["New York", "USA", "Summer"],
    desc: "Mesmerizing busy city New York. Tips and tricks to save money on your trip",
    numOfDays: 15,
  },
  {
    id: 3,
    img: japan,
    cityName: "Tokyo",
    places: ["Shinjuku", "Akihabara", "Senso-ji"],
    tags: ["Tokyo", "Japan", "Winter"],
    desc: "The most popular and most visited places in Tokyo",
    numOfDays: 15,
  },
  {
    id: 4,
    img: newyork,
    cityName: "New York",
    places: ["Broadway", "NYC"],
    tags: ["New York", "USA", "Summer"],
    desc: "Mesmerizing busy city New York. Tips and tricks to save money on your trip",
    numOfDays: 15,
  },
];

const Itineraries = () => {
  const [places, setPlaces] = useState([]);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    Api.getCityList()
      .then((response) => response.json())
      .then((data) => {
        setPlaces(data);
      })
      .catch((error) => {
        console.log("Error while retrieving city list");
      });
  }, []);

  // // get all trips
  // useEffect(() => {
  //   Api.searchTripByCity(city);
  // });

  const [selectedCard, setSelectedCard] = useState(null);
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    console.log(selectedCard);
    console.log("hi this button is clicked");
    setShowPopup(true);
  };

  const handleFolderCheckbox = (folder) => {
    setSelectedFolder(folder);
  };

  const handleNewFolderInput = (event) => {
    setSelectedFolder(event.target.value);
  };

  const handleSaveButton = () => {
    // save selected card into selected folder or create a new folder with selected folder name
    // update the foldrs state
    // reset the selectedcard and selectedfolder state
  };

  const itineraryCards = dummyData?.map((cardData) => (
    <ItineraryCard
      key={cardData.id}
      {...cardData}
      onClick={() => handleCardClick(cardData)}
    />
  ));

  return (
    <>
      <p className="page-content">
        Find itineraries created by fellow travelers <Emoji symbol="🧳" />
      </p>
      <SearchBar label="Search city or country" options={places} />

      <div className="cards">{itineraryCards}</div>
      {selectedCard && (
        <Popup
          selectedCard={selectedCard}
          folders={folders}
          selectedFolder={selectedFolder}
          onFolderCheckboxChange={handleFolderCheckbox}
          onNewFolderInputChange={handleNewFolderInput}
          onSaveButtonClick={handleSaveButton}
        />
      )}
    </>
  );
};

export default Itineraries;
