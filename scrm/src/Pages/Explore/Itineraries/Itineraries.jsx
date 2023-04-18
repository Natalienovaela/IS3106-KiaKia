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

const Itineraries = ({ userId }) => {
  const [places, setPlaces] = useState([]);
  const [trips, setTrips] = useState([]);
  const [folders, setFolders] = useState([]);
  const [thisUserId, setUserId] = useState("");
  useEffect(() => {
    setUserId(userId);
  }, [userId]);

  const handleUserId = () => {
    setUserId(userId);
  };

  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const handleCardClick = (card) => {
    setSelectedCard(card);
    console.log(selectedCard);
    console.log("hi this button is clicked");
    setShowPopup(true);
    console.log(folders);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.retrieveAllFolder(userId);
        const data = await response.json();
        setFolders(data);
      } catch (error) {
        console.log("Error while retrieving folders list");
      }
    };

    fetchData();
  }, [userId, folders]);

  const handleFolderCheckbox = (folder) => {
    setSelectedFolder(folder);
    console.log(selectedFolder);
  };

  const handleNewFolderInput = (event) => {
    // check if a folder with the same name already exists
    const newFolderName = event.target.value.trim();

    if (!newFolderName) {
      return;
    }

    setNewFolderName(newFolderName);
  };

  const handleCreateNewFolder = async () => {
    // check if new folder name is there
    if (!newFolderName) {
      alert("Please enter a folder name");
    }

    // Check if a folder with the same name already exists
    const isDuplicateFolderName = folders.some(
      (folder) => folder.name === newFolderName
    );

    if (isDuplicateFolderName) {
      alert(`A folder with the name ${newFolderName} already exists.`);
      return;
    }

    // create new folder
    try {
      await Api.createNewFolder(thisUserId, newFolderName);
      setNewFolderName("");
      console.log("successfully created");
    } catch (error) {
      console.log("Error while creating new folder");
    }
  };

  const handleCloseButton = () => {
    setShowPopup(false);
    setSelectedCard(false);
  };

  const handleSaveButton = async () => {
    // check if a folder has been selected or a new folder name has been entered
    if (!selectedFolder) {
      alert("Please select a folder or enter a new folder name.");
      return;
    }

    // check if the selected card exists
    if (!selectedCard) {
      alert("No card has been selected");
      return;
    }

    // save selected card into selected folder
    try {
      await Api.addTripToFolder(selectedFolder.folderId, selectedCard.id);
      setSelectedCard(null);
      setShowPopup(false);
      console.log("Successfully saved trip");
    } catch (error) {
      console.log("Error while saving card to folder");
    }
  };

  const itineraryCards = dummyData?.map((cardData) => (
    <ItineraryCard
      key={cardData.id}
      {...cardData}
      onClick={() => handleCardClick(cardData)}
    />
  ));
  const here = () => {
    console.log(thisUserId);
  };
  return (
    <>
      <p className="page-content">
        Find itineraries created by fellow travelers <Emoji symbol="🧳" />
      </p>

      <div className="cards">{itineraryCards}</div>
      {selectedCard && (
        <Popup
          selectedCard={selectedCard}
          folders={folders}
          selectedFolder={selectedFolder}
          newFolderName={newFolderName}
          onFolderCheckboxChange={handleFolderCheckbox}
          onNewFolderInputChange={handleNewFolderInput}
          onCreateNewFolderClick={handleCreateNewFolder}
          onCloseButtonClick={handleCloseButton}
          onSaveButtonClick={handleSaveButton}
        />
      )}
    </>
  );
};

export default Itineraries;
