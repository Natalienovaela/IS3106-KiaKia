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
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

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
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();

    navigate(`/Searchresult/${searchTerm}`);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.getAllSharedTrips();
        const data = await response.json();
        setSharedItineraries(data);
        console.log(data);
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
          <div>
            <form onSubmit={handleSearch} className="search-bar">
              <input
                type="text"
                placeholder="Seach here"
                className="input-field"
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <button className="button flex" type="submit">
                <FiSearch className="icon" />
              </button>
            </form>
          </div>
        </div>

        <div className="sec">
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            className="tabs"
            TabIndicatorProps={{ sx: { backgroundColor: "#ff8f66" } }}
          >
            <Tab label="Places" className="tab-child" />
            <Tab label="Itineraries" className="tab-child" />
          </Tabs>
          <div className="explore-content">
            {itineraryCards}
            {selectedTab === 0 && <Places userId={userId} />}
            {selectedTab === 1 && <Itineraries userId={userId} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;
