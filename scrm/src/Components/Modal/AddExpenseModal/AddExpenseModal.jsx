import React, { useEffect, useState } from "react";
import BigDecimal from "big.js"
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
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "../Modal/Modal";
import "./AddExpenseModal.scss";
import Api from "../../../Helpers/Api";

const AddExpenseModal = ({ open, onClose, categories, users, tripId }) => {
	const [category, setCategory] = useState(null);
	const [expenseAmt, setExpenseAmt] = useState(0);
	const [description, setDescription] = useState("");
	const [payer, setPayer] = useState(null);
	const [payees, setPayees] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
    if (open) {
      setCategory(null);
			setExpenseAmt(0);
			setDescription("");
			setPayer(null);
			setPayees([]);
    }
  }, [open]);

	const handleCategoryChange = (e) => {
		setCategory(e.target.value);
	};

	const handleAmountChange = (e) => {
    const value = e.target.value;
    setExpenseAmt(value);
    if (value <= 0) {
      setError("Amount must be greater than 0");
    } else {
      setError(null);
    }
  };

	const handleDescriptionChange = (e) => {
		setDescription(e.target.value);
	};

	const handlePayerChange = (e) => {
		const selectedPayer = e.target.value;
		setPayer(selectedPayer);
		setPayees((prevPayees) => prevPayees.filter((payee) => payee !== selectedPayer));
	};

	const handlePayeesChange = (e) => {
		setPayees(e.target.value);
	}

	const handleFormSubmit = (e) => {
		e.preventDefault();
		const expenseAmtBD = new BigDecimal(expenseAmt);
		const data = {
			category,
			expenseAmt: expenseAmtBD,
			description,
			payer,
			payees
		}
		Api.addExpense(tripId, data)
			.then(() => console.log('Expense added successfully'))
			.catch((error) => console.log(error));
		onClose();
	};

	return (
		<Modal title="Add Expense" open={open} onClose={onClose}>
		<div className="close-button">
			<IconButton onClick={onClose}>
				<CloseIcon />
			</IconButton>
			</div>
		<form onSubmit={handleFormSubmit} className="add-expense-form">
			<FormControl className="form-control">
			<InputLabel>Category</InputLabel>
			<Select 
				value={category} 
				onChange={handleCategoryChange}
				label="Category"
			>
				{categories.map((category) => (
				<MenuItem key={category.categoryId} value={category}>
					{category.name}
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
			{error && <p className="error">{error}</p>}
			</FormControl>
			<FormControl className="form-control">
			<TextField
				label="Description"
				value={description}
				onChange={handleDescriptionChange}
			/>
			</FormControl>
			<FormControl className="form-control">
			<InputLabel>Paid by</InputLabel>
			<Select
				value={payer}
				onChange={handlePayerChange}
				label="Paid by"
			>
				{users.map((user) => (
				<MenuItem key={user} value={user}>
					{user.name}
				</MenuItem>
				))}
			</Select>
			</FormControl>
			<FormControl className="form-control">
			<InputLabel>Involved Users</InputLabel>
			<Select
				multiple
				value={payees}
				onChange={handlePayeesChange}
				label="Involved Users"
				renderValue={(selected) => (
				<div className="chip-container">
					{selected.map((user) => (
					<Chip 
						key={user} 
						label={user.name} 
						className="chip" 
					/>
					))}
				</div>
				)}
			>
				{users.map((user) => (
				<MenuItem key={user} value={user}>
					{user.name}
				</MenuItem>
				))}
			</Select>
			</FormControl>
			<Button 
				type="submit" 
				className="submit-button"
				disabled={!category || expenseAmt <= 0 || !description || !payer || payees.length === 0}
			>
				Submit
			</Button>
		</form>
		</Modal>
	);
};

export default AddExpenseModal;
