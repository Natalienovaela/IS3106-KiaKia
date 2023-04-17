import React from "react";
import Chart from "chart.js/auto";
import "./ChartModal.scss";

const ChartModal = ({ expenses, onClose }) => {
  const chartRef = React.useRef();

  React.useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Group the expenses by category and sum up the amounts
    const groupedExpenses = expenses.reduce((acc, curr) => {
      const category = curr.category;
      acc[category] = (acc[category] || 0) + curr.amount;
      return acc;
    }, {});

    // Create an array of category labels and amounts
    const labels = Object.keys(groupedExpenses);
    const amounts = Object.values(groupedExpenses);

    // Create the chart
    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
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
        <canvas ref={chartRef}></canvas>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ChartModal;