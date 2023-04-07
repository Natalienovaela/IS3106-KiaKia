import React from "react";
import "./wishlist.css";
import HorizontalCard from "../../Components/Card/HorizontalCard/HorizontalCard";
import PlaceCard from "../../Components/Card/PlaceCard/PlaceCard";
import image from "../../Assets/img.jpg";
import singapore from "../../Assets/singapore.png";
import tokyo from "../../Assets/tokyo.jpg";
import { MdOutlineEdit } from "react-icons/md";
import Emoji from "a11y-react-emoji";
import { Button } from "@mui/material";

// dummy data for trips
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

// dummy data for folders
const dummyData2 = [
  {
    id: 1,
    folderName: "Summer 2023",
    trips: dummyData,
  },
  {
    id: 2,
    folderName: "USA",
    trips: dummyData,
  },
  {
    id: 3,
    folderName: "Winter Trips",
    trips: dummyData,
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
  {
    city: "Tokyo",
    country: "Japan",
    img: tokyo,
  },
  {
    city: "Tokyo",
    country: "Japan",
    img: tokyo,
  },
];

const placesFolderDummyData = [
  {
    folderName: "Asia",
    places: placesDummyData,
  },
];

function WishlistFolder(props) {
  const horizontalCards = props.trips?.map((cardData) => (
    <HorizontalCard {...cardData} />
  ));
  return (
    <>
      <div className="subSecTitle">
        <h3>{props.folderName}</h3>
        <button className="btn-no">
          <MdOutlineEdit className="icon" />
        </button>
      </div>
      <div className="list">{horizontalCards}</div>
    </>
  );
}

function PlacesFolder(props) {
  const placeCards = props.places?.map((cardData) => (
    <PlaceCard {...cardData} />
  ));
  return (
    <>
      <div className="subSecTitle">
        <h3>{props.folderName}</h3>
        <button className="btn-no">
          <MdOutlineEdit className="icon" />
        </button>
      </div>
      <div className="list">{placeCards}</div>
    </>
  );
}

const PlacesFolders = placesFolderDummyData?.map((data) => (
  <PlacesFolder {...data} className="cards" />
));
const WishlistFolders = dummyData2?.map((data) => <WishlistFolder {...data} />);

const Wishlist = () => {
  return (
    <>
      <div className="container">
        <div className="pageTitle">
          <h1>
            Wishlist <Emoji symbol="✨" label="sparkle emoji" />
          </h1>
        </div>

        <div className="sec">
          <div className="secTitle">
            <h2>Trips You Love</h2>
            {WishlistFolders}
          </div>

          <div className="secTitle">
            <h2>Places You Love</h2>
            <div>{PlacesFolders}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
