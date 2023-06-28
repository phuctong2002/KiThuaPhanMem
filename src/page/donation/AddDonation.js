import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { useParams } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 340,
  bgcolor: "background.paper",
  p: 24,
  padding: "24px",
};

export default function AddDonation({
  handleClose,
  open,
  handleOpen,
  render,
  setRender,
}) {
  const [dpid, setDpid] = useState("");
  const [department, setDepartment] = useState([]);
  const { id } = useParams();
  const name = useRef(null);
  const aom = useRef(null);
  const handleChange = (event) => {
    setDpid(event.target.value);
  };

  const handleAdd = () => {
    console.log(name.current.value);
    console.log(aom.current.value);
    console.log(id);
    axios
      .post(`/donation`, {
        date: new Date(Date.now()),
        price: parseInt(aom.current.value),
        department_id: name.current.value,
        donationEvent_id: id,
      })
      .then((res) => {
        console.log(res);
        setRender(render + 1);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios.get("/department/").then((res) => {
      console.log(res.data);
      setDepartment(res.data);
    });
  }, [render]);

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
            <h1 className="text-[24px] font-medium">Dong tien</h1>
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
                  <InputLabel id="demo-simple-select-label">Ho</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={dpid}
                    inputRef={name}
                    label="Ho"
                    onChange={handleChange}
                  >
                    {department.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.id}>
                          {item.person_name}
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
                  label="So tien dong gop"
                  defaultValue=""
                  inputRef={aom}
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
