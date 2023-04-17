import React, { useState, useEffect } from "react";
import "./PublicLanding.css";
import Api from "../../Helpers/Api";
import video2 from "../../Assets/video2.mp4";
import { FiSearch } from "react-icons/fi";
import image from "../../Assets/img.jpg";
import PlaceCard from "../../Components/Card/PlaceCard/PlaceCard";
import singapore from "../../Assets/singapore.png";
import tokyo from "../../Assets/tokyo.jpg";
import ItineraryCard from "../../Components/Card/ItineraryCard/ItineraryCard";
import newyork from "../../Assets/newyork.png";
import japan from "../../Assets/japan.png";
import { useNavigate } from "react-router-dom";

const dummyData = [
  {
    img: image,
    tripTag: "Summer 2023 - 14 days trip",
    cardTitle: "Japan",
    places: ["Tokyo", "Osaka", "Kyoto"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus a, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.",
  },
  {
    img: image,
    tripTag: "Winter 2023 - 14 days trip",
    cardTitle: "East Coast",
    places: ["New York", "Bronx", "Washington D.C."],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus a, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.",
  },
  {
    img: image,
    tripTag: "Winter 2023 - 14 days trip",
    cardTitle: "East Coast",
    places: ["New York", "Bronx", "Washington D.C."],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus a, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.",
  },
  {
    img: image,
    tripTag: "Winter 2023 - 14 days trip",
    cardTitle: "East Coast",
    places: ["New York", "Bronx", "Washington D.C."],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus a, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.",
  },
];

const placesDummyData = [
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

const itineraryDummyData = [
  {
    img: singapore,
    cityName: "Singapore",
    places: ["Marina Bay Sands", "Haw Par Villa", "Lau Pa Sat"],
    tags: ["Singapore", "SEA", "Summer"],
    desc: "Must visit restaurants in Singapore",
    numOfDays: 5,
  },
  {
    img: newyork,
    cityName: "New York",
    places: ["Broadway", "NYC"],
    tags: ["New York", "USA", "Summer"],
    desc: "Mesmerizing busy city New York. Tips and tricks to save money on your trip",
    numOfDays: 15,
  },
  {
    img: japan,
    cityName: "Tokyo",
    places: ["Shinjuku", "Akihabara", "Senso-ji"],
    tags: ["Tokyo", "Japan", "Winter"],
    desc: "The most popular and most visited places in Tokyo",
    numOfDays: 15,
  },
  {
    img: newyork,
    cityName: "New York",
    places: ["Broadway", "NYC"],
    tags: ["New York", "USA", "Summer"],
    desc: "Mesmerizing busy city New York. Tips and tricks to save money on your trip",
    numOfDays: 15,
  },
];

const PublicLanding = () => {
  const [placesData, setPlacesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const placeCards = placesData?.map((data) => (
    <PlaceCard key={data.id} {...data} />
  ));

  const itineraryCards = itineraryDummyData?.map((data) => (
    <ItineraryCard key={data.id} {...data} />
  ));

  useEffect(() => {
    Api.getAllPlaces()
      .then((response) => response.json())
      .then((data) => {
        setPlacesData(data);
      });
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();

    navigate(`/Searchresult/${searchTerm}`);
  };

  return (
    <>
      <section className="top">
        <div className="videoDiv">
          <video src={video2} loop autoPlay muted type="video/mp4"></video>
        </div>

        <div className="secContent container">
          <div className="contactDiv flex">
            <div className="text">
              <h2>This summer I'm going to...</h2>
            </div>

            <div className="inputDiv flex">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Barcelona"
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
                <button className="button flex" type="submit">
                  <FiSearch className="icon" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="pageTitle">
          <h1>Start planning your trip with us!</h1>
        </div>

        <div className="sec">
          {/* <div className="secTitle">
            <h2>For your latest trip</h2>
          </div> */}
          <div className="subSec">
            <div className="subSecTitle">
              <h3>Top Places</h3>
            </div>
            <div className="places-group">
              {placesData.map((place) => (
                <div key={place.id}></div>
              ))}
              <div className="cards-horizontal">{placeCards}</div>
            </div>
          </div>
          <div className="subSec">
            <div className="subSecTitle">
              <h3>Top Itineraries</h3>
            </div>
            <div className="cards-horizontal">{itineraryCards}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicLanding;
