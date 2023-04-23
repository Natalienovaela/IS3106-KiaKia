import { useEffect, useState } from 'react';
import { TextField, Button, Select, MenuItem } from '@mui/material';
import Api from '../../../Helpers/Api';
import Modal from '../Modal/Modal';
import "./EditBudgetModal.css"
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function EditBudgetModal({ open, onClose, tripId, categories }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [budgetId, setBudgetId] = useState(null);
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    if (open) {
      setSelectedCategory(null);
      setBudgetId(null);
      setAmount(null);
    }
  }, [open]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    Api.getBudgetByCategory(event.target.value)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Failed to retrieve available categories.");
        }
      })
      .then((budget) => {
        const [key, value] = Object.entries(budget)[0];
        setBudgetId(key);
        setAmount(value);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (amount === "0")
    {
      Api.deleteBudget(tripId, budgetId)
        .then(() => console.log('Budget removed successfully'))
        .catch((error) => console.log(error));
    }
    else 
    {
      Api.updateBudget(budgetId, amount)
        .then(() => console.log('Budget updated successfully'))
        .catch((error) => console.log(error));
    }
    onClose();
  };

  return (
    <Modal title="Edit Budget" open={open} onClose={onClose} className="modal">
      <div className='form'>
        <div className="close-button">
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <Select 
          value={selectedCategory || ''} 
          onChange={handleCategoryChange}
          className="select"
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="" disabled style={{ display: 'none' }}>
            Select Category
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.categoryId} value={category.categoryId}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
        {amount !== null && (
          <>
            <TextField
              type="number"
              label="Amount"
              value={amount}
              className="input"
              onChange={handleAmountChange}
              inputProps={{ step: 1 }}
            />
            <Button 
              onClick={handleSave}
              className="button" 
              disabled={!selectedCategory}
            >
              Save
            </Button>
          </>
        )}
      </div>
    </Modal>
  );
}

export default EditBudgetModal;
