import * as React from "react";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import Api from "../../Helpers/Api";

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

  // const handleDelete = () => {
  //   Api.deleteNote(tripId, noteId);
  // };

  // highly likely got error here
  // React.useEffect(() => {
  //   // reloadData(); or {reloadData}; ???
  //   const note = { noteId, title, content };
  //   Api.updateNote(tripId, noteId, note);
  // }, [title, content]);

  return (
    <div className="trip-component">
      <Stack>
        {note && (
          <>
            <TextField
              variant="standard"
              fullWidth
              placeholder="Title of your note"
              size="small"
              value={title}
              onChange={handleTitleChange}
              style={{ width: 600 }}
              InputProps={{
                style: {
                  fontWeight: 700,
                  fontSize: 19,
                },
                disableUnderline: true,
              }}
            />
          </>
        )}

        {note && (
          <TextField
            multiline
            placeholder="Write anything here: how to get around, reminder, tips, etc."
            sx={{
              width: "50%",
            }}
            InputProps={{
              inputComponent: TextareaAutosize,
              rows: 3,
            }}
            value={content}
            onChange={handleContentChange}
          />
        )}

        {/* {note && (
          <button onClick={(e) => handleDelete(e, note.noteId)}>Delete</button>
        )} */}
      </Stack>
    </div>
  );
};

//   return (
//     <div className="note">
//       {noteId && (
//         <>
//           <TextField
//             fullWidth
//             placeholder="Title of your note"
//             value={title}
//             onChange={handleTitleChange}
//           />
//           <button onClick={handleDelete}>Delete</button>
//         </>
//       )}

//       {noteId && (
//         <TextField
//           fullWidth
//           multiline
//           placeholder="Write anything here: how to get around, reminder, tips, etc."
//           InputProps={{
//             inputComponent: TextareaAutosize,
//             rows: 3,
//           }}
//           value={content}
//           onChange={handleContentChange}
//         />
//       )}
//     </div>
//   );
// };

export default Note;
