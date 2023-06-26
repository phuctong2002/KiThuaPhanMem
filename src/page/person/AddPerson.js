// import * as React from "react";
import { useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import axios from "axios";
import moment from "moment";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 600,
  bgcolor: "background.paper",
  p: 24,
  padding: "24px",
};

export default function AddPerson({
  handleClose,
  open,
  handleOpen,
  render,
  setRender
}) {
  
  const name = useRef(null);
  const alias = useRef(null);
  const id_card = useRef(null);
  const created_at = useRef(null);
  const issued_by = useRef(null);
  const gender = useRef(null);
  const job = useRef(null);
  const nation = useRef(null);
  const birth = useRef(null);
  const home_town = useRef(null);
  const workspace = useRef(null);

  const handleAdd = ()=>{
    axios.post("/person", {
      "name": name.current.value,
      "birth": birth.current.value,
      "alias": alias.current.value,
      "gender": gender.current.value,
      "home_town" :home_town.current.value,
      "nation": nation.current.value,
      "job": job.current.value,
      "workspace": workspace.current.value,
      "note": "",
      "id_card": id_card.current.value,
      "issued_by": issued_by.current.value,
      "created_at": created_at.current.value
    })
    .then((res) => {
        console.log(res);
        setRender(render + 1);
        handleClose();
      }).then( (response)=>{
        console.log("oke nhe");
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
            <h1 className="text-[24px] font-medium">Them nhan khau</h1>
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
              <div className="flex justify-between">
                <TextField
                  style={{ width: "45%" }}
                  id="outlined-required"
                  label="Họ tên"
                  defaultValue="Lê Văn A"
                  inputRef={name}
                />
                <TextField
                  style={{ width: "45%" }}
                  id="outlined-required"
                  label="Bí danh"
                  defaultValue="LA"
                  inputRef={alias}
                />
              </div>
              <div className="flex justify-between">
                <TextField
                  style={{ width: "45%" }}
                  id="outlined-required"
                  label="CCCD"
                  defaultValue="123456789"
                  inputRef={id_card}
                />
                <TextField
                  type="date"
                  style={{ width: "45%" }}
                  id="outlined-required"
                  label="Ngay cap"
                  inputRef={created_at}
                  defaultValue="2023-06-25"
                />
              </div>
              <div className="flex justify-between">
                <TextField
                  style={{ width: "45%" }}
                  id="outlined-required"
                  label="Nơi cấp"
                  defaultValue="Thanh Hóa"
                  inputRef={issued_by}
                />
                <TextField
                  style={{ width: "45%" }}
                  id="outlined-required"
                  label="Giới tính"
                  defaultValue="Nam"
                  inputRef={gender}
                />
              </div>
              <div className="flex justify-between">
                <TextField
                  style={{ width: "45%" }}
                  id="outlined-required"
                  label="Nghề nghiệp"
                  defaultValue="Sinh viên"
                  inputRef={job}
                />
                <TextField
                  style={{ width: "45%" }}
                  id="outlined-required"
                  label="Dân tộc"
                  defaultValue="Kinh"
                  inputRef={nation}
                />
              </div>
              <div className="flex justify-between">
                <TextField
                  type="date"
                  style={{ width: "45%" }}
                  id="outlined-required"
                  defaultValue="2023-06-25"
                  label="Ngày sinh"
                  inputRef={birth}
                />
                <TextField
                  style={{ width: "45%" }}
                  id="outlined-required"
                  label="Nguyên quán"
                  defaultValue="Thanh Hóa"
                  inputRef={home_town}
                />
              </div>
              <div className="flex justify-between">
                <TextField
                  style={{ width: "45%" }}
                  id="outlined-required"
                  defaultValue="Ha Noi"
                  label="Noi lam viec"
                  inputRef={workspace}
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
