import React, { useState, useEffect } from 'react';
import { Box, Chip, Avatar, Button, TextField, Typography, IconButton, Autocomplete } from '@mui/material';
import { Add, RemoveCircleOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import './CreateTrip.css';
import Api from '../../Helpers/Api';
import { DatePicker } from "antd";
import moment from 'moment-timezone';
import dayjs from 'dayjs';
import InviteTripmates from './InviteTripmates/InviteTripmates';
const { RangePicker } = DatePicker;

function CreateTrip({ userId }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('');
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState(moment("2023-05-01", "YYYY-MM-DDTHH:mm:ssZ[UTC]").toDate());
  const [endDate, setEndDate] = useState(moment("2023-05-05", "YYYY-MM-DDTHH:mm:ssZ[UTC]").toDate());
  const [emails, setEmails] = useState([]);
  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    Api.getCountryList()
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => {
        console.log("Error while retrieving country list");
      });
  }, []);

  const handleInviteClose = () => {
    setOpen(false);
  };

  const handleInvite = (email, role) => {
    if (emails.includes(email)) {
      // Email already exists, do nothing
      return;
    }
    setEmails([...emails, email]);
    setRoles([...roles, role]);
  };

  const handleRemoveEmail = (index) => {
    const updatedEmails = [...emails];
    updatedEmails.splice(index, 1);
    setEmails(updatedEmails);

    const updatedRoles = [...roles];
    updatedRoles.splice(index, 1);
    setRoles(updatedRoles);
  };

  const handleCountryChange = (event, countryValue) => {
    setCountry(countryValue);
    const formattedValue =
      countryValue && countryValue.length > 0
        ? countryValue.charAt(0).toUpperCase() + countryValue.slice(1).toLowerCase()
        : null;
    setName(formattedValue);
    setErrors((prevErrors) => ({
      ...prevErrors,
      country: countryValue.trim().length === 0 ? "Please select a country" : undefined,
    }));
  };

  const handleDateRangeChange = (value) => {
    const start = value[0].toDate();
    const end = value[1].toDate();

    if (end > start) {
      setStartDate(start, () => { console.log(startDate) });
      setEndDate(end, () => { console.log(endDate) });
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        endDate: "End date must be after start date"
      }));
      return;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = {};
    const serializedRoles = roles.join(',');
    const serializedEmails = emails.join(',');
    if (country.trim().length === 0) {
      formErrors.country = "Country cannot be empty!";
    }
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      Api.createAndInviteUserToTrip({ name, startDate, endDate, country }, userId, serializedEmails, serializedRoles)
        .then(response => response.json())
        .then(data => {
          const tripId = data.tripId;
          console.log(tripId);
          navigate(`/TripContent`);
        })
        .catch((error) => {
          setErrors({ submit: error.message });
        });
      // Api.createTrip({ name, startDate, endDate }, userId)
      //   .then(response => response.json())
      //   .then(data => {
      //     navigate(`/TripContent`);
      //   })
      //   .catch((error) => {
      //     setErrors({ submit: error.message });
      //   });
    }
  };
  return (
    <Box className="createtrip-container" display="flex" flexDirection={"column"} maxWidth={500} justifyContent={"center"} margin="auto" marginTop={10} padding={3} borderRadius={"5px"} boxShadow={"2px 2px 15px"}>
      <Typography fontWeight='bold' variant="h4" textAlign="center" marginTop={7}>Create New Trip</Typography>
      <form className="createtrip-form" onSubmit={handleSubmit}>
        <Typography align="left" marginTop={5}>Where to?</Typography>
        {/* <TextField
          fullWidth
          variant="outlined"
          margin="dense"
          value={country}
          placeholder='e.g. Paris, Singapore'
          onChange={handleCountryChange}
          error={Boolean(errors.country)}
          helperText={errors.country}
        /> */}
        <Autocomplete
        value={country}
        onChange={handleCountryChange}
        inputValue={value}
        onInputChange={(event, newInputValue) => {
          setValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={countries}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} placeholder="e.g. Japan, Singapore" 
          error={Boolean(errors.country)}
          helperText={errors.country}
          />
        )}
      />
        <Typography align="left" marginTop={2}>Dates</Typography>
        <RangePicker style={{ marginTop: '5px', background: 'transparent', width: "100%", height: "55px" }} onChange={handleDateRangeChange} value={[dayjs(startDate.toString()), dayjs(endDate.toString())]} />
        <Button sx={{ marginTop: 1 }} onClick={() => setOpen(true)} startIcon={<Add />}>
          Invite tripmates
        </Button>
        {emails.map((email, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            marginTop={1}
            marginBottom={1}
            borderRadius={'5px'}
            paddingLeft={1}
            paddingRight={1}
            paddingTop={0.5}
            paddingBottom={0.5}
          >
            <Chip label={email} avatar={<Avatar>M</Avatar>} size="small" />
            <Chip label={roles[index]} color="primary" size="small" />
            {/* Display role using Chip component */}
            <IconButton onClick={() => handleRemoveEmail(index)} size="small">
              <RemoveCircleOutline fontSize="small" color="error" />
            </IconButton>
          </Box>
        ))}
        {errors.submit && (
          <Typography color="error" className="createtrip-error">{errors.submit}</Typography>
        )}
        <Button
          variant="contained"
          type="submit"
          sx={{ marginTop: 3 }}
          className="createtrip-submit-button"
          fullWidth
        >
          Create Trip
        </Button>
        <InviteTripmates open={open} onClose={handleInviteClose} onInvite={(email, role) => handleInvite(email, role)} />
      </form>
    </Box>
  )
}
export default CreateTrip;