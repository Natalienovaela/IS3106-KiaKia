import Api from "../../Helpers/Api";
import useFetch from "../../Hooks/useFetch";
import { useEffect, useState } from "react";
import Note from "./Note";

const TripNotes = ({ tripId }) => {
  // to be passed in ltr!!!
  tripId = 1;

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
      {/* {error && <div> {error} </div>}
      {isPending && <div> Loading... </div>} */}
      <div>
        <button className="note btn container" onClick={handleCreateNote}>
          Create Note
        </button>
      </div>
      {notes &&
        notes.map((note) => (
          <div key={note.noteId} className="rowComponent">
            <div className="noteComponent">
              <Note tripId={tripId} note={note} handleDelete={handleDelete} />
            </div>
            <div>
              <button className="btn" onClick={() => handleDelete(note.noteId)}>
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TripNotes;
