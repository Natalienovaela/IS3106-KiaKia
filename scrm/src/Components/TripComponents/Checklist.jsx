import Api from "../../Helpers/Api";
import { useEffect, useState } from "react";
import Note from "./Note";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Box from "@mui/material/Box";
import ChecklistItem from "./ChecklistItem";

const Checklist = ({ tripId, userId, userRole }) => {
  const [checklists, setChecklists] = useState([]);

  useEffect(() => {
    reloadChecklists();
  }, []);

  const reloadChecklists = () => {
    Api.retrieveAllCheckListInTrip(tripId)
      .then((res) => {
        if (!res.ok) {
          //http OK from server
          console.log("error");
          throw Error("could not fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setChecklists(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleDelete = (checklistId) => {
    console.log(checklistId + "deleted");
    Api.deleteCheckList(tripId, checklistId).then(() => {
      reloadChecklists();
    });
  };

  const handleCreateChecklist = () => {
    Api.createCheckList(tripId).then(() => {
      reloadChecklists();
    });
  };

  return (
    <div className="trip-checklist">
      <div className="rowComponent">
        <h2>Checklist</h2>
        {/* {error && <div> {error} </div>}
      {isPending && <div> Loading... </div>} */}
        {userRole !== "VIEWER" && (
          <Box sx={{ paddingLeft: 2 }}>
            <IconButton onClick={handleCreateChecklist}>
              <AddRoundedIcon />
            </IconButton>
          </Box>
        )}
      </div>
      {checklists &&
        checklists.map((note) => (
          <div key={note.noteId} className="rowComponent">
            <div className="checklistComponent">
              <ChecklistItem
                tripId={tripId}
                checklist={checklists}
                userRole={userRole}
                handleDelete={handleDelete}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default Checklist;
