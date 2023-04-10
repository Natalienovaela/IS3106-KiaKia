import React, { useState } from 'react';
import { Box, Button, TextField, Typography, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import './CreateTrip.css';
import Api from '../../Helpers/Api';
import { DatePicker } from "antd";
import moment from 'moment-timezone';
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;

function CreateTrip({ userId }) {
  const [country, setCountry] = useState('');
  const [startDate, setStartDate] = useState(moment("2023-05-01", "YYYY-MM-DDTHH:mm:ssZ[UTC]").toDate());
  const [endDate, setEndDate] = useState(moment("2023-05-05", "YYYY-MM-DDTHH:mm:ssZ[UTC]").toDate());
  const [emails, setEmails] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    setEmails([...emails, emailValue]);
  };

  const handleCountryChange = (event) => {
    const countryValue = event.target.value;
    setCountry(countryValue);
    setErrors((prevErrors) => ({
        ...prevErrors,
        country: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(countryValue) ? "Email must be a valid email address!" : undefined
    }));
};

  const handleDateRangeChange = (value) => {
    const start = value[0].toDate();
    console.log(start);
    const end = value[1].toDate();
    console.log(end);

    if (end > start) {
      setStartDate(start, () => { console.log(startDate) });
      setEndDate(end, () => { console.log(endDate) });

      // Api.createItinerary(1, {
      //   startDate: start,
      //   endDate: end,
      // })
      //   .then((data) => {
      //     setItinerary(data);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
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
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      // Api.loginUser(email, password)
      //   .then(response => response.json())
      //   .then(data => {
      //     const userId = data.userId;
      //     navigate(`/Home/${userId}`);
      //     handleLogin(true);
      //   })
      //   .catch((error) => {
      //     console.log(email + " " + password);
      //     setErrors({ submit: error.message });
      //   });
    }
  };
  return (
    <Box className="createtrip-container" display="flex" flexDirection={"column"} maxWidth={500} justifyContent={"center"} margin="auto" marginTop={10} padding={3} borderRadius={"5px"} boxShadow={"2px 2px 15px"}>
      <Typography fontWeight='bold' variant="h4" textAlign="center" marginTop={7}>Create New Trip</Typography>
      <form className="createtrip-form" onSubmit={handleSubmit}>
        <Typography align="left" marginTop={5}>Where to?</Typography>
        <TextField
          fullWidth
          variant="outlined"
          margin="dense"
          value={country}
          placeholder='e.g. Paris, Singapore'
          onChange={handleCountryChange}
          error={Boolean(errors.country)}
          helperText={errors.country}
        />
        <Typography align="left" marginTop={2}>Dates</Typography>
        <RangePicker style={{ marginTop: '5px', background: 'transparent', width: "100%", height: "55px" }} onChange={handleDateRangeChange} value={[dayjs(startDate.toString()), dayjs(endDate.toString())]} />
        <Button sx={{ marginTop: 3 }} startIcon={<Add />}>
          Invite tripmates
        </Button>
        {errors.submit && (
          <Typography color="error" className="createtrip-error">{errors.submit}</Typography>
        )}
        <Button
          variant="contained"
          color="warning"
          type="submit"
          sx={{ marginTop: 3 }}
          className="createtrip-submit-button"
          fullWidth
        >
          Create Trip
        </Button>
      </form>
    </Box>
  );
}
export default CreateTrip;