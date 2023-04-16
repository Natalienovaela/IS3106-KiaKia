import React from "react";
import { Button, dialogClasses } from "@mui/material";
import "./popup.css";
import TextField from "@mui/material/TextField";

const Popup = (props) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-header">
          <h1>Save '{props.selectedCard?.cityName}' to Wishlist</h1>

          <button onClick={props.onCloseButtonClick} className="x-btn">
            X
          </button>
        </div>
        <div className="popup-content">
          {props.folders.length > 0 ? (
            <>
              {props.folders.map((folder) => (
                <div key={folder.id} className="folder-list">
                  <label>{folder.name}</label>
                  <input
                    type="checkbox"
                    checked={props.selectedFolder.name === folder.name}
                    onChange={() => props.onFolderCheckboxChange(folder)}
                  />
                </div>
              ))}
              <div className="folder new-folder">
                <h3>Create new Folder</h3>
                <TextField
                  id="outlined"
                  variant="outlined"
                  placeholder="New folder"
                  value={props.newFolderName}
                  onChange={props.onNewFolderInputChange}
                />
                <button
                  onClick={props.onCreateNewFolderClick}
                  className="save-btn"
                >
                  Create new folder
                </button>
              </div>

              <div className="save-div">
                <button onClick={props.onSaveButtonClick} className="save-btn">
                  Save
                </button>
              </div>
            </>
          ) : (
            <div>
              <p>No folders found.</p>

              <div className="folder new-folder">
                <h3>Create new Folder</h3>
                <TextField
                  id="outlined"
                  variant="outlined"
                  placeholder="New folder"
                  value={props.newFolderName}
                  onChange={props.onNewFolderInputChange}
                />

                <button
                  onClick={props.onCreateNewFolderClick}
                  className="save-btn"
                >
                  Create new folder
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    /*
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-header">
            
          <h1>Save '{props.selectedCard?.cityName}' to Wishlist</h1>

          <button onClick={props.onCloseButtonClick}>X</button>
        </div>
        <div className="popup-body">
          <div className="popup-footer">
            <h3>Save to:</h3>
            <div className="folder folder-list">
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
            <div className="folder new-folder">
              <TextField
                id="outlined"
                variant="outlined"
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
    */
  );
};

export default Popup;
