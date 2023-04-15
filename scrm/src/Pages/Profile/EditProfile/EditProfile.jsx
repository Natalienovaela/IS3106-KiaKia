import React, { useState } from "react";
import { Dialog, DialogTitle, InputLabel, DialogContent, DialogActions, Box, Button, TextField, Typography } from "@mui/material";
import { AccountCircle } from '@mui/icons-material';
import Api from "../../../Helpers/Api";

function EditProfile({ userId, open, oldName, oldEmail, onClose, onEdit }) {
  const [name, setName] = useState(oldName);
  const [email, setEmail] = useState(oldEmail);
  const [errors, setErrors] = useState({});

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

  const handleCancel = () => {
    setErrors({});
    setName(oldName);
    setEmail(oldEmail);
    onClose();
  };

  const handleEdit = (event) => {
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
      Api.updateUser(userId, { name, email })
        .then((response) => response.json())
        .then((data) => {
          const userId = data.userId;
          if (!userId) {
            setErrors({ submit: "Failed to edit. Please try again." });
          } else {
            onEdit(email, name);
            onClose();
          }
        })
        .catch((error) => {
          setErrors({ submit: error.message });
        });
    }
  };
  return (
    <Dialog open={open} onClose={onClose} >
      <DialogTitle textAlign="center"> Edit Profile</DialogTitle>
      <DialogContent>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop={3}
          marginBottom={5}
        >
          <AccountCircle className="editprofile-icon" fontSize="large" sx={{ fontSize: "150px" }} />
        </Box>
        <Box mt={2}>
          <InputLabel id="name">Name</InputLabel>
          <TextField
            autoFocus
            labelId="name"
            input="text"
            value={name || oldName}
            placeholder="Name"
            onChange={handleNameChange}
            fullWidth
            variant="outlined"
            margin="dense"
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
          <InputLabel id="email">Email</InputLabel>
          <TextField
            autoFocus
            labelId="name"
            input="text"
            value={email || oldEmail}
            placeholder="Enter email"
            onChange={handleEmailChange}
            fullWidth
            variant="outlined"
            margin="dense"
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="secondary">
          Cancel
        </Button>
        {errors.submit && (
          <Typography color="error" className="edit-error">
            {errors.submit}
          </Typography>
        )}
        <Button onClick={handleEdit} className="Save">
          Save
        </Button>
      </DialogActions>
    </Dialog>


    //     <Button
    //       variant="contained"
    //       type="submit"
    //       sx={{ marginTop: 3 }}
    //       className="profile-button"
    //       fullWidth
    //     >
    //       Save 
    //     </Button>
    //     <Button
    //       variant="contained"
    //       type="submit"
    //       sx={{ marginTop: 3 }}
    //       className="profile-button"
    //       fullWidth
    //     >
    //       Cancel 
    //     </Button>
    //   </form>
    // </Box>
  );
}
export default EditProfile;
