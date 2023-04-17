import React, { useState } from "react";
import { Button, Select, MenuItem, TextField } from "@material-ui/core";
import Modal from "../Modal/Modal";

const SettleDebtModal = ({ open, onClose, maxValue, options }) => {
  const [person, setPerson] = useState("");
  const [amount, setAmount] = useState("");

  const handlePersonChange = (e) => {
    setPerson(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = () => {
    // handle form submission
  };

  return (
    <Modal title="Settle Debt" open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <Select value={person} onChange={handlePersonChange}>
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={handleAmountChange}
          inputProps={{ min: 0, max: maxValue }}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Modal>
  );
};

export default SettleDebtModal;
