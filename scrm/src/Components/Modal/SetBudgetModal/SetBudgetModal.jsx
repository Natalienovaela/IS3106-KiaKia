import React, { useState } from "react";
import { Button, Select, MenuItem, TextField } from "@material-ui/core";
import Modal from "../Modal/Modal";

const SetBudgetModal = ({ open, onClose, options }) => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = () => {
    // handle form submission
  };

  return (
    <Modal title="Set Budget" open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <Select value={category} onChange={handleCategoryChange}>
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
          inputProps={{ min: 0 }}
        />
        <Button type="submit">Save</Button>
      </form>
    </Modal>
  );
};

export default SetBudgetModal;
