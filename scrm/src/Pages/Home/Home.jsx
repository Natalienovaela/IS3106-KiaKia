import React, { useState, useEffect } from "react";
import "./home.css";
import { useParams, useNavigate } from "react-router-dom";
import HorizontalCard from "../../Components/Card/HorizontalCard/HorizontalCard";
import image from "../../Assets/img.jpg";
import Api from "../../Helpers/Api";
import PlaceCard from "../../Components/Card/PlaceCard/PlaceCard";
import { data } from "jquery";
import singapore from "../../Assets/singapore.png";
import tokyo from "../../Assets/tokyo.jpg";
import ItineraryCard from "../../Components/Card/ItineraryCard/ItineraryCard";
import newyork from "../../Assets/newyork.png";
import japan from "../../Assets/japan.png";

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

const Home = () => {
  const { userId } = useParams();
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const horizontalCards = dummyData?.map((cardData) => (
    <HorizontalCard {...cardData} />
  ));

  const placeCards = placesDummyData?.map((data) => (
    <PlaceCard key={data.id} {...data} />
  ));

  const itineraryCards = itineraryDummyData?.map((data) => (
    <ItineraryCard key={data.id} {...data} />
  ));

  useEffect(() => {
    Api.getUser(userId)
      .then((response) => response.json())
      .then((data) => {
        const name = data.name;
        setName(name);
      })
      .catch((error) => {
        console.log(
          `Error retrieving user data for user with ID ${userId}: ${error}`
        );
      });
  }, [userId]);

  return (
    <>
      <div className="container">
        <div className="pageTitle">
          <h1>Welcome,</h1>
          <h1>{name}</h1>
          <hr />
          <p>
            What a fresh new day to start planning for your trip, isn't it?{" "}
          </p>
        </div>

        <div className="sec">
          <div className="secTitle">
            <h2>For your latest trip</h2>
          </div>
          <div className="subSec">
            <div className="subSecTitle">
              <h3>Top Places</h3>
              <p>see more...</p>
            </div>
            <div className="cards-horizontal">{placeCards}</div>
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

export default Home;
