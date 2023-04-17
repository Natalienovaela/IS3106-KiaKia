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
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Api from "../../Helpers/Api";

const Poll = ({ userId, tripId, pollId, userRole, setPolls }) => {
  const [poll, setPoll] = useState(null);

  const [options, setOptions] = useState(null);

  const [selectedOption, setSelectedOption] = useState(null);

  const [submitted, setSubmitted] = useState(null);

  const [percentage, setPercentage] = useState(null);

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
        console.log("poll " + data);
        setPoll(data);
        const optionsUnmapped = data.options;
        const options = Object.entries(optionsUnmapped).map(([key, value]) => ({
          id: key,
          value: value,
        }));
        // console.log("options " + options);
        setOptions(options);
        return options;
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
        // console.log("participation " + data);
        setSubmitted(data);
        return data;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const reloadPercentage = () => {
    Api.calculatePercentage(tripId, pollId)
      .then((res) => {
        if (!res.ok) {
          //http OK from server
          console.log("error");
          throw Error("could not fetch data");
        }
        return res.json(); //return another promise of data
      })
      .then((data) => {
        // console.log("percentage " + data);
        setPercentage(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    reloadPoll();
    reloadParticipation();
  }, []);

  useEffect(() => {
    reloadPercentage();
  }, [submitted]);

  const handleOptionChange = (event) => {
    // console.log(event.target.value);
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async () => {
    if (selectedOption != null) {
      await Api.submitPoll(tripId, userId, pollId, selectedOption); // wait for the API request to complete
      reloadPoll();
      reloadParticipation();
      reloadPercentage();
    } else {
      //throw error here
    }
  };

  const handleDelete = () => {
    Api.deletePoll(tripId, pollId, userId)
      .then((res) => {
        if (!res.ok) {
          //http OK from server
          console.log("error");
          throw Error("could not fetch data");
        }
        return res.json(); //return another promise of data
      })
      .then((data) => {
        // console.log("percentage " + data);
        setPolls(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // const handleSubmit = () => {
  //   if (selectedOption != null) {
  //     Api.submitPoll(tripId, userId, pollId, selectedOption);
  //     reloadPoll();
  //     reloadParticipation();
  //     reloadPercentage();
  //   } else {
  //     //throw error here
  //   }
  // };

  return (
    <>
      {poll &&
        options &&
        submitted != null &&
        (!submitted || (submitted && percentage)) && (
          <>
            <div className="rowComponent" key={pollId}>
              <Card className="pollCard">
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      {poll.description}
                    </Typography>
                  </Box>
                  {!submitted && userRole !== "VIEWER" && (
                    <RadioGroup
                      value={selectedOption}
                      onChange={handleOptionChange}
                    >
                      {options.map((option) => (
                        <FormControlLabel
                          key={option.id}
                          value={option.id}
                          control={<Radio />}
                          label={option.value}
                        />
                      ))}
                      <Button
                        className="btn"
                        variant="contained"
                        onClick={handleSubmit}
                      >
                        Submit
                      </Button>
                    </RadioGroup>
                  )}
                  {(submitted || userRole === "VIEWER") && (
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
                            <Typography variant="body1">
                              {option.value}
                            </Typography>
                            <Typography variant="body1">
                              {Math.round(percentage[option.id] * 100)}%
                            </Typography>
                          </div>
                          <LinearProgress
                            variant="determinate"
                            value={percentage[option.id] * 100}
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
              <div>
                <IconButton onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          </>
        )}
    </>
  );
};

export default Poll;
