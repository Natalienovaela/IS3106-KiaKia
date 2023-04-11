import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from '@mui/material';

function InviteTripmates({ open, onClose, onInvite }) {
  const [emails, setEmails] = React.useState('');

  const handleEmailsChange = (event) => {
    setEmails(event.target.value);
  };

  const handleInvite = () => {
    onInvite(emails.split(','));
    setEmails('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Invite Friends</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Invite your friends to join this trip!
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Emails"
          type="text"
          fullWidth
          value={emails}
          onChange={handleEmailsChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleInvite} disabled={!emails} variant="contained" color="primary">
          Invite
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default InviteTripmates;
