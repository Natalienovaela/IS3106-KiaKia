import Api from "../../Helpers/Api";
import { useEffect, useState } from "react";
import Note from "./Note";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const TripNotes = ({ tripId, userId, userRole }) => {
  // const {
  //   data: notes,
  //   isPending,
  //   error,
  // } = useFetch(
  //   `http://localhost:8080/KiaKia-war/webresources/trips/${tripId}/notes`
  // );

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    reloadNotes();
  }, []);

  const reloadNotes = () => {
    Api.getAllNotesInTrip(tripId)
      .then((res) => {
        if (!res.ok) {
          //http OK from server
          console.log("error");
          throw Error("could not fetch data");
        }
        return res.json(); //return another promise of data
      })
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    // Api.getUserRole(userId, tripId)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log("USER ROLE" + data);
    //     // setUserRole(data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching user role:", error);
    //   });
  };

  const handleDelete = (noteId) => {
    console.log(noteId + "deleted");
    Api.deleteNote(tripId, noteId).then(() => {
      reloadNotes();
    });
  };

  const handleCreateNote = () => {
    Api.createNote(tripId).then(() => {
      reloadNotes();
    });
  };

  return (
    <div className="trip-notes">
      <h2>Notes</h2>
      {/* {error && <div> {error} </div>}
      {isPending && <div> Loading... </div>} */}
      {userRole !== "VIEWER" && (
        <div>
          <button className="btn container" onClick={handleCreateNote}>
            Create Note
          </button>
        </div>
      )}
      {notes &&
        notes.map((note) => (
          <div key={note.noteId} className="rowComponent">
            <div className="noteComponent">
              <Note
                tripId={tripId}
                note={note}
                userRole={userRole}
                handleDelete={handleDelete}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default TripNotes;
