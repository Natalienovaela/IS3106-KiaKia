import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import "./profile.css";
import Avatar from '@mui/material/Avatar'
import profile1 from '../../Assets/jonathan.png'
import Api from "../../Helpers/Api";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    const nameValue = event.target.value;
    setName(nameValue);
    setErrors((prevErrors) => ({
      ...prevErrors,
      name: nameValue.trim().length === 0 ? "Name cannot be empty!" : undefined,
    }));
  };

  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)
        ? "Email must be a valid email address!"
        : undefined,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = {};
    if (name.trim().length === 0) {
      formErrors.name = "Name cannot be empty!";
    }
    if (!/^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email)) {
      formErrors.email = "Email must be a valid email address!";
    }
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      Api.createUser({ name, email})
        .then((response) => response.json())
        .then((data) => {
          const userId = data.userId;
          if (!userId) {
            setErrors({ submit: "Failed to sign up. Please try again." });
          } else {
            navigate(`/Home/${userId}`);
          }
        })
        .catch((error) => {
          setErrors({ submit: error.message });
        });
    }
  };
  return (
    <Box
      className="signup-container"
      display="flex"
      flexDirection={"column"}
      maxWidth={500}
      justifyContent={"center"}
      margin="auto"
      marginTop={10}
      padding={3}
      borderRadius={"5px"}
      boxShadow={"2px 2px 15px #ccc"}
    >
      <Typography
        fontWeight="bold"
        variant="h4"
        textAlign="center"
        marginTop={7}
      >
        Your Profile
      </Typography>
      <Avatar alt="Jonathan Reinink" 
                sx={{width: 45, height: 45}} src={profile1}/>
      <form className="signup-form" onSubmit={handleSubmit}>
        <Typography align="left">Name</Typography>
        <TextField
          fullWidth
          variant="outlined"
          margin="dense"
          value={name}
          placeholder="Enter full name"
          onChange={handleNameChange}
          error={Boolean(errors.name)}
          helperText={errors.name}
        />
        <Typography align="left" marginTop={2}>
          Email
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          margin="dense"
          value={email}
          placeholder="Enter email address"
          onChange={handleEmailChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
        {errors.submit && (
          <Typography color="error" className="signup-error">
            {errors.submit}
          </Typography>
        )}
        <Button
          variant="contained"
          type="submit"
          sx={{ marginTop: 3 }}
          className="profile-button"
          fullWidth
        >
          Create new account
        </Button>
      </form>
    </Box>
  );
}
export default Profile;
