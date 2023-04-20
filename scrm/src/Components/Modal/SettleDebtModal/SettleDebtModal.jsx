import React, { useState } from "react";
import { Button, Select, MenuItem, TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./SettleDebtModal.css"
import Modal from "../Modal/Modal";
import Api from "../../../Helpers/Api";

const SettleDebtModal = ({ open, onClose, debts, tripId, userId }) => {
  const [debtId, setDebtId] = useState(null);
  const [amountOwed, setAmountOwed] = useState(0);
  const [amountPaid, setAmountPaid] = useState(amountOwed);

  const handleDebtChange = (e) => {
    setDebtId(e.target.value);
    const selectedDebt = debts.find((debt) => debt.debtId === debtId);
    setAmountOwed(selectedDebt.amount);
  };

  const handleAmountChange = (e) => {
    setAmountPaid(e.target.value);
  };

  const handleSubmit = () => {
    Api.payDebts(tripId, debtId, amountPaid)
      .then(() => console.log('Budget updated successfully'))
      .catch((error) => console.log(error));
  };

  return (
    <Modal title="Settle Debt" open={open} onClose={onClose}>
      <form onSubmit={handleSubmit} className="form">
        <div className="close-button">
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <Select className="select-field" value={debtId} onChange={handleDebtChange}>
          {debts.map((debt) => (
            <MenuItem key={debt.debtId} value={debt.debtId}>
              {debt.creditor.userId === userId ? debt.debtor.name : debt.creditor.name}
            </MenuItem>
          ))}
        </Select>
        {debtId && (
          <>
            <TextField
              className="text-field"
              label="Amount"
              type="number"
              value={amountPaid}
              onChange={handleAmountChange}
              inputProps={{ min: 0, max: amountOwed }}
            />
            <Button className="submit-button" type="submit">Submit</Button>
          </>
        )}
      </form>
    </Modal>
  );
};

export default SettleDebtModal;
