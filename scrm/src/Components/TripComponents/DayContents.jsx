import React, { useState, useEffect, useCallback } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Api from "../../Helpers/Api";
import TextField from "@mui/material/TextField";

const DayContents = ({ index, item }, ...props) => {
  const [itinerary, setItinerary] = useState([]);
  const places = [];
  const [errors, setErrors] = useState([]);
  const [inputPlace, setInputPlace] = useState("");
  const [placesDataName, setPlacesDataNames] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [value, setValue] = useState("");
  const [place, setPlace] = useState("");

  // get places data that match country
  const getPlaces = () => {
    Api.getAllPlaces()
      .then((response) => response.json())
      .then((data) => {
        const sameCountry = data.filter(
          (place) => place.country === itinerary.country
        );
        setPlacesDataNames(sameCountry);
      });
  };
  // use this one for dummy
  const getPlaces2 = () => {
    Api.getAllPlaces()
      .then((response) => response.json())
      .then((data) => {
        const names = data.map((place) => place.name);
        setPlacesDataNames(names);
      });
  };

  useEffect(() => {
    getPlaces2();
  }, []);

  const handleAddPlace = () => {
    setToggle(true);
  };

  const handleCloseButton = () => {
    setToggle(false);
  };

  const handlePlaceChange = (event, placeValue) => {
    setInputPlace(placeValue);
    setErrors((prevErrors) => ({
      ...prevErrors,
      country:
        placeValue.trim().length === 0 ? "Please select a place" : undefined,
    }));
  };

  return (
    <>
      <div className="itinerary-details" key={item.id}>
        <h3>Day {index + 1}</h3>
        <div className="placesLineItem">
          <button onClick={handleAddPlace}>add place</button>

          {toggle && (
            <>
              <Autocomplete
                value={inputPlace}
                onChange={handlePlaceChange}
                inputValue={value}
                onInputChange={(event, newInputValue) => {
                  setValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={placesDataName}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Enter a place"
                    error={Boolean(errors.place) || ""}
                    helperText={errors.place}
                  />
                )}
              />
              <button onClick={handleCloseButton}>close</button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DayContents;
