import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import Api from "../../Helpers/Api";

function Login({ handleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
        passwordValue.length === 0 ? "Please enter your password" : undefined,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = {};
    if (!/^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email)) {
      formErrors.email = "Email must be a valid email address!";
    }
    if (password.length === 0) {
      formErrors.password = "Please enter your password";
    }
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      Api.loginUser(email, password)
        .then((response) => response.json())
        .then((data) => {
          const userId = data.userId;
          navigate(`/Home/${userId}`);
          handleLogin(userId);
        })
        .catch((error) => {
          console.log(email + " " + password);
          setErrors({ submit: error.message });
        });
    }
  };
  return (
    <Box
      className="login-container"
      display="flex"
      flexDirection={"column"}
      maxWidth={500}
      justifyContent={"center"}
      margin="auto"
      marginTop={10}
      padding={3}
      borderRadius={"15px"}
      boxShadow={"0px 2px 10px #ccc"}
    >
      <Typography
        fontWeight="bold"
        variant="h4"
        textAlign="center"
        marginTop={7}
      >
        Welcome Back
      </Typography>
      <Typography textAlign="center" marginBottom={5}>
        Please enter your details
      </Typography>
      <form className="login-form" onSubmit={handleSubmit}>
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
        <Typography
          align="left"
          marginTop={2}
          style={{ display: "inline-block" }}
        >
          Password{" "}
          <Link
            to="/Login"
            className="action-link flex"
            style={{
              display: "inline-block",
              float: "right",
              marginLeft: "10px",
            }}
          >
            Forgot password
          </Link>
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
        {errors.submit && (
          <Typography color="error" className="login-error">
            {errors.submit}
          </Typography>
        )}
        <Button
          variant="contained"
          type="submit"
          sx={{ marginTop: 3 }}
          className="login-submit-button"
          fullWidth
        >
          Log in
        </Button>
        <Typography
          align="left"
          marginTop={2}
          style={{ display: "inline-block" }}
        >
          New to KiaKia?{" "}
          <Link
            to="/Signup"
            className="action-link flex"
            style={{ display: "inline-block" }}
          >
            Sign up
          </Link>
        </Typography>
      </form>
    </Box>
  );
}
export default Login;
