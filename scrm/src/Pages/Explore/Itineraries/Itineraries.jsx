import React from "react";
import singapore from "../../../Assets/singapore.png";
import newyork from "../../../Assets/newyork.png";
import ItineraryCard from "../../../Components/Card/ItineraryCard/ItineraryCard";

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
    img: newyork,
    cityName: "New York",
    places: ["Broadway", "NYC"],
    tags: ["New York", "USA", "Summer"],
    desc: "Mesmerizing busy city New York. Tips and tricks to save money on your trip",
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
      <div className="itinerary-cards">{itineraryCards}</div>
    </>
  );
};

export default Itineraries;
