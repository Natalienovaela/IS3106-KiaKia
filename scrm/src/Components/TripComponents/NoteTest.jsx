import * as React from "react";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";

const NoteTest = ({ note }) => {
  // const noteId = note.noteId;
  const [title, setTitle] = React.useState(note.title);
  const [content, setContent] = React.useState(note.content);

  const handleContentChange = (event) => {
    setContent(event.target.value);
    console.log(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    console.log(event.target.value);
  };
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
      </Stack>
    </div>
  );
};

export default NoteTest;
