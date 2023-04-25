import React, { useCallback, useState, useEffect } from "react";
import Api from "../../Helpers/Api";
import { DatePicker } from "antd";
import moment from "moment-timezone";
import dayjs from "dayjs";
import DayContents from "./DayContents";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import "./daycontent.css";

const Itinerary = (props) => {
  const { RangePicker } = DatePicker;
  const tripId = props.tripId;
  const [itinerary, setItinerary] = useState([]);
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(
    moment("1990-01-01", "YYYY-MM-DDTHH:mm:ssZ[UTC]").toDate()
  );
  const [endDate, setEndDate] = useState(
    moment("1990-01-01", "YYYY-MM-DDTHH:mm:ssZ[UTC]").toDate()
  );
  const [error, setError] = useState("");
  const [isTripShared, setIsTripShared] = useState(null);

  const handleDateRangeChange = (value) => {
    const start = value[0].toDate();
    console.log(start);
    const end = value[1].toDate();
    console.log(end);

    if (end > start) {
      setStartDate(start, () => {
        console.log(startDate);
      });
      setEndDate(end, () => {
        console.log(endDate);
      });

      Api.createItinerary(tripId, {
        startDate: start,
        endDate: end,
      })
        .then((data) => {
          setItinerary(data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setError("End date must be after start date");
      return;
    }
  };
  const reloadData = useCallback(() => {
    Api.getTrip(tripId) // later change to trip id
      .then((res) => res.json())
      .then((trip) => {
        const { name, startDate, endDate, itinerary, isShared, country } = trip;
        console.log(itinerary);
        setName(name);
        setItinerary(itinerary);
        setStartDate(moment(startDate, "YYYY-MM-DDTHH:mm:ssZ[UTC]").toDate());
        setEndDate(moment(endDate, "YYYY-MM-DDTHH:mm:ssZ[UTC]").toDate());
        setIsTripShared(isShared);
      });
    console.log("the : " + startDate + " " + endDate);
  }, []);
  useEffect(() => {
    reloadData();
    console.log(tripId);
  }, [reloadData, itinerary]);

  return (
    <>
      <h2>Itinerary</h2>

      <div className="date-range-picker">
        <div className="date">
          <h2 className="date-num">{startDate.toLocaleDateString()}</h2>
          <h2>to </h2>
          <h2 className="date-num">{endDate.toLocaleDateString()}</h2>
        </div>

        <RangePicker
          onChange={handleDateRangeChange}
          value={[dayjs(startDate.toString()), dayjs(endDate.toString())]}
        />

        {/*{error && <Error error={error} />}*/}
      </div>
      <div>
        {itinerary
          .map((item) => ({ ...item, date: new Date(item.date) })) // convert date strings to date objects
          .sort((a, b) => a.date - b.date)
          .map((item, index) => (
            <>
              <DayContents
                item={item}
                index={index}
                tripId={tripId}
                userRole={props.userRole}
              />
            </>
          ))}
      </div>

      {/*}
      <p>Here's a rough outline of what your trip might look like:</p>
      <ul className="itinerary-details">
        <li>
          Day 1: Arrive at your destination and check in to your accommodations
        </li>
        <li>Day 2: Explore the local area and try some new foods</li>
        <li>
          Day 3: Take a guided tour of the city and learn about its history
        </li>
        <li>Day 4: Relax at a nearby beach or go on a hike in the mountains</li>
        <li>Day 5: Take a day trip to a nearby town or attraction</li>
      </ul>
      <p>Here are some ideas for things to do on your trip:</p>
      <ul>
        <li>Hike to the top of the nearest mountain</li>
        <li>Take a cooking class and learn how to make local cuisine</li>
        <li>Visit a museum or historical site</li>
        <li>Relax on a nearby beach or lake</li>
      </ul>


            {/*}
            <div className="itinerary-details" key={item.id}>
              <h3>
                Day {index + 1}{" "}
                <button onClick={() => handleDayChange(index)}>
                  Change Place
                </button>
                <button onClick={() => handleDayChange(index)}>Cancel</button>
              </h3>
              {index === selectedDayIndex && (
                <Autocomplete
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  id="controllable-states-demo"
                  options={places}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Search places" />
                  )}
                />
              )}
              <p>{inputValue}</p>
            </div>
                  
          */}
    </>
  );
};

export default Itinerary;
