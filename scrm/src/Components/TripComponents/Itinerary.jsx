import React, { useCallback, useState, useEffect } from "react";
import Api from "../../Helpers/Api";
import { DatePicker } from "antd";
import moment from "moment-timezone";
import dayjs from "dayjs";
import DayContent from "./DayContent";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// import { DragDropContext } from "react-beautiful-dnd";

const Itinerary = () => {
  const { RangePicker } = DatePicker;
  const id = 1;
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

      Api.createItinerary(1, {
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
    Api.getTrip(id)
      .then((res) => res.json())
      .then((trip) => {
        const { name, startDate, endDate, itinerary, isShared } = trip;
        setName(name);
        setItinerary(itinerary);
        setStartDate(moment(startDate, "YYYY-MM-DDTHH:mm:ssZ[UTC]").toDate());
        setEndDate(moment(endDate, "YYYY-MM-DDTHH:mm:ssZ[UTC]").toDate());
        setIsTripShared(isShared);
      });
    console.log("the : " + startDate + " " + endDate);
  }, []);

  const [places, setPlaces] = useState([]);

  // to get country list for search bar value
  useEffect(() => {
    Api.getCountryList()
      .then((response) => response.json())
      .then((data) => {
        setPlaces(data);
      })
      .catch((error) => {
        console.log("Error while retrieving country list");
      });
  }, []);
  const [inputValue, setInputValue] = React.useState("");
  const [value, setValue] = React.useState(places[0]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const handleDayChange = useCallback(
    (index) => {
      setSelectedDayIndex(index);
      setValue(itinerary[index]?.place || null);
      setInputValue(inputValue[index] || "");
    },
    [itinerary]
  );

  useEffect(() => {
    handleDayChange(0);
  }, [itinerary, handleDayChange]);

  return (
    <>
      <h2>Itinerary</h2>

      <div className="date-range-picker">
        <h3>
          {startDate.toLocaleDateString()} to {endDate.toLocaleDateString()}
        </h3>
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
            <DayContent item={item} index={index} />
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
