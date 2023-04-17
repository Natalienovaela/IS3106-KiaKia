import React, { useState } from "react";
import { Box, Button, TextField, Typography, Alert, Snackbar } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./ResetPassword.css";
import Api from "../../Helpers/Api";

function ResetPassword({ userId }) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = React.useState(false);
    const vertical = "top";
    const horizontal = "center";

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
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

            Api.resetPassword({ userId, password })
                .then((response) => response.json())
                .then((data) => {
                    const id = data.userId;
                    if (!id) {
                        setErrors({ submit: "Failed to reset password. Please try again." });
                    } else {
                        setSnackbarOpen(true);
                    }
                })
                .catch((error) => {
                    setErrors({ submit: error.message });
                });
        }
    };
    return (
        <Box
            className="reset-container"
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
                marginBottom={5}
            >
                Reset Password
            </Typography>
            <form className="reset-form" onSubmit={handleSubmit}>
                <Typography align="left" marginTop={2}>
                    New password
                </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    placeholder="Enter new password"
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
                    New password again
                </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    placeholder="Enter new password again"
                    onChange={handleConfirmPasswordChange}
                    error={Boolean(errors.confirmPassword)}
                    helperText={errors.confirmPassword}
                />
                {errors.submit && (
                    <Typography color="error" className="reset-error">
                        {errors.submit}
                    </Typography>
                )}
                {/* {!open ? ( */}
                <Button
                    variant="contained"
                    type="submit"
                    sx={{ marginTop: 3 }}
                    className="reset-submit-button"
                    fullWidth
                >
                    Set new password
                </Button>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000} // Optional: set duration for auto hiding
                    onClose={() => setSnackbarOpen(false)} // Optional: handle close event
                    key={vertical + horizontal}
                    anchorOrigin={{ vertical, horizontal }}
                >
                    <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
                        Password reset successfully!
                    </Alert>
                </Snackbar>
                {/* // ) : (
                //     <ResetSuccess />
                // )} */}
            </form>
        </Box>
    );
}
export default ResetPassword;
