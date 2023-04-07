import { useParams } from "react-router-dom";
import React, { useCallback, useState, useEffect } from "react";
import { Link, animateScroll } from "react-scroll";
import { Divider, Grid, Popover } from "@mui/material";
import Api from "../../Helpers/Api";
import { DatePicker } from "antd";
import moment from 'moment-timezone';
import dayjs from 'dayjs';
import { ConfigProvider } from 'antd';

import utc from 'dayjs/plugin/utc';

import EditIcon from "@mui/icons-material/Edit";
const { RangePicker } = DatePicker;

function TripContent() {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState([]);
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(moment("1990-01-01", "YYYY-MM-DDTHH:mm:ssZ[UTC]").toDate());
  const [endDate, setEndDate] = useState(moment("1990-01-01", "YYYY-MM-DDTHH:mm:ssZ[UTC]").toDate());
  const [error, setError] = useState("");

  const handleDateRangeChange = (value) => {
    const start = value[0].toDate();
    console.log(start);
    const end = value[1].toDate();
    console.log(end);

    if (end > start) {
      setStartDate(start, () => {console.log(startDate)});
      setEndDate(end, () => {console.log(endDate)});

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
    Api.getTrip(1)
      .then((res) => res.json())
      .then((trip) => {
        const { name, startDate, endDate } = trip;
        setName(name);
        setStartDate(moment(startDate, "YYYY-MM-DDTHH:mm:ssZ[UTC]").toDate());
        setEndDate(moment(endDate, "YYYY-MM-DDTHH:mm:ssZ[UTC]").toDate());
      });
      console.log("the : " + startDate + " " + endDate);
  }, []);

  useEffect(() => {
    reloadData();
  }, [reloadData]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <section className="trip-header">
          <h2>Picture here</h2>
          <p>Here's a rough outline of what your trip might look like:</p>
          <ul>
            <li>
              Day 1: Arrive at your destination and check in to your
              accommodations
            </li>
            <li>Day 2: Explore the local area and try some new foods</li>
            <li>
              Day 3: Take a guided tour of the city and learn about its history
            </li>
            <li>
              Day 4: Relax at a nearby beach or go on a hike in the mountains
            </li>
          </ul>
        </section>
      </Grid>
      <Grid item xs={1.7}>
        <aside className="trip-sidebar" style={{ position: "sticky", top: 0 }}>
          <ul className="trip-sidebar-list">
            <li className="trip-sidebar-list-item">
              <Link
                activeClass="active"
                to="overview"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                Overview
              </Link>
            </li>
            <li className="trip-sidebar-list-item">
              <Link
                activeClass="active"
                to="ideaBucket"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                Idea Bucket
              </Link>
            </li>
            <li className="trip-sidebar-list-item">
              <Link
                activeClass="active"
                to="itinerary"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                Itinerary
              </Link>
            </li>
            <li className="trip-sidebar-list-item">
              <Link
                activeClass="active"
                to="expenses"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                Expenses
              </Link>
            </li>
          </ul>
        </aside>
      </Grid>
      <Grid item xs>
        <div className="trip-main-content">
          <section
            className="trip-main-content-item"
            title="Overview"
            id="overview"
          >
            <h2>Overview</h2>
            <p>Here are some ideas for things to do on your trip:</p>
            <ul>
              <li>Hike to the top of the nearest mountain</li>
              <li>Take a cooking class and learn how to make local cuisine</li>
              <li>Visit a museum or historical site</li>
              <li>Relax on a nearby beach or lake</li>
            </ul>
            <p>Here are some ideas for things to do on your trip:</p>
            <ul>
              <li>Hike to the top of the nearest mountain</li>
              <li>Take a cooking class and learn how to make local cuisine</li>
              <li>Visit a museum or historical site</li>
              <li>Relax on a nearby beach or lake</li>
            </ul>
          </section>
          <section
            className="trip-main-content-item"
            title="Idea Bucket"
            id="ideaBucket"
          >
            <h2>Idea Bucket</h2>
            <p>Here's a rough outline of what your trip might look like:</p>
            <ul>
              <li>
                Day 1: Arrive at your destination and check in to your
                accommodations
              </li>
              <li>Day 2: Explore the local area and try some new foods</li>
              <li>
                Day 3: Take a guided tour of the city and learn about its
                history
              </li>
              <li>
                Day 4: Relax at a nearby beach or go on a hike in the mountains
              </li>
              <li>Day 5: Take a day trip to a nearby town or attraction</li>
            </ul>
            <p>Here are some ideas for things to do on your trip:</p>
            <ul>
              <li>Hike to the top of the nearest mountain</li>
              <li>Take a cooking class and learn how to make local cuisine</li>
              <li>Visit a museum or historical site</li>
              <li>Relax on a nearby beach or lake</li>
            </ul>
          </section>
          <section
            className="trip-main-content-item"
            title="Itinerary"
            id="itinerary"
          >
            <h2>Itinerary</h2>
            
            <div className="date-range-picker">
              <h3>
                {startDate.toLocaleDateString()} to {endDate.toLocaleDateString()}
              </h3>
              <RangePicker onChange={handleDateRangeChange} value={[dayjs(startDate.toString()), dayjs(endDate.toString())]} />
              
              {/*{error && <Error error={error} />}*/}
            </div>
            <div>
              {itinerary
                .map((item) => ({ ...item, date: new Date(item.date) })) // convert date strings to date objects
                .sort((a, b) => a.date - b.date)
                .map((item) => (
                  <div className="itinerary-details" key={item.id}>
                    <h3>{item.description}</h3>
                  </div>
                ))}
            </div>
            <p>Here's a rough outline of what your trip might look like:</p>
            <ul>
              <li>
                Day 1: Arrive at your destination and check in to your
                accommodations
              </li>
              <li>Day 2: Explore the local area and try some new foods</li>
              <li>
                Day 3: Take a guided tour of the city and learn about its
                history
              </li>
              <li>
                Day 4: Relax at a nearby beach or go on a hike in the mountains
              </li>
              <li>Day 5: Take a day trip to a nearby town or attraction</li>
            </ul>
            <p>Here are some ideas for things to do on your trip:</p>
            <ul>
              <li>Hike to the top of the nearest mountain</li>
              <li>Take a cooking class and learn how to make local cuisine</li>
              <li>Visit a museum or historical site</li>
              <li>Relax on a nearby beach or lake</li>
            </ul>
          </section>
          <section
            className="trip-main-content-item"
            title="Expenses"
            id="expenses"
          >
            <h2>Expenses</h2>
            <p>Here's a rough outline of what your trip might look like:</p>
            <ul>
              <li>
                Day 1: Arrive at your destination and check in to your
                accommodations
              </li>
              <li>Day 2: Explore the local area and try some new foods</li>
              <li>
                Day 3: Take a guided tour of the city and learn about its
                history
              </li>
              <li>
                Day 4: Relax at a nearby beach or go on a hike in the mountains
              </li>
              <li>Day 5: Take a day trip to a nearby town or attraction</li>
            </ul>
          </section>
        </div>
      </Grid>
    </Grid>
  );
}

export default TripContent;
