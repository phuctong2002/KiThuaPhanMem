// import * as React from "react";
import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 400,
  bgcolor: "background.paper",
  p: 24,
  padding: "24px",
};

export default function DeadForm({ handleClose, open, handleOpen, person }) {
  const [id, setId] = useState('');
  const date_of_death = useRef(null);
  const reason = useRef(null);
  const handleChange = (event) => {
    setId(event.target.value);
    console.log(event.target.value);
  };

  const handleAdd = ()=>{
    console.log( id);
    console.log( date_of_death.current.value);
    console.log( reason.current.value );
    axios.post("/person/dead",{
      person_id: id,
      date_of_death: date_of_death.current.value,
      reason: reason.current.value
    })
      .then( (response)=>{
        console.log(response);
        handleClose();
      })
      .catch( (error)=>{
        console.log(error);
      })
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            className="text-left"
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            {/* <Close className="cursor-pointer hover:bg-[#EDEFF1]" onClick={handleClose} /> */}
            <h1 className="text-[24px] font-medium">Khai tử</h1>
          </Typography>

          <Typography>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div className="flex justify-center">
                <FormControl style={{width: "90%"}}>
                  <InputLabel id="demo-simple-select-label">Họ tên</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={id}
                    label="Họ tên"
                    onChange={handleChange}
                  >
                    {
                      person.map( (item, index)=>{
                        return (
                          <MenuItem key={index} value={item.manhankhau}>{item.hoten}</MenuItem>
                        )
                      })
                    }
                  </Select>
                </FormControl>
              </div>
              <div className="flex justify-center">
                <TextField
                  type="date"
                  style={{ width: "90%" }}
                  id="outlined-required"
                  label="Ngày mất"
                  defaultValue="2002-01-01"
                  inputRef={date_of_death}

                />
              </div>
              <div className="flex justify-center">
                <TextField
                  style={{ width: "90%" }}
                  id="outlined-required"
                  label="Lí do"
                  defaultValue=""
                  inputRef={reason}
                />
              </div>
            </Box>
          </Typography>

          <Typography
            className="text-right"
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ marginTop: "40px" }}
          >
            <Button
              onClick={handleClose}
              style={{ borderRadius: 20, width: 120, marginRight: 16 }}
              variant="contained"
            >
              Cancel
            </Button>
            <Button
              style={{ width: 120, borderRadius: 20 }}
              variant="contained"
              onClick={handleAdd}
            >
              Add
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
