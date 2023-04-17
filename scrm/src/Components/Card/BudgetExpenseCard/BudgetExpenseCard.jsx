import React, { useState } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import "./BudgetExpenseCard.scss";
import Button from "@material-ui/core/Button";
import SettleIcon from "@mui/icons-material/CalculateRounded";
import SetBudgetIcon from "@mui/icons-material/PaidRounded";
import EditIcon from "@mui/icons-material/EditRounded";
import ChartIcon from "@mui/icons-material/EqualizerRounded";
import DebtSummIcon from "@mui/icons-material/ReceiptRounded";

const BudgetExpenseCard = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Food", "Travel", "Shopping"];

  return (
    <div className="card-container">
      <div className="budget-expense-container">
        <div className="dropdown-container">
          <DropdownMenu
            label="Category"
            options={categories}
            selectedOption={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          />
        </div>
        <div className="progress-bar-container">
          <ProgressBar budget={500} spent={300} />
        </div>
        <div className="button-container">
          <Button className="buttons" startIcon={<SetBudgetIcon />}>
            Set Budget
          </Button>
          <Button className="buttons" startIcon={<EditIcon />}>
            Edit Budget
          </Button>
          <Button className="buttons" startIcon={<SettleIcon />}>
            Settle Up
          </Button>
        </div>
      </div>
      <div className="overview-container">
        <Button className="overview-buttons" startIcon={<ChartIcon />}>
          View Breakdown
        </Button>
        <Button className="overview-buttons" startIcon={<DebtSummIcon />}>
          View Debt Summary
        </Button>
      </div>
    </div>
  );
};

export default BudgetExpenseCard;