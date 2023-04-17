import React, { useState, useEffect, useCallback } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Api from "../../Helpers/Api";
import TextField from "@mui/material/TextField";
import PlaceCard from "../../Components/Card/PlaceCard/PlaceCard";

const DayContents = ({ index, item, tripId }, { ...props }) => {
  const [itinerary, setItinerary] = useState([]);
  const [placesDataName, setPlacesDataNames] = useState([]);
  const [placesDataFull, setPlacesDataFull] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [place, setPlace] = useState("");
  const [placeList, setPlaceList] = useState([]);
  const [placeLineItem, setPlaceLineItem] = useState([]);
  const [dun2, setdun2] = useState([]);

  const getRecordedPlaceLineItem = () => {
    const p = item.placeLineItem.map((place) => place.place);
    setPlaceLineItem(p);
    console.log(p);
  };

  useEffect(() => {
    getRecordedPlaceLineItem();
  }, []);
  // get places data that match country
  const getPlaces = () => {
    Api.getAllPlaces()
      .then((response) => response.json())
      .then((data) => {
        const sameCountry = data.filter(
          (place) => place.country === item.country
        );
        setPlacesDataNames(sameCountry);
      });
  };
  // use this one for dummy
  const getPlaces2 = () => {
    Api.getAllPlaces()
      .then((response) => response.json())
      .then((data) => {
        setPlacesDataFull(data);
        const names = data.map((place) => place.name);
        setPlacesDataNames(names);
      });
  };

  const saveToPlaceLineItem = async (place) => {
    try {
      await Api.createPlaceLineItem(tripId, item.dayItineraryId, place);
      console.log("success");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    console.log(tripId);
    getPlaces2(); // change this later
  }, []);

  const handleAddPlace = () => {
    setToggle(true);
  };

  const handleCloseButton = () => {
    setToggle(false);
  };

  const handleSaveButton = () => {
    console.log(placesDataFull);
    const selectedPlace = placesDataFull.filter(
      (placeObj) => placeObj.name === place
    );
    if (selectedPlace.length > 0) {
      console.log("this is selected place" + selectedPlace[0]);
      const placeId = selectedPlace[0].placeId;
      const placeName = selectedPlace[0].name;
      setPlaceList([...placeList, placeName]);
      console.log(place);
      console.log(placeId);

      console.log({ item });
      saveToPlaceLineItem(placeId);
      setPlace("");
      setToggle(false);
    }
  };

  const handleCancelButton = () => {
    setPlace("");
    setToggle(false);
  };

  const handlePlaceChange = (event, placeValue) => {
    setPlace(placeValue);
  };
  const placeCards = placeLineItem?.map((data) => (
    <PlaceCard key={data.id} {...data} />
  ));

  return (
    <>
      <div className="itinerary-details" key={item.dayItineraryId}>
        <h3>Day {index + 1}</h3>
        <div className="placesLineItem">
          {placeLineItem?.map((placeItem, index) => (
            <h3 key={index}>{placeItem.name}</h3>
          ))}
          {placeList.map((placeItem, index) => (
            <h3 key={index}>{placeItem}</h3>
          ))}
          {toggle && (
            <>
              <div className="add-place-div">
                <Autocomplete
                  value={place}
                  onChange={handlePlaceChange}
                  inputValue={place}
                  onInputChange={(event, newInputValue) => {
                    setPlace(newInputValue);
                  }}
                  id="controllable-states-demo"
                  options={placesDataName}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Enter a place" />
                  )}
                />
                <button onClick={handleSaveButton}>save</button>
                <button onClick={handleCancelButton}>cancel</button>
              </div>
            </>
          )}

          <button onClick={handleAddPlace}>add place</button>
        </div>
      </div>
    </>
  );
};

export default DayContents;
