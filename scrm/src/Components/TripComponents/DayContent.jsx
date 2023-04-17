import React, { useState, useEffect, useCallback } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Api from "../../Helpers/Api";
import TextField from "@mui/material/TextField";

const DayContent = ({ index, item }, ...props) => {
  const [itinerary, setItinerary] = useState([]);
  const [places, setPlaces] = useState([]);
  const [editMode, setEditMode] = useState(false);

  // to get country list for search bar value
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
  const [inputValue, setInputValue] = React.useState("");
  const [value, setValue] = React.useState("");
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const handleDayChange = useCallback(
    (index) => {
      setSelectedDayIndex(index);
      setValue(itinerary[index]?.place || null);
      setInputValue(inputValue[index] || "");
      setEditMode(true);
    },
    [props.itinerary]
  );

  const handleCancelButton = () => {
    setSelectedDayIndex(null);
    setInputValue(itinerary[selectedDayIndex]?.place || "");
    setEditMode(false);
  };

  const handleSaveButton = () => {
    setEditMode(false);
    const newItinerary = [...itinerary];
    newItinerary[selectedDayIndex] = { place: value };
    setItinerary(newItinerary);
    setSelectedDayIndex(0);
    setInputValue(null);

    console.log(editMode);
  };
  useEffect(() => {
    handleDayChange(index);
  }, [itinerary, handleDayChange]);

  return (
    <div className="itinerary-details" key={item.id}>
      <h3>Day {index + 1} </h3>
      {selectedDayIndex === null && (
        <>
          <button onClick={() => handleDayChange(index)}>Change Place</button>
        </>
      )}
      {editMode && (
        <>
          <Autocomplete
            value={selectedDayIndex !== null ? value : ""}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            inputValue={selectedDayIndex != null ? inputValue : ""}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={places}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Search places" />
            )}
          />
          <button onClick={handleCancelButton}>Cancel</button>
          <button onClick={handleSaveButton}>Save</button>
        </>
      )}

      <p>{itinerary[index]?.place}</p>
    </div>
  );
};

export default DayContent;
