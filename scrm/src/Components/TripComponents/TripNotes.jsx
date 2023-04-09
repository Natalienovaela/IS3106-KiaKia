import useFetch from "../../Hooks/useFetch";
import Note from "./Note";

const TripNotes = ({ tripId }) => {
  // THE REAL CODE
  // const {
  //   data: notes,
  //   isPending,
  //   error,
  // } = useFetch(
  //   `http://localhost:8080/KiaKia/webresources/trips/${tripId}/notes`
  // );

  //test code
  const {
    data: notes,
    isPending,
    error,
  } = useFetch(`http://localhost:8080/KiaKia/webresources/trips/1/notes`);

  return (
    <div className="trip-notes">
      {error && <div> {error} </div>}
      {isPending && <div> Loading... </div>}
      {notes && notes.map((note) => <Note tripId={tripId} note={note} />)}
    </div>
  );
};

export default TripNotes;
