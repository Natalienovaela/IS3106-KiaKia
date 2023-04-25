import React from "react";
import "./ExpenseCard.css";
import FoodIcon from "@mui/icons-material/Restaurant";
import TransportationIcon from '@mui/icons-material/CommuteRounded';
import AccommodationIcon from '@mui/icons-material/ApartmentRounded';
import EntertainmentIcon from '@mui/icons-material/AttractionsRounded';
import OthersIcon from '@mui/icons-material/MoreHorizRounded';
import DeleteIcon from "@mui/icons-material/Delete";
import Api from "../../../Helpers/Api";
import { Button } from "@mui/material";

const ExpenseCard = (props) => {

  const handleDelete = () => {
    Api.deleteExpense(props.tripId, props.expenseId)
      .then(() => console.log('Expense deleted successfully'))
      .catch((error) => console.log(error));
  };

  const getCategoryIcon = () => {
    switch(props.category.name) {
      case 'Food':
        return <FoodIcon />;
      case 'Transportation':
        return <TransportationIcon />;
      case 'Accomodation':
        return <AccommodationIcon />;
      case 'Accommodation':
        return <AccommodationIcon />;
      case 'Entertainment':
        return <EntertainmentIcon />;
      default:
        return <OthersIcon />;
    }
  };

  return (
    <div className="card">
      <div className="card-content">
        <div className="category-icon">
          {getCategoryIcon()}
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
