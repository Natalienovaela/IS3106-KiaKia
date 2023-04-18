import React from "react";

const ChecklistItem = ({ item, onCheck }) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={item.checked}
        onChange={() => onCheck(item.id)}
      />
      <span>{item.text}</span>
    </div>
  );
};

export default ChecklistItem;
