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
          {budget > 0 && <p className="budget-left">Out of ${budget}</p>}
        </div>
      </div>
      {budget > 0 &&
        <div className="bar-container">
          <div
            className="bar"
            style={{
              width: `${percent > 100 ? 100 : percent}%`,
              backgroundColor: `${percent > 100 ? 'red' : '#f37e30'}`
            }}
          ></div>
        </div>}
      {(percent >= 100 && budget > 0) && (
        <p className="warning-message">Budget has been exceeded</p>
      )}
    </div>
  );
};

export default ProgressBar;
