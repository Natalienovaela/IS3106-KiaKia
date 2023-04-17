import React from "react";
import "../Popup/popup.css";
const SavePlaceToWishlist = (props) => {
  return (
    <>
      <div className="popup-overlay">
        <div className="popup-place">
          <div className="popup-header">
            <h1>Save '{props.selectedCard?.name}' to Wishlist</h1>
            <button onClick={props.onCloseButtonClick} className="x-btn">
              X
            </button>
          </div>
          <div className="popup-content">
            <div className="buttons-div">
              <button onClick={props.onCloseButtonClick} className="save-btn">
                Cancel
              </button>
              <button onClick={props.onSaveButtonClick} className="save-btn">
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SavePlaceToWishlist;
