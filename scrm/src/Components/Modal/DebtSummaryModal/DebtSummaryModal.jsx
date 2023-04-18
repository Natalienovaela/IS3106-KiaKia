import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import "./DebtSummaryModal.scss";
import Api from "../../../Helpers/Api";

const DebtSummaryModal = ({ open, tripId, userId, onClose }) => {
  const [debts, setDebts] = useState([]);

  useEffect(() => {
    Api.getOverallDebts(tripId)
      .then((response) => response.json())
      .then((data) => {
        setDebts(data);
      })
      .catch((error) => {
        console.log("Error while retrieving debts summary.");
      });
  }, [tripId])

  return (
    <Modal open={open} onClose={onClose}>
      <div className="view-debt-summary-modal">
        <h2>Debt Summary</h2>
        {debts.length === 0 ? (
          <p>No debts to show.</p>
        ) : (
          <>
            <ul className="debt-list">
              {debts.filter((debt) => debt.amount > 0).map((debt, index) => (
                <li key={index}>
                  <span>{debt.creditor.userId === userId ? "You" : debt.creditor.name}</span>
                  <span>owes</span>
                  <span>{debt.debtor.userId === userId ? "You" : debt.debtor.name}</span>
                  <span>{`$${Math.abs(debt.amtOwed)}`}</span>
                </li>
              ))}
            </ul>
            <ul className="debt-list">
              {debts.filter((debt) => debt.amount < 0).map((debt, index) => (
                <li key={index}>
                  <span>{debt.debtor.userId === userId ? "You" : debt.debtor.name}</span>
                  <span>is owed by</span>
                  <span>{debt.creditor.userId === userId ? "You" : debt.creditor.name}</span>
                  <span>{`$${Math.abs(debt.amtOwed)}`}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default DebtSummaryModal;
