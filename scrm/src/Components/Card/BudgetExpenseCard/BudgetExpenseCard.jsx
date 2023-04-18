import React, { useEffect, useState } from "react";
import ProgressBar from "../../ProgressBar/ProgressBar"
import DropdownMenu from "../../DropdownMenu/DropdownMenu";
import "./BudgetExpenseCard.scss";
import Button from "@mui/material/Button";
import SettleIcon from "@mui/icons-material/CalculateRounded";
import SetBudgetIcon from "@mui/icons-material/PaidRounded";
import EditIcon from "@mui/icons-material/EditRounded";
import ChartIcon from "@mui/icons-material/EqualizerRounded";
import DebtSummIcon from "@mui/icons-material/ReceiptRounded";
import Api from '../../../Helpers/Api';
import SetBudgetModal from "../../Modal/SetBudgetModal/SetBudgetModal"
import SettleDebtModal from "../../Modal/SettleDebtModal/SettleDebtModal"
import ChartModal from "../../Modal/ChartModal/ChartModal";
import DebtSummaryModal from "../../Modal/DebtSummaryModal/DebtSummaryModal";
import EditBudgetModal from "../../Modal/EditBudgetModal/EditBudgetModal";

const BudgetExpenseCard = ({ tripId, userId }) => {
  const [showSetBudgetModal, setShowSetBudgetModal] = useState(false);
  const [showEditBudgetModal, setShowEditBudgetModal] = useState(false);
  const [showSettleDebtModal, setShowSettleDebtModal] = useState(false);
  const [showViewBreakdownModal, setShowViewBreakdownModal] = useState(false);
  const [showViewDebtSummModal, setShowViewDebtSummModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [availableCategories, setAvailableCategories] = useState([]);
  const [associatedCategoriesAll, setAssociatedCategoriesAll] = useState([]);
  const [associatedCategories, setAssociatedCategories] = useState([]);
  const [debtsOwed, setDebtsOwed] = useState([]);
  const [budgetAmt, setBudgetAmt] = useState(0);
  const [spent, setSpent] = useState(0);

  useEffect(() => {
    Api.getAvailableCategory(tripId)
      .then((response) => response.json())
      .then((data) => {
        setAvailableCategories(data);
      })
      .catch((error) => {
        console.log("Error while retrieving available categories.");
      });
  }, [tripId]);

  useEffect(() => {
    Api.getAssociatedCategory(tripId)
      .then((response) => response.json())
      .then((data) => {
        setAssociatedCategories(data);
        const options = [
          { value: 0, label: "All" },
          ...data.map((category) => ({ value: category.id, label: category.name }))
        ];
        setAssociatedCategoriesAll(options);
      })
      .catch((error) => {
        console.log("Error while retrieving associated categories.");
      });
  }, [tripId]);

  useEffect(() => {
    Api.getDebtsOwedByUser(tripId, userId)
      .then((response) => response.json())
      .then((data) => setDebtsOwed(data))
      .catch((error) => {
        console.log("Error while retrieving debts owed by user.");
      })
  })

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value)
    if (selectedCategory.categoryId === 0)
    {
      Api.getTotalBudget(tripId)
        .then((response) => response.json())
        .then((data) => setBudgetAmt(data))
        .catch((error) => {
          console.log("Error while retrieving total budget.");
        });
    
      Api.getTotalExpense(tripId)
        .then((response) => response.json())
        .then((data) => setSpent(data))
        .catch((error) => {
          console.log("Error while retrieving total expense.");
        });
    } 
    else 
    {
      Api.getBudgetByCategory(tripId, selectedCategory.categoryId)
        .then((response) => response.json())
        .then((data) => {
          const [key, value] = Object.entries(data)[0];
          setBudgetAmt(value);
        })
        .catch((error) => {
          console.log("Error while retrieving total budget.");
        });
    
      Api.getTotalExpenseByCategory(tripId, selectedCategory.categoryId)
        .then((response) => response.json())
        .then((data) => setSpent(data))
        .catch((error) => {
          console.log("Error while retrieving total expense.");
        });
    }    
  }

  const handleSetBudgetClick = () => {
    setShowSetBudgetModal(true);
  }

  const handleEditBudgetClick = () => {
    setShowEditBudgetModal(true);
  }

  const handleSettleDebtClick = () => {
    setShowSettleDebtModal(true);
  }

  const handleViewBreakdownClick = () => {
    setShowViewBreakdownModal(true);
  }

  const handleViewDebtSummClick = () => {
    setShowViewDebtSummModal(true);
  }

  return (
    <div className="card-container">
      <div className="budget-expense-container">
        <div className="dropdown-container">
          <DropdownMenu
            label="Category"
            options={associatedCategoriesAll}
            selectedOption={selectedCategory}
            onChange={handleCategoryChange}
          />
        </div>
        <div className="progress-bar-container">
          <ProgressBar budget={budgetAmt} spent={spent} />
        </div>
        <div className="button-container">
          <Button className="buttons" startIcon={<SetBudgetIcon />} onClick={handleSetBudgetClick}>
            Set Budget
          </Button>
          <Button className="buttons" startIcon={<EditIcon />} onClick={handleEditBudgetClick}>
            Edit Budget
          </Button>
          <Button className="buttons" startIcon={<SettleIcon />} onClick={handleSettleDebtClick}>
            Settle Up
          </Button>
        </div>
      </div>
      <div className="overview-container">
        <Button className="overview-buttons" startIcon={<ChartIcon />} onClick={handleViewBreakdownClick}>
          View Breakdown
        </Button>
        <Button className="overview-buttons" startIcon={<DebtSummIcon />} onClick={handleViewDebtSummClick}>
          View Debt Summary
        </Button>
      </div>

      <SetBudgetModal 
        open={showSetBudgetModal}
        onClose={() => setShowSetBudgetModal(false)}
        options={availableCategories}
        tripId={tripId}
      />

      <ChartModal
        open={showViewBreakdownModal}
        tripId={tripId}
        onClose={() => setShowViewBreakdownModal(false)}
      />

      <DebtSummaryModal
        open={showViewDebtSummModal}
        onClose={() => setShowViewDebtSummModal(false)}
        tripId={tripId}
        userId={userId}
      />

      {/* <EditBudgetModal
        open={showEditBudgetModal}
        onClose={() => setShowEditBudgetModal(false)}
        categories={associatedCategories}
        tripId={tripId}
      /> */}

    </div>
  );
};

export default BudgetExpenseCard;