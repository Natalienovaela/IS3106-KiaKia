import React from "react";
import "./ExpenseCard.scss";
import FoodIcon from "@mui/icons-material/Restaurant";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const ExpenseCard = (props) => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="category-icon">
          <FoodIcon />
        </div>
        <div className="expense-detail">
          <p className="expense-description">KaiKai Restaurant</p>
          <div>
            <small className="category">Food</small>
            <small className="date">25 Mar</small>
            {/*
            {props.date && (
              <span className="date">{props.date}</span>
            )}
            */}
          </div>
        </div>
        <p className="expense-amount">$120</p>
      </div>

      <EditIcon />
      <DeleteIcon />
    </div>
  );
};

export default ExpenseCard;
