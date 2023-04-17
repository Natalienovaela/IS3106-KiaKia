import React, { useState, useEffect } from "react";
import PlaceCard from "../../Components/Card/PlaceCard/PlaceCard";
import { useParams } from "react-router-dom";
import Api from "../../Helpers/Api";

const Searchresult = () => {
  const [placesData, setPlacesData] = useState([]);
  useEffect(() => {
    Api.getAllPlaces()
      .then((response) => response.json())
      .then((data) => {
        setPlacesData(data);
      });
  }, []);
  const { query } = useParams();
  const filteredPlaces = placesData.filter((place) =>
    place.name.toLowerCase().startsWith(query.toLowerCase())
  );

  const placeCards = filteredPlaces?.map((data) => (
    <PlaceCard key={data.id} {...data} />
  ));

  return (
    <>
      <h2>Search Result of '{query}'</h2>
      <div className="card-container">{placeCards}</div>
    </>
  );
};

export default Searchresult;
