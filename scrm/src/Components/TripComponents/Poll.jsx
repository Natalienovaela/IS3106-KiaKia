import React, { useState, useEffect } from "react";
import {
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  LinearProgress,
  Button,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import Api from "../../Helpers/Api";

const Poll = ({ userId, tripId, pollId }) => {
  const [poll, setPoll] = useState(null);

  const [options, setOptions] = useState(null);

  const [selectedOption, setSelectedOption] = useState(null);

  const [submitted, setSubmitted] = useState(null);

  const reloadPoll = () => {
    Api.getPoll(tripId, pollId)
      .then((res) => {
        if (!res.ok) {
          //http OK from server
          console.log("error");
          throw Error("could not fetch data");
        }
        return res.json(); //return another promise of data
      })
      .then((data) => {
        setPoll(data);
        const optionsUnmapped = data.options;
        const options = Object.entries(optionsUnmapped).map(([key, value]) => ({
          id: key,
          value: value,
        }));
        setOptions(options);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const reloadParticipation = () => {
    Api.hasPolled(tripId, pollId, userId)
      .then((res) => {
        if (!res.ok) {
          //http OK from server
          console.log("error");
          throw Error("could not fetch data");
        }
        return res.json(); //return another promise of data
      })
      .then((data) => {
        setSubmitted(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    reloadPoll();
    reloadParticipation();
  }, []);

  const handleOptionChange = (event) => {
    console.log(event.target.value);
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedOption != null) {
      Api.submitPoll(tripId, userId, pollId, selectedOption);
      reloadParticipation();
    } else {
      //throw error here
    }
  };

  return (
    <>
      {submitted != null && !submitted && (
        <Card>
          <CardContent>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                {poll.description}
              </Typography>
            </Box>

            <RadioGroup value={selectedOption} onChange={handleOptionChange}>
              {options.map((option) => (
                <FormControlLabel
                  key={option.id}
                  value={option.id}
                  control={<Radio />}
                  label={option.value}
                />
              ))}
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </RadioGroup>
          </CardContent>
        </Card>
      )}
      {submitted && <p>You have submitted the poll</p>}
    </>
  );
};

export default Poll;
