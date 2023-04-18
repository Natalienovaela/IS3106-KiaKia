import React, { useState, useEffect } from "react";
import PlaceCard from "../../Components/Card/PlaceCard/PlaceCard";
import { useParams } from "react-router-dom";
import Api from "../../Helpers/Api";

const Searchresult = () => {
  const [placesData, setPlacesData] = useState([]);
  const [sharedTrips, setSharedTrips] = useState([]);
  useEffect(() => {
    Api.getAllPlaces()
      .then((response) => response.json())
      .then((data) => {
        setPlacesData(data);
      });
  }, []);
  /*
  useEffect(() => {
    Api.getAllSharedTrips()
      .then((response) => response.json())
      .then((data) => {
        setSharedTrips(data);
      });
  }, []);
  */
  const { query } = useParams();
  const filteredPlaces = placesData.filter((place) =>
    place.name.toLowerCase().startsWith(query.toLowerCase())
  );
  const numOfFilteredResults = filteredPlaces.length;

  const placeCards = filteredPlaces?.map((data) => (
    <PlaceCard key={data.id} {...data} />
  ));

  return (
    <div className="container">
      <div className="pageTitle">
        <h1>Showing search result for '{query}'</h1>
      </div>

      <div className="sec">
        {numOfFilteredResults < 1 && (
          <h2>There is no search result found for '{query}'.</h2>
        )}
        <div className="secTitle">{placeCards}</div>
      </div>
    </div>
  );
};

export default Searchresult;
