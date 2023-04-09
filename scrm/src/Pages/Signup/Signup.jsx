import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";
import Api from "../../Helpers/Api";

function Signup({ handleLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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

  const handlePasswordChange = (event) => {
    const passwordValue = event.target.value;
    setPassword(passwordValue);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password:
        passwordValue.length < 8 ||
        !/[a-z]/.test(passwordValue) ||
        !/[A-Z]/.test(passwordValue) ||
        !/[0-9]/.test(passwordValue)
          ? "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number!"
          : undefined,
      confirmPassword:
        confirmPassword !== passwordValue
          ? "Passwords do not match!"
          : undefined,
    }));
  };

  const handleConfirmPasswordChange = (event) => {
    const confirmPasswordValue = event.target.value;
    setConfirmPassword(confirmPasswordValue);
    setErrors((prevErrors) => ({
      ...prevErrors,
      confirmPassword:
        confirmPasswordValue !== password
          ? "Passwords do not match!"
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
    if (
      password.length < 8 ||
      !/[a-z]/.test(password) ||
      !/[A-Z]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
      formErrors.password =
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number!";
    }
    if (confirmPassword !== password) {
      formErrors.confirmPassword = "Passwords do not match!";
    }
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      Api.createUser({ name, email, password })
        .then((response) => response.json())
        .then((data) => {
          const userId = data.userId;
          navigate(`/Home/${userId}`);
          handleLogin(true);
        })
        .catch((error) => {
          console.log(email + " " + password);
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
        Start KiaKia
      </Typography>
      <Typography textAlign="center" marginBottom={5}>
        Create new account
      </Typography>
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
        <Typography align="left" marginTop={2}>
          Password
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          margin="dense"
          type={showPassword ? "text" : "password"}
          value={password}
          placeholder="Enter password"
          onChange={handlePasswordChange}
          error={Boolean(errors.password)}
          helperText={errors.password}
          InputProps={{
            endAdornment: (
              <Button
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </Button>
            ),
          }}
        />
        <Typography align="left" marginTop={2}>
          Confirm Password
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          margin="dense"
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          placeholder="Enter same password"
          onChange={handleConfirmPasswordChange}
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword}
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
          className="signup-submit-button"
          fullWidth
        >
          Create new account
        </Button>
        <Typography
          align="left"
          marginTop={2}
          style={{ display: "inline-block" }}
        >
          Have an existing account?{" "}
          <Link
            to="/Login"
            className="action-link flex"
            style={{ display: "inline-block" }}
          >
            {" "}
            Log in
          </Link>
        </Typography>
      </form>
    </Box>
  );
}
export default Signup;
