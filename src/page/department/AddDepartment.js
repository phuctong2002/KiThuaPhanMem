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
  width: 500,
  height: 360,
  bgcolor: "background.paper",
  p: 24,
  padding: "24px",
};

export default function AddDepartment({ handleClose, open, handleOpen, render, setRender }) {
  const [id, setId] = useState('');
  const [person, setPerson] = useState([]);
  const address = useRef(null);
  const handleChange = (event) => {
    setId(event.target.value);
    // console.log(event.target.value);
  };

  const handleAdd = ()=>{
    // console.log(address.current.value);
    // console.log(id);
    axios.post("/department",{
      person_id: id,
      address: address.current.value,
    })
      .then( (response) => {
        setRender(render + 1);
        // console.log(response);
        handleClose();
      })
      .catch( (error)=>{
        console.error(error)
      })
  }

  useEffect( ()=>{
    axios.get("/person/")
    .then((res) => {
        setPerson(res.data);
        // console.log(res.data);
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
            {/* <Close className="cursor-pointer hover:bg-[#EDEFF1]" onClick={handleClose} /> */}
            <h1 className="text-[24px] font-medium">Thêm hộ khẩu</h1>
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
                  <InputLabel id="demo-simple-select-label">Họ tên</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={id}
                    label="Họ tên"
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
                  label="Địa chỉ"
                  defaultValue=""
                  inputRef={address}
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
