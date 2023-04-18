import React from "react";
import "./ExpenseCard.scss";
import FoodIcon from "@mui/icons-material/Restaurant";
import DeleteIcon from "@mui/icons-material/Delete";
import Api from "../../../Helpers/Api";
import Button from "@mui/material/Button";

const ExpenseCard = (props, tripId) => {
  const handleDelete = () => {
    Api.deleteExpense(tripId, props.key)
      .then(() => console.log("Expense deleted successfully"))
      .catch((error) => console.log(error));
  };

  return (
    <div className="card">
      <div className="card-content">
        <div className="category-icon">
          <FoodIcon />
        </div>
        <div className="expense-detail">
          <p className="expense-description">{props.description}</p>
          <div>
            <small className="category">{props.category}</small>
            {props.date && <span className="date">{props.date}</span>}
          </div>
        </div>
        <p className="expense-amount">${props.amount}</p>
      </div>

      <Button startIcon={<DeleteIcon />} onClick={handleDelete} />
    </div>
  );
};

export default ExpenseCard;
