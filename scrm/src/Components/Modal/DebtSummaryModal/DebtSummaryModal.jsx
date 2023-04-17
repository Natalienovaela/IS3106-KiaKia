import React from "react";
import Modal from "../Modal/Modal";
import "./DebtSummaryModal.scss";

const DebtSummaryModal = ({ open, debts, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="view-debt-summary-modal">
        <h2>Debt Summary</h2>
        {debts.length === 0 ? (
          <p>No debts to show.</p>
        ) : (
          <ul className="debt-list">
            {debts.map((debt, index) => (
              <li key={index}>
                <span>{debt.creditor}</span>
                <span>{debt.amount > 0 ? "owes" : "is owed by"}</span>
                <span>{debt.debtor}</span>
                <span>{`$${Math.abs(debt.amount)}`}</span>
              </li>
            ))}
          </ul>
        )}
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default DebtSummaryModal;
