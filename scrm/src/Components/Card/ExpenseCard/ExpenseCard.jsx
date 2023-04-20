import React from "react";
import "./ExpenseCard.css";
import FoodIcon from "@mui/icons-material/Restaurant";
import DeleteIcon from "@mui/icons-material/Delete";
import Api from "../../../Helpers/Api";
import { Button } from "@mui/material";

const ExpenseCard = (props) => {

  const handleDelete = () => {
    Api.deleteExpense(props.tripId, props.key)
      .then(() => console.log('Expense deleted successfully'))
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
          <small className="category">{props.category.name}</small>
        </div>
        <p className="expense-amount">${props.amount}</p>
      </div>

      {props.userRole !== "VIEWER" &&
        <Button className="delete-button" startIcon={<DeleteIcon />} onClick={handleDelete} />}
    </div>
  );
};

export default ExpenseCard;
