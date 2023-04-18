import React, { useState } from "react";
import { Button, Select, MenuItem, TextField } from "@mui/material";
import Modal from "../Modal/Modal";
import Api from "../../../Helpers/Api";

const SetBudgetModal = ({ open, onClose, options, tripId }) => {
  const [category, setCategory] = useState(null);
  const [amount, setAmount] = useState(0);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = () => {
    Api.setBudget(tripId, category, amount)
      .then(() => console.log('Budget updated successfully'))
      .catch((error) => console.log(error));
  };

  return (
    <Modal title="Set Budget" open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <Select value={category} onChange={handleCategoryChange}>
          {options.map((option) => (
            <MenuItem key={option.key} value={option.key}>
              {option.value}
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
