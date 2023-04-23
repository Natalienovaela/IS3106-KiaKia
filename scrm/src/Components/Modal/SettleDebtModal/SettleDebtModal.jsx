import React, { useEffect, useState } from "react";
import { Button, Select, MenuItem, TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./SettleDebtModal.css"
import Modal from "../Modal/Modal";
import Api from "../../../Helpers/Api";

const SettleDebtModal = ({ open, onClose, debts, tripId, userId }) => {
  const [debt, setDebt] = useState(null);
  const [amountOwed, setAmountOwed] = useState(0);
  const [amountPaid, setAmountPaid] = useState(amountOwed);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open) {
      setDebt(null);
      setAmountOwed(0);
      setAmountPaid(0);
      setError("");
    }
  }, [open]);

  const handleDebtChange = (e) => {
    const value = e.target.value;
    console.log(value);
    setDebt(e.target.value);
    const selectedDebt = debts.find((d) => d.debtId === value.debtId);
    console.log("amt", selectedDebt.amtOwed);
    setAmountOwed(selectedDebt.amtOwed);
    setAmountPaid(selectedDebt.amtOwed);
  };

  const handleAmountPaidChange = (e) => {
    const value = e.target.value;
    setAmountPaid(value);
    if (value <= 0) {
      setError("Amount must be greater than 0");
    } else if (value > amountOwed) {
      setError("Amount must not be grater than the amount owed");
    } else {
      setError(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amountPaid <= 0) {
      setError("Amount must be greater than 0");
      return;
    }
    Api.payDebts(tripId, debt, amountPaid)
      .then(() => console.log('Budget updated successfully'))
      .catch((error) => console.log(error));
  };

  return (
    <Modal title="Settle Debt" open={open} onClose={onClose} className="modal">
      <form onSubmit={handleSubmit} className="form">
        <div className="close-button">
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <Select 
          className="select" 
          value={debt || ''} 
          onChange={handleDebtChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="" disabled style={{ display: 'none' }}>
            Select Recipient
          </MenuItem>
          {debts.map((debt) => (
            <MenuItem key={debt.debtId} value={debt}>
              {debt.creditor.userId.toString() === userId ? debt.debtor.name : debt.creditor.name}
            </MenuItem>
          ))}
        </Select>
        {debt && (
          <>
            <TextField
              className="input"
              label="Amount"
              type="number"
              value={amountPaid}
              onChange={handleAmountPaidChange}
              inputProps={{ max: amountOwed }}
            />
            {error && <p className="error">{error}</p>}
            <Button 
              className="button" 
              type="submit"
              disabled={amountPaid <= 0 || amountPaid > amountOwed}
            >
              Submit
            </Button>
          </>
        )}
      </form>
    </Modal>
  );
};

export default SettleDebtModal;
