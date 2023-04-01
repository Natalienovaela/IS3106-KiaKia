import React from "react";
import Api from "../../Helpers/Api";
import { useEffect, useState } from "react";

function Trip() {

  const [data, setData] = useState([]);

  useEffect(() => {
    reloadData();
    }, []);

  {/*later on need to get all trips from particular id --> user, and specify personal or group trip */}
  const reloadData = () => {
    Api.getAllTrips()
    .then((res) => res.json())
    .then((trips) => {
    for (const trip of trips) {
    const { name, startDate, endDate } = trip;
    }
    setData(trips);
    });
    };

  return(
    <>
    <div className="pageTitle">
      <h1>Your Upcoming Trip(s)</h1>
    </div>

    <div className="sec">
      <div className="secTitle">
        <h2>Personal</h2>

      </div>
    </div>
    <div className="sec">
      <div className="secTitle">
        <h2>Group</h2>
      </div>
    </div>
    </>
  )
}

export default Trip;