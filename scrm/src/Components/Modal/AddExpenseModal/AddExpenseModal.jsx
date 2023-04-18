import React, { useState } from "react";
import {
  Button,
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Input,
  Chip
} from "@mui/material";
import Modal from "../Modal/Modal";
import "./AddExpenseModal.scss";
import Api from "../../../Helpers/Api";

const AddExpenseModal = ({ open, onClose, categories, users, tripId }) => {
  const [category, setCategory] = useState(null);
  const [expenseAmt, setExpenseAmt] = useState(0);
  const [description, setDescription] = useState("");
  const [payees, setPayees] = useState([]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleAmountChange = (e) => {
    setExpenseAmt(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleUserChange = (e) => {
    setPayees(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    Api.addExpense(tripId, {
      category,
      expenseAmt,
      description,
      payees
    })
    .then(() => console.log('Budget updated successfully'))
    .catch((error) => console.log(error));
    onClose();
  };

  return (
    <Modal title="Add Expense" open={open} onClose={onClose}>
      <form onSubmit={handleFormSubmit} className="add-expense-form">
        <FormControl className="form-control">
          <InputLabel shrink>Category</InputLabel>
          <Select value={category} onChange={handleCategoryChange}>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="form-control">
          <TextField
            label="Amount"
            type="number"
            value={expenseAmt}
            onChange={handleAmountChange}
            inputProps={{ min: 0 }}
          />
        </FormControl>
        <FormControl className="form-control">
          <TextField
            label="Description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </FormControl>
        <FormControl className="form-control">
          <InputLabel shrink>Users</InputLabel>
          <Select
            multiple
            value={payees}
            onChange={handleUserChange}
            input={<Input />}
            placeholder="Users"
            renderValue={(selected) => (
              <div className="chip-container">
                {selected.map((user) => (
                  <Chip key={user} label={user} className="chip" />
                ))}
              </div>
            )}
          >
            {users.map((user) => (
              <MenuItem key={user} value={user}>
                {user}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" className="submit-button">
          Submit
        </Button>
      </form>
    </Modal>
  );
};

export default AddExpenseModal;
