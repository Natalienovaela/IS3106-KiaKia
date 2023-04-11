import React, { useState } from 'react';
import { Box, Button, TextField, Typography, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
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
  const [country, setCountry] = useState('');
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState(moment("2023-05-01", "YYYY-MM-DDTHH:mm:ssZ[UTC]").toDate());
  const [endDate, setEndDate] = useState(moment("2023-05-05", "YYYY-MM-DDTHH:mm:ssZ[UTC]").toDate());
  const [emails, setEmails] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInviteOpen = () => {
    setOpen(true);
  };

  const handleInviteClose = () => {
    setOpen(false);
  };

  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    setEmails([...emails, emailValue]);
  };

  const handleCountryChange = (event) => {
    const countryValue = event.target.value;
    setCountry(countryValue);
    setName(countryValue);
    setErrors((prevErrors) => ({
      ...prevErrors,
      country: countryValue.trim().length === 0 ? "Country cannot be empty!" : undefined,
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
    if (country.trim().length === 0) {
      formErrors.country = "Country cannot be empty!";
    }
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      Api.createTrip({ name, startDate, endDate}, userId)
        .then(response => response.json())
        .then(data => {
          navigate(`/TripContent`);
        })
        .catch((error) => {
          setErrors({ submit: error.message });
        });
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
        <Button sx={{ marginTop: 3 }} onClick={() => setOpen(true)} startIcon={<Add />}>
          Invite tripmates
        </Button>
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
        <InviteTripmates open={open} onClose={handleInviteClose} />
      </form>
    </Box>
  )
}
export default CreateTrip;