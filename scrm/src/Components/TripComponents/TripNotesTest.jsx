import useFetch from "../../Hooks/useFetch";
import NoteTest from "./NoteTest";

const TripNotesTest = () => {
  const notes = [
    {
      id: 1,
      title: "Dummy Note 1",
      content: "Hello i am dummy note 1",
    },
    {
      id: 2,
      title: "Dummy Note 2",
      content: "Hello i am dummy note 2",
    },
  ];

  return (
    <div className="trip-notes">
      {notes && notes.map((note) => <NoteTest note={note} />)}
    </div>
  );
};

export default TripNotesTest;
