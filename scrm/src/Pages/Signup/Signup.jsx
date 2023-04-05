import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
// import { TextField, Button } from '@material-ui/core';
import './Signup.css';
import Api from '../../Helpers/Api';

function Signup({ handleLogin }) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const { id = 0 } = useParams();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        let errors = [];
        if (name.trim().length === 0) {
            errors.push("Name cannot be empty!");
        }
        if (!/^[a-zA-Z0-9]+$/.test(username) || /\s/.test(username) || /:/.test(username)) {
            errors.push("Username cannot be empty, contain spaces, or have a colon (:) character!");
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.push("Email must be a valid email address!");
        }
        if (password.length < 8 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
            errors.push("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number!");
        }
        if (password !== confirmPassword) {
            errors.push("Passwords do not match!");
        }
        if (errors.length > 0) {
            setError(errors.join("\n"));
        } else {
            try {
                Api.createUser({
                    id, name, username, email, password
                }).then((data) => {
                    navigate("/Home");
                });
                // Handle successful response
            } catch (error) {
                setError('Error signing up!');
            }
        }
    }

    return (
        <div>
            <form>
                <Box display="flex" flexDirection={"column"} maxWidth={400} alignItems="center" justifyContent={"center"} margin="auto" marginTop={10} padding={3} borderRadius={"5px"} boxShadow={"2px 2px 15px"}>
                    <h1>Start KiaKia</h1>
                    <Typography textAlign="center" marginBottom={5}>Create new account</Typography>
                    <TextField label="Name" margin="normal" type={'text'} variant="outlined" placeholder='Name'/>
                    <TextField margin="normal" type={'email'} variant="outlined" placeholder='Email'/>
                    <TextField margin="normal" type={'password'} variant="outlined" placeholder='Password'/>
                    <TextField margin="normal" marginBottom={10} type={'password'} variant="outlined" placeholder='Confirm Password'/>
                    <Button sx={{ marginTop: 3 }} variant="contained" color="warning">Create new account</Button>
                    <Button href="/Login" sx={{ marginTop: 3 }}>Log in</Button>
                </Box>
            </form>
        </div>
    )

    //     return (
    //         <section className="content" key="content">
    //             <form onSubmit={handleSubmit}>
    //                 <TextField
    //                     label="Name"
    //                     value={name}
    //                     onChange={(event) => setName(event.target.value)}
    //                     error={name.trim().length === 0}
    //                     helperText={name.trim().length === 0 ? "Name cannot be empty!" : ""}
    //                     fullWidth
    //                 />
    //                 <TextField
    //                     label="Username"
    //                     value={username}
    //                     onChange={(event) => setUsername(event.target.value)}
    //                     error={!/^[a-zA-Z0-9]+$/.test(username) || /\s/.test(username) || /:/.test(username)}
    //                     helperText={!/^[a-zA-Z0-9]+$/.test(username) || /\s/.test(username) || /:/.test(username) ? "Username cannot be empty, contain spaces, or have a colon (:) character!" : ""}
    //                     fullWidth
    //                 />
    //                 <TextField
    //                     label="Email"
    //                     type="email"
    //                     value={email}
    //                     onChange={(event) => setEmail(event.target.value)}
    //                     error={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
    //                     helperText={!/^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email) ? "Email must be a valid email address!" : ""}
    //                     fullWidth
    //                     />
    //                     <TextField
    //                     label="Password"
    //                     type="password"
    //                     value={password}
    //                     onChange={(event) => setPassword(event.target.value)}
    //                     error={password.length < 8 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)}
    //                     helperText={password.length < 8 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password) ? "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number!" : ""}
    //                     fullWidth
    //                     />
    //                     <TextField
    //                     label="Confirm Password"
    //                     type="password"
    //                     value={confirmPassword}
    //                     onChange={(event) => setConfirmPassword(event.target.value)}
    //                     error={password !== confirmPassword}
    //                     helperText={password !== confirmPassword ? "Passwords do not match!" : ""}
    //                     fullWidth
    //                     />
    //                     <Button
    //                                      type="submit"
    //                                      variant="contained"
    //                                      color="primary"
    //                                      fullWidth
    //                                  >
    //                     Signup
    //                     </Button>
    //                     </form>
    //                     {error && <div className="error">{error}</div>}
    //                     </section>
    //                     );
}

export default Signup;
