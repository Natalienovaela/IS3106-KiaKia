import React, { useEffect, useState } from "react";
import BudgetExpenseCard from "../Card/BudgetExpenseCard/BudgetExpenseCard";
import ExpenseCard from "../Card/ExpenseCard/ExpenseCard";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/AddRounded"
import AddExpenseModal from "../Modal/AddExpenseModal/AddExpenseModal";
import Api from "../../Helpers/Api";

const Expenses = ({ tripId, userId, userRole }) => {
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const handleAddExpenseClick = () => {
    setShowAddExpenseModal(true);
    console.log("categories", categories)
  }

  useEffect(() => {
    Api.getAllCategory(tripId)
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => {
        console.log("Error while retrieving categories.");
      })
  }, [tripId])

  useEffect(() => {
    Api.getUsers(tripId)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => {
        console.log("Error while retrieving users.");
      })
  }, [tripId])

  const fetchExpenses = () => {
    return Api.getAllExpenses(tripId)
      .then((response) => {
        if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Failed to retrieve total expense.");
      }})
      .then((data) => {
        setExpenses(data);
      })
  }

  useEffect(() => {
    fetchExpenses(tripId)
      .catch((error) => {
        console.log("Error while retrieving expenses.");
      });
  }, [tripId])

  const closeModal = () => {
    setShowAddExpenseModal(false);
    Api.getAllExpenses(tripId)
      .then((response) => response.json())
      .then((data) => {
        setExpenses(data);
      })
      .catch((error) => {
        console.log("Error while retrieving expenses.");
      })
  }

  return (
    <div style={({width: "706px"})}>
      <BudgetExpenseCard tripId={tripId} userId={userId} userRole={userRole} />
      {userRole !== "VIEWER" &&  
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
            textTransform: "capitalize",
            float: "right",
          }}>
          Add Expense
        </Button>
      }
      {expenses.map((expense) => (
        <ExpenseCard
          key={expense.expenseId}
          expenseId={expense.expenseId}
          category={expense.category}
          description={expense.description}
          amount={expense.expenseAmt}
          tripId={tripId}
          userRole={userRole}
        />
      ))}
      
      <AddExpenseModal
        open={showAddExpenseModal}
        onClose={closeModal}
        tripId={tripId}
        users={users}
        categories={categories}
      />
    </div>
  );
};

export default Expenses;