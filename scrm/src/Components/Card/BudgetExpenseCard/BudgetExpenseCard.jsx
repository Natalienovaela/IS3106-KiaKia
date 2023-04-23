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

const BudgetExpenseCard = ({ tripId, userId, userRole, expenses }) => {
  const [showSetBudgetModal, setShowSetBudgetModal] = useState(false);
  const [showEditBudgetModal, setShowEditBudgetModal] = useState(false);
  const [showSettleDebtModal, setShowSettleDebtModal] = useState(false);
  const [showViewBreakdownModal, setShowViewBreakdownModal] = useState(false);
  const [showViewDebtSummModal, setShowViewDebtSummModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({ value: -1, label: "All"});
  const [availableCategories, setAvailableCategories] = useState([]);
  const [associatedCategoriesAll, setAssociatedCategoriesAll] = useState([]);
  const [associatedBudgetCategories, setAssociatedBudgetCategories] = useState([]);
  const [debtsOwed, setDebtsOwed] = useState([]);
  const [budgetAmt, setBudgetAmt] = useState(0);
  const [spent, setSpent] = useState(0);

  const fetchAvailableCategories = (tripId) => {
    return Api.getAvailableCategory(tripId)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Failed to retrieve available categories.");
        }
      })
      .then((data) => {
        return data;
      });
  };

  const fetchAssociatedCategories = (tripId) => {
    return Api.getAssociatedCategory(tripId)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Failed to retrieve associated categories.");
        }
      })
      .then((data) => {
        return data;
      });
  }

  const fetchAssociatedBudgetCategories = (tripId) => {
    return Api.getAssociatedBudgetCategory(tripId)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Failed to retrieve associated budget categories.");
        }
      })
      .then((data) => {
        return data;
      });
  }

  const fetchDebtsOwedByUser = (tripId, userId) => {
    return Api.getDebtsByUser(tripId, userId)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Failed to retrieve debts owed by user.");
        }
      })
      .then((data) => {
        return data;
      });
  }

  const fetchTotalBudget = (tripId) => {
    return Api.getTotalBudget(tripId)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Failed to retrieve total budget.");
        }
      })
      .then((data) => {
        return data;
      })
  }

  const fetchTotalExpense = (tripId) => {
    return Api.getTotalExpense(tripId)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Failed to retrieve total expense.");
        }
      })
      .then((data) => {
        return data;
      })
  }

  const fetchBudgetByCategory = (selectedCategoryId) => {
    return Api.getBudgetByCategory(selectedCategoryId)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Failed to retrieve budget by category.");
        }
      })
      .then((data) => {
        return data;
      })
  }

  const fetchTotalExpenseByCategory = (tripId, selectedCategoryId) => {
    return Api.getTotalExpenseByCategory(tripId, selectedCategoryId)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Failed to retrieve total expense by category.");
        }
      })
      .then((data) => {
        return data;
      })
  }

  useEffect(() => {
    fetchAvailableCategories(tripId)
      .then((data) => setAvailableCategories(data))
      .catch((error) => {
        console.log("Failed to retrieve available categories.");
      });

    fetchAssociatedCategories(tripId)
      .then((data) => {
        const options = [
          { value: 0, label: "All" },
          ...data.map((category) => ({ value: category.categoryId, label: category.name }))
        ];
        setAssociatedCategoriesAll(options);
      })
      .catch((error) => {
        console.log("Error while retrieving associated categories.");
      });

    fetchAssociatedBudgetCategories(tripId)
      .then((data) => {
        setAssociatedBudgetCategories(data);
      })
      .catch((error) => {
        console.log("Error while retrieving associated budget categories.");
      });
    
    fetchDebtsOwedByUser(tripId, userId)
      .then((data) => {
        setDebtsOwed(data);
        console.log(data);
      })
      .catch((error) => {
        console.log("Error while retrieving debts owed by user");
      });

    fetchTotalBudget(tripId)
      .then((data) => {
        if (data > 0) {
          setBudgetAmt(data);
        } else {
          setBudgetAmt(0);
        }
        
      })
      .catch((error) => {
        console.log("Error while retrieving total budget.");
        setBudgetAmt(0);
      });

    fetchTotalExpense(tripId)
    .then((data) => setSpent(data))
    .catch((error) => {
      console.log("Error while retrieving total expense.");
    });
  }, [tripId, userId]);

  const reloadTotalBudgetExpense = (selectedCategoryId) => {
    if (selectedCategoryId === "0")
    {
      console.log("fetching");
      fetchTotalBudget(tripId)
        .then((data) => {
          if (data > 0) {
            console.log("bef", data);
            setBudgetAmt(data);
          } else {
            setBudgetAmt(0);
          }
          
        })
        .catch((error) => {
          console.log("Error while retrieving total budget.");
          setBudgetAmt(0);
        });
    
      fetchTotalExpense(tripId)
        .then((data) => setSpent(data))
        .catch((error) => {
          console.log("Error while retrieving total expense.");
        });
    } 
    else 
    {
      fetchBudgetByCategory(selectedCategoryId)
        .then((data) => {
          const [key, value] = Object.entries(data)[0];
          if (value > 0) {
            setBudgetAmt(value);
          } else {
            setBudgetAmt(0);
          }
        })
        .catch((error) => {
          console.log("Error while retrieving budget by category.");
          setBudgetAmt(0);
        });
    
      fetchTotalExpenseByCategory(tripId, selectedCategoryId)
        .then((data) => setSpent(data))
        .catch((error) => {
          console.log("Error while retrieving total expense by category.");
        });
    }
  }

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    setSelectedCategory(selectedCategoryId);
    reloadTotalBudgetExpense(selectedCategoryId);
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

  const closeEditBudgetModal = () => {
    setShowEditBudgetModal(false);
    reloadTotalBudgetExpense(selectedCategory);
  }

  const closeSetBudgetModal = () => {
    setShowSetBudgetModal(false);
    reloadTotalBudgetExpense(selectedCategory);
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
        {userRole !== "VIEWER" && 
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
        }
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
        onClose={() => closeSetBudgetModal()}
        options={availableCategories}
        tripId={tripId}
      />

      {showViewBreakdownModal &&
        <ChartModal
          tripId={tripId}
          onClose={() => setShowViewBreakdownModal(false)}
        />}

      <DebtSummaryModal
        open={showViewDebtSummModal}
        onClose={() => setShowViewDebtSummModal(false)}
        tripId={tripId}
        userId={userId}
      />

      <EditBudgetModal
        open={showEditBudgetModal}
        onClose={() => closeEditBudgetModal()}
        tripId={tripId}
        categories={associatedBudgetCategories}
      />

      <SettleDebtModal
        open={showSettleDebtModal}
        onClose={() => setShowSettleDebtModal(false)}
        tripId={tripId}
        userId={userId}
        debts={debtsOwed}
      />

    </div>
  );
};

export default BudgetExpenseCard;