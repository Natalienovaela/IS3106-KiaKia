import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

const Modal = ({ title, open, onClose, children }) => {
  return (
    <Dialog open={open} onClose={onClose} className="modal">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;