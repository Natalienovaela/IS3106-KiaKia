import React from "react";
import Api from "../../Helpers/Api";
import { useEffect, useState } from "react";
import TripCard from "../../Components/Card/ItineraryCard/ItineraryCard";
import moment from "moment";
import Emoji from "a11y-react-emoji";

function Trip({ userId }) {
  const [personalData, setPersonalData] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const [numOfDays, setNumOfDays] = useState([]);
  const personalTripCards = personalData?.map((cardData, index) => (
    <TripCard
      key={cardData.id}
      userId={userId}
      {...cardData}
      cityName={cardData.city}
      inTrip={true}
      numOfDays={numOfDays[index]}
    />
  ));
  const groupTripCards = groupData?.map((cardData, index) => (
    <TripCard
      key={cardData.id}
      userId={userId}
      id={cardData.id}
      cityName={cardData.city}
      inTrip={true}
      {...cardData}
      numOfDays={numOfDays[index]}
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
        setPersonalData(trips);
        const promises = trips.map((trip) => {
          const tripId = trip.tripId;
          return Api.getNumOfDaysTrip(tripId)
            .then((response) => response.json())
            .then((trip) => trip.noDays);
        });
        Promise.all(promises)
          .then((numOfDaysArray) => setNumOfDays(numOfDaysArray))
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  };

  const reloadGroupData = () => {
    Api.getAllGroupTrips(userId)
      .then((res) => res.json())
      .then((trips) => {
        setGroupData(trips);
        const promises = trips.map((trip) => {
          const tripId = trip.tripId;
          return Api.getNumOfDaysTrip(tripId)
            .then((response) => response.json())
            .then((trip) => trip.noDays);
        });
        Promise.all(promises)
          .then((numOfDaysArray) => setNumOfDays(numOfDaysArray))
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
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
            {personalData.map((trip, index) => (
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
            {groupData.map((trip, index) => (
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
