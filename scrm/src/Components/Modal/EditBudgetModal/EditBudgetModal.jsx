import { useState } from 'react';
import { TextField, Button, Select, MenuItem } from '@mui/material';
import Api from '../../../Helpers/Api';
import Modal from '../Modal/Modal';

function EditBudgetModal( categories, tripId, open, onClose ) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [budgetId, setBudgetId] = useState(null);
  const [amount, setAmount] = useState(0);

  const handleCategoryChange = (event) => {
    // Retrieve budget for selected category from backend and set it in state
    Api.getBudgetByCategory(tripId, event.target.value)
      .then((budget) => {
        const [key, value] = Object.entries(budget)[0];
        setBudgetId(key);
        setAmount(value);
      })
      .catch((error) => {
        console.log("Error while retrieving budget by category.");
      });
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSave = () => {
    if (amount === 0)
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
    <Modal title="Edit Budget" open={open} onClose={onClose}>
    {Array.isArray(categories) && categories.length === 0 ? (
      <p>You have not set any budgets.</p>
    ) : (
      <div>
        <Select value={selectedCategory} onChange={handleCategoryChange}>
          <MenuItem value="" disabled>
            Category
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
        {amount && (
          <>
            <TextField
              type="number"
              label="Amount"
              value={amount}
              onChange={handleAmountChange}
              inputProps={{ min: 0, step: 1 }}
            />
            <Button onClick={handleSave}>Save</Button>
          </>
        )}
      </div>
    )}
  </Modal>
  );
}

export default EditBudgetModal;
