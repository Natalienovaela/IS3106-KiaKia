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
const Places = () => {
  const [inputValue, setInputValue] = React.useState("");
  //const placeCards = dummyData?.map((cardData) => (
  //<PlaceCard key={cardData.id} {...cardData} />
  //));

  const [places, setPlaces] = useState([]);
  const [placesData, setPlacesData] = useState([]);
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
    <PlaceCard key={data.id} {...data} />
  ));

  // to get country list for search bar value
  useEffect(() => {
    Api.getCountryList()
      .then((response) => response.json())
      .then((data) => {
        setPlaces(data);
      })
      .catch((error) => {
        console.log("Error while retrieving country list");
      });
  }, []);
  const [value, setValue] = React.useState(places[0]);

  return (
    <>
      <div className="page-dec">
        <p className="page-content">Find your next destination</p>
        <Emoji symbol="📍" label="earth emoji" className="icon" />
      </div>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
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

      <div className="cards">{placeCards}</div>
    </>
  );
};

export default Places;
