import React from "react";
import singapore from "../../../Assets/singapore.png";
import newyork from "../../../Assets/newyork.png";
import ItineraryCard from "../../../Components/Card/ItineraryCard/ItineraryCard";
import SearchBar from "../../../Components/SearchBar/SearchBar";
import japan from "../../../Assets/japan.png";
import Emoji from "a11y-react-emoji";

const dummyData = [
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

const itineraryCards = dummyData?.map((cardData) => (
  <ItineraryCard key={cardData.id} {...cardData} />
));

const Itineraries = () => {
  return (
    <>
      <p className="page-content">
        Find itineraries created by fellow travelers <Emoji symbol="🧳" />
      </p>
      <SearchBar label="Search city or country" />

      <div className="cards">{itineraryCards}</div>
    </>
  );
};

export default Itineraries;
