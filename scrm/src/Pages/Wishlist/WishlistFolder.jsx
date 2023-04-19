import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { MdOutlineEdit } from "react-icons/md";
import Api from "../../Helpers/Api";
import HorizontalCard from "../../Components/Card/HorizontalCard/HorizontalCard";
import ItineraryCard from "../../Components/Card/ItineraryCard/ItineraryCard";
const WishlistFolder = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");
  const folderName = props.folderName;
  const horizontalCards = props.trips?.map((cardData) => (
    <ItineraryCard {...cardData} />
  ));
  const handleClick = () => {
    setEditMode(true);
  };
  const handleCancelFolderNameEdit = () => {
    setEditMode(false);
  };
  const handleSaveFolderName = async () => {
    // check if new folder name is there
    if (!newFolderName) {
      alert("Please enter a new folder name");
    }

    try {
      await Api.updateFolderName(props.userId, props.folderId, newFolderName);
      console.log("success");
      setEditMode(false);
    } catch (error) {
      console.log("Error while updating folder name");
    }
  };

  const handleNewFolderInput = (event) => {
    const inputNewFolder = event.target.value.trim();
    console.log(inputNewFolder);
    if (!inputNewFolder) {
      return;
    }
    setNewFolderName(inputNewFolder);
  };

  return (
    <>
      <div className="subSecTitle">
        {editMode ? (
          <>
            <TextField
              id="outlined"
              variant="outlined"
              placeholder="New Folder Name"
              value={newFolderName}
              onChange={handleNewFolderInput}
            />
            <button className="btn-no" onClick={handleSaveFolderName}>
              Save
            </button>
            <button className="btn-no" onClick={handleCancelFolderNameEdit}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <h3>{folderName}</h3>
            <button className="btn-no" onClick={handleClick}>
              <MdOutlineEdit className="icon" />
            </button>
          </>
        )}
      </div>
      <div className="list">{horizontalCards}</div>
    </>
  );
};
export default WishlistFolder;
