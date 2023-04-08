import * as React from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";

//no need?? reloadData passed should be able to update all the trip components (autosave or some sort)
const Note = ({ tripId, note }) => {
  // const noteId = note.noteId;
  const [title, setTitle] = React.useState(note.title);
  const [content, setContent] = React.useState(note.content);

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDelete = () => {
    fetch("http://localhost:8000/blogs/" + id, {
      method: "DELETE",
    }).then(() => {
      history.push("/");
    });
  };

  // highly likely got error here
  React.useEffect(() => {
    // reloadData(); or {reloadData}; ???
    const note = { noteId, title, content };
    Api.updateNote(tripId, noteId, note);
  }, [title, content]);

  return (
    <div className="note">
      {noteId && (
        <>
          <TextField
            fullWidth
            placeholder="Title of your note"
            value={title}
            onChange={handleTitleChange}
          />
          <button onClick={handleDelete}>Delete</button>
        </>
      )}

      {noteId && (
        <TextField
          fullWidth
          multiline
          placeholder="Write anything here: how to get around, reminder, tips, etc."
          InputProps={{
            inputComponent: TextareaAutosize,
            rows: 3,
          }}
          value={content}
          onChange={handleContentChange}
        />
      )}
    </div>
  );
};

export default Note;
