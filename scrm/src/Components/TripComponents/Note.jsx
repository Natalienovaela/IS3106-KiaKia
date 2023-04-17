import * as React from "react";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import Api from "../../Helpers/Api";
import { debounce } from "lodash";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const Note = ({ tripId, note, userRole, handleDelete }) => {
  const [title, setTitle] = React.useState(note.title);
  const [content, setContent] = React.useState(note.content);

  const debouncedSaveNote = React.useCallback(
    debounce((note) => {
      Api.updateNote(tripId, note.noteId, note);
    }, 2000),
    [tripId]
  );

  const handleContentChange = (event) => {
    setContent(event.target.value);
    debouncedSaveNote({
      noteId: note.noteId,
      title,
      content: event.target.value,
    });
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    debouncedSaveNote({
      noteId: note.noteId,
      title: event.target.value,
      content,
    });
  };

  return (
    <>
      <Stack className="trip-component">
        {note && (
          <>
            <TextField
              variant="standard"
              fullWidth
              placeholder="Title of your note"
              size="small"
              value={title}
              onChange={handleTitleChange}
              disabled={userRole === "VIEWER" ? true : false}
              sx={{
                width: "500px",
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#000000",
                },
              }}
              style={{ width: " 100%" }}
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

        <div className="rowComponent">
          {note && (
            <TextField
              multiline
              placeholder="Write anything here: how to get around, reminder, tips, etc."
              disabled={userRole === "VIEWER" ? true : false}
              sx={{
                // width: "100%",
                width: "500px",
                borderRadius: 5,
                backgroundColor: "#fff",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 5, // Set border radius on the OutlinedInput component
                },
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#000000",
                },
              }}
              InputProps={{
                inputComponent: TextareaAutosize,
                rows: 3,
                classes: {
                  disabled: "disabled-note",
                },
              }}
              value={content}
              onChange={handleContentChange}
            />
          )}
          {userRole !== "VIEWER" && (
            <div>
              <IconButton onClick={() => handleDelete(note.noteId)}>
                <DeleteIcon />
              </IconButton>
            </div>
          )}
        </div>
      </Stack>
    </>
  );
};

export default Note;
