import React, { useEffect, useState } from "react";
import "./SetBudgetModal.css"
import { Button, Select, MenuItem, TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "../Modal/Modal";
import Api from "../../../Helpers/Api";

const SetBudgetModal = ({ open, onClose, options, tripId }) => {
  const [category, setCategory] = useState(null);
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open) {
      setCategory(null);
      setAmount(0);
      setError(null);
    }
  }, [open]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    if (value <= 0) {
      setError("Amount must be greater than 0");
    } else {
      setError(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount <= 0) {
      setError("Amount must be greater than 0");
      return;
    }
    Api.setBudget(tripId, category, amount)
      .then(() => console.log('Budget updated successfully'))
      .catch((error) => console.log(error));
    onClose();
  };

  return (
    <Modal title="Set Budget" open={open} onClose={onClose} className="modal">
      <form onSubmit={handleSubmit} className="form">
      <div className="close-button">
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
        <Select 
          value={category || ''} 
          onChange={handleCategoryChange} 
          className="select" 
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="" disabled style={{ display: 'none' }}>
            Select Category
          </MenuItem>
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
          inputProps={{ min: 1 }}
          className="input"
        />
        {error && <p className="error">{error}</p>}
        <Button 
          className="button" 
          type="submit" 
          disabled={!category || amount <= 0}
        >
          Save
        </Button>
      </form>
    </Modal>
  );
};

export default SetBudgetModal;
