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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 620,
  bgcolor: "background.paper",
  p: 24,
  padding: "24px",
};

export default function AddAbsence({ handleClose, open, handleOpen, render, setRender }) {
  const [id, setId] = useState('');
  const [department, setDepartment] = useState([]);
  const place = useRef(null);
  const start = useRef(null);
  const end = useRef(null);
  const reason = useRef(null);
  const handleChange = (event) => {
    setId(event.target.value);
  };

  const handleAdd = ()=>{
    console.log(id);
    console.log(place.current.value);
    console.log(start.current.value);
    console.log(end.current.value);
    console.log(reason.current.value);
    axios.post("/absence",{
      person_id: id,
      place: place.current.value,
      start_date: start.current.value,
      end_date: end.current.value,
      reason: reason.current.value,
    })
      .then((res)=>{
        console.log(res)
        setRender(render + 1);
        handleClose();
      })
      .catch( (err)=>{
        console.error(err);
      })
  }

  useEffect( ()=>{
    axios.get("/person/")
    .then((res) => {
        console.log(res.data);
        setDepartment(res.data);
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
            <h1 className="text-[24px] font-medium">Them tam vang</h1>
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
                    {department.map((item, index) => {
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
                  label="Dia diem"
                  defaultValue=""
                  inputRef={place}
                />
              </div>
              <div className="flex justify-center mt-[20px]">
                <TextField
                  type="date"
                  style={{ width: "90%" }}
                  id="outlined-required"
                  label="Ngay den"
                  defaultValue="2022-01-01"
                  inputRef={start}
                />
              </div>
              <div className="flex justify-center mt-[20px]">
                <TextField
                  type="date"
                  style={{ width: "90%" }}
                  id="outlined-required"
                  label="Ngay den"
                  defaultValue="2022-01-01"
                  inputRef={end}
                />
              </div>
              <div className="flex justify-center mt-[20px]">
                <TextField
                  style={{ width: "90%" }}
                  id="outlined-required"
                  label="Li do"
                  defaultValue="Li do"
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
