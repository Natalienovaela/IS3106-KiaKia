import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

const CreatePoll = () => {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([{ option: "" }]);

  const handleClickOpen = () => {
    console.log(options);
    setOpen(true);
  };

  const handleClose = () => {
    console.log(options);
    setOpen(false);
    setQuestion("");
    setOptions([{ option: "" }]);
  };

  const handleOptionAdd = () => {
    setOptions([...options, { option: "" }]);
  };

  const handleOptionRemove = (index) => {
    const list = [...options];
    list.splice(index, 1);
    setOptions(list);
  };

  const handleOptionChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...options];
    list[index][name] = value;
    setOptions(list);
  };

  const handleSubmit = () => {
    const optionStrings = options.map((o) => o.option);
    setQuestion("");
    setOptions([{ option: "" }]);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        New Poll
      </Button>
      <Dialog open={open} onClose={handleClose} scroll="paper">
        <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
          Create a Poll
          <IconButton sx={{ ml: "auto" }} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <label>Question</label>
          <TextField
            autoFocus
            margin="dense"
            id="question"
            fullWidth
            required
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question here"
          />
          <label htmlFor="option">Option(s)</label>
          {options.map((singleOption, index) => {
            return (
              <div key={index} className="rowComponent">
                <div>
                  <TextField
                    autoFocus
                    margin="dense"
                    id={`option-${index}`}
                    name="option"
                    fullWidth
                    placeholder="Type an option here"
                    required
                    value={singleOption.option}
                    onChange={(e) => handleOptionChange(e, index)}
                  />
                </div>
                {options.length > 1 && (
                  <div>
                    <IconButton>
                      <DeleteIcon onClick={() => handleOptionRemove(index)} />
                    </IconButton>
                  </div>
                )}
              </div>
            );
          })}
          <Button onClick={handleOptionAdd}>Add another option</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreatePoll;
