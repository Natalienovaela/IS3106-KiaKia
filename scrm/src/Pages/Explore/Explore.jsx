import React from "react";
import "./explore.css";
import ItineraryCard from "../../Components/Card/ItineraryCard/ItineraryCard";
import singapore from "../../Assets/singapore.png";
import newyork from "../../Assets/newyork.png";
import image1 from "../../Assets/img.jpg";
import { Button, ButtonGroup, Tabs, Tab } from "@mui/material";
import TabPanel from "../../Components/TabPanel/TabPanel";
import Itineraries from "./Itineraries/Itineraries";
import Places from "./Places/Places";

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
const Explore = () => {
  const itineraryCards = dummyData?.map((cardData) => (
    <ItineraryCard key={cardData.id} {...cardData} />
  ));

  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <div className="container">
        <div className="pageTitle">
          <h1>Explore</h1>
        </div>

        <div className="sec">
          <Tabs value={selectedTab} onChange={handleChange}>
            <Tab label="Places" />
            <Tab label="Itineraries" />
          </Tabs>
          {selectedTab === 1 && <Itineraries />}
          {selectedTab === 0 && <Places />}
        </div>
      </div>
    </>
  );
};

export default Explore;
