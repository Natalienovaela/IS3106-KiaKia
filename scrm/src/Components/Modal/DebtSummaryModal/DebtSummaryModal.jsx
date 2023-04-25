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
        console.log("user", data);
      })
      .catch((error) => {
        console.log("Error while retrieving debts summary.");
      });
  }, [tripId, userId])

  return (
    <Modal open={open} onClose={onClose}>
      <div className="view-debt-summary-modal">
        <h2>Debt Summary</h2>
        {debts.length === 0 ? (
          <p>No debts to show.</p>
        ) : (
          <>
            <ul className="debt-list">
              {debts.filter((debt) => debt.amtOwed > 0).map((debt) => (
                <li key={debt.debtId}>
                  <span>{debt.creditor.userId.toString() === userId ? "You" : debt.creditor.name}</span>
                  <span>{debt.creditor.userId.toString() === userId ? "owe" : "owes"}</span>
                  <span>{debt.debtor.userId.toString() === userId ? "You" : debt.debtor.name}</span>
                  <span>{`$${Math.abs(debt.amtOwed)}`}</span>
                </li>
              ))}
            </ul>
            <ul className="debt-list">
              {debts.filter((debt) => debt.amtOwed < 0).map((debt) => (
                <li key={debt.debtId}>
                  <span>{debt.debtor.userId.toString() === userId ? "You" : debt.debtor.name}</span>
                  <span>{debt.debtor.userId.toString() === userId ? "are owed by" : "is owed by"}</span>
                  <span>{debt.creditor.userId.toString() === userId ? "You" : debt.creditor.name}</span>
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
