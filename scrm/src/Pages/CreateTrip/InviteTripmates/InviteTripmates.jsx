import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, InputLabel, DialogActions, Box, Select, MenuItem, Button, TextField, Typography } from '@mui/material';
import Api from "../../../Helpers/Api";

function InviteTripmates({ open, onClose, onInvite }) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState({});

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(event.target.value)
        ? "Email must be a valid email address!"
        : undefined,
    }));
  };

  const handleCancel = () => {
    setEmail('');
    setRole('');
    setErrors({});
    onClose();
  };

  const handleInvite = (event) => {
    event.preventDefault();
    const formErrors = {};
    if (!/^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email)) {
      formErrors.email = "Email must be a valid email address!";
    }
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      Api.emailExists(email)
        .then((response) => response.json())
        .then((data) => {
          if (data.exists) {
            onInvite(email, role);
            setEmail('');
            setRole('');
            onClose();
          } else {
            throw new Error("No user found with the provided email!");
          };
        })
        .catch((error) => {
          setErrors({ submit: error.message });
        });
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle textAlign="center"> Invite Tripmates</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1">Enter email and role for each tripmate:</Typography>
        <Box mt={2}>
        <InputLabel id="email">Email</InputLabel>
          <TextField
            autoFocus
            labelid="email"
            input="text"
            value={email}
            placeholder="Enter email"
            onChange={handleEmailChange}
            fullWidth
            variant="outlined"
            margin="dense"
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
        </Box>
        <Box mt={3}>
        <InputLabel id="role-select">Invite them as</InputLabel>
          <Select
            labelid="role-select"
            placeholder="Select role"
            value={role}
            onChange={handleRoleChange}
            fullWidth
            variant="outlined"
            margin="dense"
          >
            <MenuItem value="ADMIN">Admin</MenuItem>
            <MenuItem value="EDITOR">Editor</MenuItem>
            <MenuItem value="VIEWER">Viewer</MenuItem>
          </Select>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="secondary">
          Cancel
        </Button>
        {errors.submit && (
          <Typography color="error" className="invite-error">
            {errors.submit}
          </Typography>
        )}
        <Button onClick={handleInvite} className="invite">
          Invite
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default InviteTripmates;
