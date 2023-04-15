import React, { useState } from "react";
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

const Poll = ({ userId, tripId, poll }) => {
  const pollId = poll.pollId;
  const optionsUnmapped = poll.options;
  const options = Object.entries(optionsUnmapped).map(([key, value]) => ({
    id: key,
    value: value,
  }));

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    console.log(event.target.value);
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    Api.submitPoll(tripId, userId, pollId, event.target.value);
  };

  return (
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
  );
};

export default Poll;
