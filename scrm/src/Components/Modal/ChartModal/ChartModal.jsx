import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import "./ChartModal.scss";
import Api from "../../../Helpers/Api";

const ChartModal = ({ onClose, tripId }) => {
  const chartRef = useRef();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    Api.getTotalExpenseByCategories(tripId)
      .then((response) => response.json())
      .then((data) => {
        const expensesArr = Object.entries(data).map(([name, value]) => ({
          name,
          value,
        }));
        setExpenses(expensesArr);
        console.log("expense", expensesArr)
      })
      .catch((error) => {
        console.log("Error while retrieving total expense by categories.");
      });
  }, [tripId])

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");   

    // Create an array of category labels and amounts
    const categories = expenses.map((expense) => expense.name);
    const amounts = expenses.map((expense) => expense.value);

    // Create the chart
    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: categories,
        datasets: [
          {
            label: "Expenses by Category",
            data: amounts,
            backgroundColor: [
              "#ff6384",
              "#36a2eb",
              "#cc65fe",
              "#ffce56",
              "#4bc0c0",
              "#9966ff",
              "#ffd966",
              "#6666ff",
              "#ff66cc",
              "#99ff66"
            ]
          }
        ]
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });

    // Destroy the chart when the component unmounts
    return () => {
      chart.destroy();
    };
  }, [expenses]);

  return (
    <div className="view-breakdown-modal">
      <div className="modal-content">
        <canvas ref={chartRef} />
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ChartModal;