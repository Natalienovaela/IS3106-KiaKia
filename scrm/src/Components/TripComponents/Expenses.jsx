import React, { useState } from "react";
import BudgetExpenseCard from "../Card/BudgetExpenseCard/BudgetExpenseCard";
import ExpenseCard from "../Card/ExpenseCard/ExpenseCard";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/AddRounded"
import AddExpenseModal from "../Modal/AddExpenseModal/AddExpenseModal";

const Expenses = ({ tripId, userId }) => {
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);

  const handleAddExpenseClick = () => {
    setShowAddExpenseModal(true);
  }

  const expenses = [
    {
      id: 1,
      category: "Food",
      description: "KaiKai Restaurant",
      date: "25 Mar",
      amount: 120,
    },
    {
      id: 2,
      category: "Travel",
      description: "Uber Ride",
      date: "27 Mar",
      amount: 30,
    },
    {
      id: 3,
      category: "Shopping",
      description: "Shoes",
      date: "28 Mar",
      amount: 200,
    },
  ];

  return (
    <div style={({width: "706px"})}>
      <BudgetExpenseCard tripId={tripId} userId={userId} />
      <Button 
        className="add-expense" 
        startIcon={<AddIcon />} 
        onClick={handleAddExpenseClick}
        style={{
          backgroundColor: "#f37e30",
          color: "white",
          borderRadius: "20px",
          padding: "5px 15px",
          marginBottom: "15px",
          textTransform: "capitalise",
          float: "right",
        }}>
        Add Expense
      </Button>
      {expenses.map((expense) => (
        <ExpenseCard
          key={expense.id}
          category={expense.category}
          description={expense.description}
          date={expense.date}
          amount={expense.amount}
          tripId={tripId}
        />
      ))}

    </div>
  );
};

export default Expenses;