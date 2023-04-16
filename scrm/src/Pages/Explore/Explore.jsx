import React, { useState, useEffect } from "react";
import "./explore.css";
import ItineraryCard from "../../Components/Card/ItineraryCard/ItineraryCard";
import singapore from "../../Assets/singapore.png";
import newyork from "../../Assets/newyork.png";
import image1 from "../../Assets/img.jpg";
import { Button, ButtonGroup, Tabs, Tab } from "@mui/material";
import Itineraries from "./Itineraries/Itineraries";
import Places from "./Places/Places";
import Emoji from "a11y-react-emoji";
import Api from "../../Helpers/Api";

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

const Explore = ({ userId }) => {
  const [sharedItineraries, setSharedItineraries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.getAllTrips(userId);
        const data = await response.json();
        const sharedTrips = data.filter((trip) => trip.isShared);
        setSharedItineraries(sharedTrips);
        console.log("Successfully retrieved shared itineraries");
      } catch (error) {
        console.log("Error while retrieving trips list");
      }
    };
  });

  const itineraryCards = sharedItineraries?.map((cardData) => (
    <ItineraryCard key={cardData.id} {...cardData} />
  ));

  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const here = () => {
    console.log(userId);
  };

  return (
    <>
      <div className="container">
        <div className="pageTitle">
          <h1>
            Explore <Emoji symbol="🌏" label="earth emoji" />
          </h1>
          <button onClick={here}>check user id here</button>
        </div>

        <div className="sec">
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            className="tabs"
            TabIndicatorProps={{ sx: { backgroundColor: "#ff8f66" } }}
          >
            <Tab label="Itineraries" className="tab-child" />
          </Tabs>
          <div className="explore-content">
            {itineraryCards}
            {selectedTab === 1 && <Itineraries userId={userId} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;
