import { useParams } from "react-router-dom";
import React, { useCallback, useState, useEffect } from "react";
import { Link, animateScroll } from "react-scroll";
import { Divider, Grid, Popover } from "@mui/material";
import Api from "../../Helpers/Api";
import { DatePicker } from "antd";
import moment from "moment-timezone";
import dayjs from "dayjs";
import japan from "../../Assets/japan2.jpg";
import { ConfigProvider } from "antd";
import "./tripcontent.css";
import "../../Components/TripComponents/Itinerary";
import Checklist from "../../Components/TripComponents/Checklist";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import utc from "dayjs/plugin/utc";

import EditIcon from "@mui/icons-material/Edit";
import TripNotes from "../../Components/TripComponents/TripNotes";
import TripPolls from "../../Components/TripComponents/TripPolls";
import Itinerary from "../../Components/TripComponents/Itinerary";
import Expenses from "../../Components/TripComponents/Expenses";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
const { RangePicker } = DatePicker;

function TripContent() {
  //TO DO: change back to useParams and delete the hardcoded id
  const { userId, tripId } = useParams();
  // const id = 1;
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
  const [userRole, setUserRole] = useState(null);
  // console.log(isTripShared);
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
    console.log("reload data triggered");
    Promise.all([
      Api.getUserRole(userId, tripId)
        .then((res) => res.json())
        .then((data) => {
          console.log("USER ROLE" + data);
          setUserRole(data);
        }),
      Api.getTrip(tripId)
        .then((res) => res.json())
        .then((trip) => {
          const { name, startDate, endDate, itinerary, isShared } = trip;
          setName(name);
          setItinerary(itinerary);
          setStartDate(moment(startDate, "YYYY-MM-DDTHH:mm:ssZ[UTC]").toDate());
          setEndDate(moment(endDate, "YYYY-MM-DDTHH:mm:ssZ[UTC]").toDate());
          console.log(endDate - startDate);
          setIsTripShared(isShared);
        }),
    ]);
  }, []);

  useEffect(() => {
    reloadData();
  }, [reloadData]);

  const handleShareButtonClick = () => {
    // confirmAlert({
    //   title: isTripShared? 'Are you sure you want to unshare this trip?' : 'Are you sure you want to share this trip?',
    //   message: 'Sharing trip means your trip will be visible to the public and they can refer to your trip to plan their future trip.'
    //   buttons: [
    //     {label:'Yes',
    //     onClick: () => {
    if (!isTripShared) {
      Api.shareTrip(tripId).then(() => {
        reloadData();
        setOpen(false);
      });
    } else {
      Api.unshareTrip(tripId).then(() => {
        reloadData();
        setOpen(false);
      });
    }
    //     }
    //   },
    //   {label: 'No'}
    //   ]
    // })
  };

  const sharedStyles = {
    bgcolor: "var(--PrimaryColor)",
    ":hover": {
      bgcolor: "var(--SecondaryColor)",
      color: "white",
    },
  };

  const unsharedStyles = {
    bgcolor: "var(--SecondaryColor)",
    ":hover": {
      bgcolor: "var(--PrimaryColor)",
      color: "white",
    },
  };

  //for sharing trip
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {isTripShared != null && (
        <Grid container>
          <Grid item xs={12}>
            <section className="trip-header">
              <div className="banner">
                <img src={japan} alt="japan" className="banner-img" />
                {userRole === "ADMIN" && (
                  <button
                    onClick={handleClickOpen}
                    className="btn btn-banner"
                    // sx={isTripShared ? sharedStyles : unsharedStyles}
                  >
                    {isTripShared ? "Unshare Trip" : "Share Trip"}
                  </button>
                )}
                <div className="banner-details">
                  <h2>{name}</h2>
                  <div className="banner-details-2">
                    <p className="trip-num-of-days">1 day</p>
                    <p>5 people</p>
                  </div>
                </div>
              </div>
            </section>
          </Grid>
          <div className="hide-grid">
            <Grid item>
              <aside className="trip-sidebar">
                <ul className="trip-sidebar-list">
                  <li className="trip-sidebar-list-item">
                    <Link
                      activeClass="active"
                      to="notes"
                      spy={true}
                      smooth={true}
                      duration={500}
                    >
                      Notes
                    </Link>
                  </li>
                  <li className="trip-sidebar-list-item">
                    <Link
                      activeClass="active"
                      to="polls"
                      spy={true}
                      smooth={true}
                      duration={500}
                    >
                      Polls
                    </Link>
                  </li>

                  <li className="trip-sidebar-list-item">
                    <Link
                      activeClass="active"
                      to="itinerary"
                      spy={true}
                      smooth={true}
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
                      duration={500}
                    >
                      Expenses
                    </Link>
                  </li>
                </ul>
              </aside>
            </Grid>
          </div>
          <Grid item xs>
            <div className="trip-main-content">
              <section className="trip-main-content-item" id="notes">
                <TripNotes
                  tripId={tripId}
                  userId={userId}
                  userRole={userRole}
                />
              </section>
              <span className="line"></span>

              <section className="trip-main-content-item">
                <TripPolls
                  tripId={tripId}
                  userId={userId}
                  userRole={userRole}
                />
              </section>
              <span className="line"></span>

              {/* <section
                className="trip-main-content-item"
                title="Checklist"
                id="checklists"
              >
                }
                <Checklist
                  tripId={tripId}
                  userRole={userRole}
                  userId={userId}
                />
              </section> */}
              <span className="line"></span>
              <section
                className="trip-main-content-item"
                title="Itinerary"
                id="itinerary"
              >
                <Itinerary tripId={tripId} userRole={userRole} />
              </section>
              <span className="line"></span>
              <section
                className="trip-main-content-item"
                title="Expenses"
                id="expenses"
              >
                <h2>Expenses</h2>
                <Expenses tripId={tripId} userId={userId} />
              </section>
            </div>
          </Grid>
        </Grid>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {!isTripShared ? "Share your trip to public?" : "Unshare your trip?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {!isTripShared
              ? "Sharing your trip makes your trip including notes, itineraries, and expenses visible to public in the Explore page. This will help others in planning their trip!"
              : "Unsharing your trip will remove your trip from the Explore page."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleShareButtonClick}>
            {isTripShared ? "Unshare" : "Share"}
          </Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TripContent;
