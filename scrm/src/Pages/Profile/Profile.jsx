import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Avatar } from "@mui/material";
import { Edit } from '@mui/icons-material';
import EditProfile from './EditProfile/EditProfile'
import Api from "../../Helpers/Api";

function Profile({ userId, handleRefresh }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const[firstLetter, setFirstLetter] = useState("");

  useEffect(() => {
    Api.getUser(userId)
      .then((response) => response.json())
      .then((data) => {
        const name = data.name;
        setName(name);
        const email = data.email;
        setEmail(email);
        const first = name.charAt(0).toUpperCase();
        setFirstLetter(first);
      })
      .catch((error) => {
        console.log(
          `Error retrieving user data for user with ID ${userId}: ${error}`
        );
      });
  }, [userId]);

  const handleEditClose = () => {
    setOpen(false);
  };

  const handleEdit = (email, name) => {
    setEmail(email);
    setName(name);
    handleRefresh();
  };

  return (
    <Box
      className="profile-container"
      display="flex"
      flexDirection={"column"}
      maxWidth={500}
      justifyContent={"center"}
      margin="auto"
      marginTop={10}
      padding={3}
      borderRadius={"5px"}
    >
      <Typography
        fontWeight="bold"
        variant="h4"
        textAlign="center"
        marginTop={7}
      >
        Your Profile
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop={3}
        marginBottom={7}
      >
        <Avatar className="profile-icon" sx={{ backgroundColor: '#f87171', fontSize: '60px', width: 120, height: 120}}>{firstLetter}</Avatar>
      </Box>
      <Typography align="left" >Name</Typography>
      <Typography variant="h5">
        {name}
      </Typography>
      <Typography align="left" marginTop={2}>
        Email
      </Typography>
      <Typography variant="h5">{email}</Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop={3}
      >
        <Button sx={{ marginTop: 1, backgroundColor: '#f87171', color: 'hsl(0, 0%, 100%)', '&:hover': {color: '#ff8f66'}}} onClick={() => setOpen(true)} startIcon={<Edit />}>
          Edit profile
        </Button>
        <EditProfile userId={userId} open={open} oldName={name} oldEmail={email} onClose={handleEditClose} onEdit={(email, name) => handleEdit(email, name)} />
      </Box>
    </Box>
  );
}
export default Profile;
