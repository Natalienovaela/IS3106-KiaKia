import { Api } from "@mui/icons-material";
import useFetch from "../../Hooks/useFetch";
import { useState } from "react";
import Note from "./Note";

const TripNotes = ({ tripId }) => {
  // to be passed in ltr!!!
  tripId = 1;

  const {
    data: notes,
    isPending,
    error,
  } = useFetch(
    `http://localhost:8080/KiaKia-war/webresources/trips/${tripId}/notes`
  );

  // const [notes, setNotes] = useState(notesData);

  // const handleDelete = (noteId) => {
  //   Api.deleteNote(tripId, noteId)
  //     .then(() => {
  //       Api.getAllNotesInTrip(tripId);
  //     })
  //     .then((res) => {
  //       if (!res.ok) {
  //         //http OK from server
  //         throw Error("could not fetch data");
  //       }
  //       return res.json(); //return another promise of data
  //     })
  //     .then((data) => {
  //       setNotes(data);
  //     })
  //     .catch((err) => {
  //       throw Error(err.message);
  //     });
  // };

  // //test code
  // const {
  //   data: notes,
  //   isPending,
  //   error,
  // } = useFetch(`http://localhost:8080/KiaKia-war/webresources/trips/1/notes`);

  return (
    <div className="trip-notes">
      {error && <div> {error} </div>}
      {isPending && <div> Loading... </div>}
      {notes &&
        notes.map((note) => (
          <>
            <Note tripId={tripId} note={note} />
            {/* <button onClick={handleDelete}>Delete2</button> */}
          </>
        ))}
    </div>
  );
};

export default TripNotes;
