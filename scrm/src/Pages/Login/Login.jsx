import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Api from '../../Helpers/Api';

function Login({ handleLogin }) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error] = useState(null);
    const navigate = useNavigate();

    const validateName = () => {
        return name.trim().length > 0;
    };

    const validateUsername = () => {
        return /^[a-zA-Z0-9]+$/.test(username) && !/\s/.test(username) && !/:/.test(username);
    };
    
    const validateEmail = () => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    
    const validatePassword = () => {
        return password.length >= 8 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password);
    };
    
    const validateConfirmPassword = () => {
        return password === confirmPassword;
    };
    

    const handleSubmit = (event) => {
        event.preventDefault();
        let errors = [];
        if (!validateName()) {
            errors.push("Name cannot be empty!");
        }
        if (!validateUsername()) {
            errors.push("Username cannot be empty, contain spaces, or have a colon (:) character!");
        }
        if (!validateEmail()) {
            errors.push("Email must be a valid email address!");
        }
        if (!validatePassword()) {
            errors.push("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number!");
        }
        if (!validateConfirmPassword()) {
            errors.push("Passwords do not match!");
        }
        if (errors.length > 0) {
            alert(errors.join("\n"));
        } else {
            try {
                const response = Api.createUser({
                    name, username, email, password
                }).then((data) => {
                    navigate("/Home");
                });
                // Handle successful response
            } catch (error) {
                alert('Error signing up!');
            }
        }
    }

    return (
        <section className="content" key="content">
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
                </label>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </label>
                <label>
                    Confirm Password:
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                </label>
                {error && <div className="error">{error}</div>}
                <button type="submit">Sign up</button>
            </form>
        </section>
    );
}

export default Login;
