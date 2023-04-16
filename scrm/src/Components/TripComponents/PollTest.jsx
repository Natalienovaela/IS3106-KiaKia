// const Poll = ({tripId, poll}) => {
//     const creator = poll.creator.name;
//     const question = poll.description;
//     const[pol]
//     return (  );

// }

// export default Poll;

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

const options = [
  { id: 1, value: "Option 1" },
  { id: 2, value: "Option 2" },
  { id: 3, value: "Option 3" },
  { id: 4, value: "Option 4" },
];

const PollTest = ({ tripId, poll }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [voteCount, setVoteCount] = useState({});

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedOption) {
      const newVoteCount = { ...voteCount };
      newVoteCount[selectedOption] = (newVoteCount[selectedOption] || 0) + 1;
      setVoteCount(newVoteCount);
      setSelectedOption(null);
    }
  };

  const getTotalVotes = () => {
    return Object.values(voteCount).reduce((total, count) => total + count, 0);
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            {getTotalVotes() === 0
              ? "Which option do you prefer?"
              : "Poll Results"}
          </Typography>
        </Box>
        {getTotalVotes() === 0 ? (
          <RadioGroup value={selectedOption} onChange={handleOptionChange}>
            {options.map((option) => (
              <FormControlLabel
                key={option.id}
                value={option.value}
                control={<Radio />}
                label={option.value}
              />
            ))}
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </RadioGroup>
        ) : (
          <div>
            {options.map((option) => (
              <div key={option.id}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 4,
                  }}
                >
                  <Typography variant="body1">{option.value}</Typography>
                  <Typography variant="body1">
                    {Math.round(
                      ((voteCount[option.value] || 0) / getTotalVotes()) * 100
                    )}
                    %
                  </Typography>
                </div>
                <LinearProgress
                  variant="determinate"
                  value={
                    ((voteCount[option.value] || 0) / getTotalVotes()) * 100
                  }
                  color="primary"
                  style={{
                    height: 12,
                    borderRadius: 6,
                    overflow: "hidden",
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PollTest;
