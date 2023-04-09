import React from "react";
import Api from "../../Helpers/Api";
import { useEffect, useState } from "react";
import moment from "moment";

function Trip() {
  const [personalData, setPersonalData] = useState([]);
  const [groupData, setGroupData] = useState([]);

  useEffect(() => {
    reloadGroupData();
    reloadPersonalData();
  }, []);

  {
    /*later on need to get all trips from particular id --> user, and specify personal or group trip */
  }
  const reloadPersonalData = () => {
    Api.getAllPersonalTrips()
      .then((res) => res.json())
      .then((trips) => {
        for (const trip of trips) {
          const {startDate, endDate } = trip;
          trip.startDate = moment(startDate);
          trip.endDate = moment(endDate);
        }
        setPersonalData(trips);
      });
  };

  const reloadGroupData = () => {
    Api.getAllTrips()
    .then((res) => res.json())
    .then((trips) => {
      for (const trip of trips) {
        const {startDate, endDate } = trip;
        trip.startDate = moment(startDate);
        trip.endDate = moment(endDate);
      }
      setGroupData(trips);
    })
  }

  return (
    <>
      <div className="pageTitle">
        <h1>Your Upcoming Trip(s)</h1>
      </div>

      <div className="sec">
        <div className="secTitle">
          <h2>Personal</h2>
          <div className="trip-personal-group">
            {personalData.map((trip) => (
              <div key={trip.id}>
              <h2>{trip.name}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="sec">
        <div className="secTitle">
          <h2>Group</h2>
          <div>
            {groupData.map((trip) => (
              <div key={trip.id}>
              <h2>{trip.name}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Trip;
