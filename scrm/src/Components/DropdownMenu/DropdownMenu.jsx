import React from "react";
import "./DropdownMenu.scss";

const DropdownMenu = ({ options, selectedOption, onChange }) => {
  return (
    <div className="dropdown-container">
      <select className="dropdown" value={selectedOption} onChange={onChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownMenu;
