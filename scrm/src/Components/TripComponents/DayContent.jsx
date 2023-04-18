import React, { useState, useEffect, useCallback } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Api from "../../Helpers/Api";
import TextField from "@mui/material/TextField";

const DayContent = ({ index, item }, ...props) => {
  const [itinerary, setItinerary] = useState([]);
  const [placesDataName, setPlacesDataNames] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [showAutocomplete, setShow] = useState(false);
  return <></>;
};

export default DayContent;
