import React from "react";
import "./ProgressBar.scss";

const ProgressBar = ({ budget, spent }) => {
  const percent = (spent / budget) * 100;

  return (
    <div className="progress">
      <div className="budget-spent">
        <div className="spent">
          <p>Spent</p>
          <h1 className="spent-value">${spent}</h1>
        </div>
        <div className="budget">
          <p className="budget-left">Out of ${budget}</p>
        </div>
      </div>
      <div className="bar-container">
        <div
          className="bar"
          style={{
            width: `${percent}%`
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
