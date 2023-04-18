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
    onClose();
  };

  return (
    <Modal title="Set Budget" open={open} onClose={onClose} className="modal">
      <form onSubmit={handleSubmit} className="form">
        <Select value={category} onChange={handleCategoryChange} className="select">
          {options.map((option) => (
            <MenuItem key={option.categoryId} value={option.categoryId}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={handleAmountChange}
          inputProps={{ min: 0 }}
          className="input"
        />
        <Button type="submit">Save</Button>
      </form>
    </Modal>
  );
};

export default SetBudgetModal;
