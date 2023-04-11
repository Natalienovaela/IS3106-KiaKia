import React from "react";
import japan from "../../../Assets/japan.png";
import tokyo from "../../../Assets/tokyo.jpg";
import singapore from "../../../Assets/singapore.png";
import PlaceCard from "../../../Components/Card/PlaceCard/PlaceCard";
import SearchBar from "../../../Components/SearchBar/SearchBar";
import Emoji from "a11y-react-emoji";

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
  const placeCards = dummyData?.map((cardData) => (
    <PlaceCard key={cardData.id} {...cardData} />
  ));
  return (
    <>
      <div className="page-dec">
        <p className="page-content">Find your next destination</p>
        <Emoji symbol="📍" label="earth emoji" className="icon" />
      </div>

      <SearchBar label="Search places" />

      <div className="cards">{placeCards}</div>
    </>
  );
};

export default Places;
