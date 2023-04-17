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
} from "@material-ui/core";
import Modal from "../Modal/Modal";
import "./AddExpenseModal.scss";

const AddExpenseModal = ({ open, onClose, categories, users, onSubmit }) => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleUserChange = (e) => {
    setSelectedUsers(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({ category, amount, description, selectedUsers });
    setCategory("");
    setAmount("");
    setDescription("");
    setSelectedUsers([]);
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
            value={amount}
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
            value={selectedUsers}
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
