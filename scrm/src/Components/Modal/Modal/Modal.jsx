import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";

const Modal = ({ title, open, onClose, children }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;