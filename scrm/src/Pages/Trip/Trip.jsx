import React from "react";
import Api from "../../Helpers/Api";
import { useEffect, useState } from "react";
import TripCard from "../../Components/Card/ItineraryCard/ItineraryCard";
import moment from "moment";
import Emoji from "a11y-react-emoji";

function Trip({ userId }) {
  const [personalData, setPersonalData] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const personalTripCards = personalData?.map((cardData) => (
    <TripCard
      key={cardData.id}
      userId={userId}
      {...cardData}
      cityName={cardData.city}
      inTrip={true}
    />
  ));
  const groupTripCards = groupData?.map((cardData) => (
    <TripCard
      key={cardData.id}
      userId={userId}
      id={cardData.id}
      cityName={cardData.city}
      inTrip={true}
      {...cardData}
    />
  ));

  useEffect(() => {
    reloadGroupData();
    reloadPersonalData();
  }, []);

  const reloadPersonalData = () => {
    Api.getAllPersonalTrips(userId)
      .then((res) => res.json())
      .then((trips) => {
        for (const trip of trips) {
          const { startDate, endDate } = trip;
          trip.startDate = moment(startDate);
          trip.endDate = moment(endDate);
        }
        console.log(trips);
        setPersonalData(trips);
      });
  };

  const reloadGroupData = () => {
    Api.getAllGroupTrips(userId)
      .then((res) => res.json())
      .then((trips) => {
        for (const trip of trips) {
          const { startDate, endDate } = trip;
          trip.startDate = moment(startDate);
          trip.endDate = moment(endDate);
        }
        console.log(trips);
        setGroupData(trips);
      });
  };

  const tes = () => {
    console.log(personalData);
  };
  return (
    <>
      <div className="pageTitle">
        <h1>
          Your Upcoming Trip(s) <Emoji symbol="✈️" label="plane emoji" />
        </h1>
      </div>

      <div className="sec">
        <div className="secTitle">
          <h2 onClick={tes}>Personal</h2>
          <div className="trip-personal-group">
            {personalData.map((trip) => (
              <div key={trip.id}></div>
            ))}
            <div className="cards">{personalTripCards}</div>
          </div>
        </div>
      </div>
      <div className="sec">
        <div className="secTitle">
          <h2>Group</h2>
          <div>
            {groupData.map((trip) => (
              <div key={trip.id}>
              </div>
            ))}
            <div className="cards">{groupTripCards}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Trip;
