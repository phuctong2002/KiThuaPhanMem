import {useState, useEffect, useRef} from "react";
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
import { useParams } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 360,
  bgcolor: "background.paper",
  p: 24,
  padding: "24px",
};

export default function AddMember({ handleClose, open, handleOpen, render, setRender }) {
  const [id, setId] = useState('');
  const [person, setPerson] = useState([]);
  const path = useParams();
  const relation = useRef(null);
  const handleChange = (event) => {
    setId(event.target.value);
  };

  const handleAdd = ()=>{
    console.log( id);
    console.log( relation.current.value);
    console.log( path.id);
    axios.post("/department/relation",{
        department_id : path.id,
        person_id : id,
        relation : relation.current.value
    })  
    .then((res) => {
        console.log(res.data);
        setRender(render + 1);
        handleClose();
      })
      .catch( (err)=>{
        console.log(err);
      })  

  }

  useEffect( ()=>{
    axios.get("/person/")
    .then((res) => {
        setPerson(res.data);
    })
  },[])

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
            <h1 className="text-[24px] font-medium">Thêm thanh vien</h1>
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
              <div className="flex justify-center mt-[20px]">
                <FormControl style={{ width: "90%" }}>
                  <InputLabel id="demo-simple-select-label">Ho ten</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={id}
                    label="Ho ten"
                    onChange={handleChange}
                  >
                    {person.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.id}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
              <div className="flex justify-center mt-[20px]">
                <TextField
                  style={{ width: "90%" }}
                  id="outlined-required"
                  label="Quan he"
                  defaultValue=""
                  inputRef={relation}
                />
              </div>
            </Box>
          </Typography>

          <Typography
            className="text-right"
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ marginTop: 40 }}
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
