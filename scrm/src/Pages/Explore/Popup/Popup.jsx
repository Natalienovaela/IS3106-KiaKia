import React from "react";
import { Button } from "@mui/material";
import "./popup.css";

const Popup = (props) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-header">
          <h2>{props.selectedCard?.cityName}</h2>
          <button onClick={props.onCloseButtonClick}>X</button>
        </div>
        <div className="popup-body">
          <p>{props.selectedCard?.desc}</p>
          <ul>
            {props.selectedCard?.places.map((place) => (
              <li key={place}>{place}</li>
            ))}
          </ul>
          <div className="popup-footer">
            <h3>Save to:</h3>
            <div className="folder-list">
              {props.folders.map((folder) => (
                <div key={folder}>
                  <input
                    type="checkbox"
                    id={folder}
                    name={folder}
                    value={folder}
                    checked={folder === props.selectedFolder}
                    onChange={() => props.onFolderCheckboxChange(folder)}
                  />
                  <label htmlFor={folder}>{folder}</label>
                </div>
              ))}
            </div>
            <div className="new-folder">
              <input
                type="text"
                placeholder="New folder"
                value={props.selectedFolder}
                onChange={props.onNewFolderInputChange}
              />
            </div>
            <div className="save-div">
              <button onClick={props.onSaveButtonClick} className="save-btn">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
