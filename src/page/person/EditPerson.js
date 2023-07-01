// import * as React from "react";
import { useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import axios from "axios";
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

export default function EditPerson({
  handleClose,
  open,
  render,
  setRender,
  person,
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
  const address = useRef(null);

  const handleAdd = () => {
    axios
      .patch(`/person/${person.manhankhau}`, {
        id: person.manhankhau,
        name: name.current.value,
        birth: birth.current.value,
        alias: alias.current.value,
        gender: gender.current.value,
        home_town: home_town.current.value,
        nation: nation.current.value,
        job: job.current.value,
        workspace: workspace.current.value,
        note: "",
        id_card: id_card.current.value,
        issued_by: issued_by.current.value,
        created_at: created_at.current.value,
        address: address.current.value,
      })
      .then((res) => {
        console.log(res);
        setRender(render + 1);
        handleClose();
      })
      .then((response) => {
        console.log("oke nhe");
      });
  };
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
            <h1 className="text-[24px] font-medium">Chỉnh sửa thông tin nhân khẩu</h1>
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
                  defaultValue={person.hoten}
                  inputRef={name}
                />
                <TextField
                  style={{ width: "45%" }}
                  id="outlined-required"
                  label="Bí danh"
                  defaultValue={person.bidanh}
                  inputRef={alias}
                />
              </div>
              <div className="flex justify-between">
                <TextField
                  style={{ width: "45%" }}
                  id="outlined-required"
                  label="CCCD"
                  defaultValue={person.cccd}
                  inputRef={id_card}
                />
                <TextField
                  type="date"
                  style={{ width: "45%" }}
                  id="outlined-required"
                  label="Ngày cấp"
                  inputRef={created_at}
                  defaultValue={person.ngaycap}
                />
              </div>
              <div className="flex justify-between">
                <TextField
                  style={{ width: "45%" }}
                  id="outlined-required"
                  label="Nơi cấp"
                  defaultValue={person.noicap}
                  inputRef={issued_by}
                />
                <TextField
                  style={{ width: "45%" }}
                  id="outlined-required"
                  label="Giới tính"
                  defaultValue={person.gioitinh}
                  inputRef={gender}
                />
              </div>
              <div className="flex justify-between">
                <TextField
                  style={{ width: "45%" }}
                  id="outlined-required"
                  label="Nghề nghiệp"
                  defaultValue={person.nghenghiep}
                  inputRef={job}
                />
                <TextField
                  style={{ width: "45%" }}
                  id="outlined-required"
                  label="Dân tộc"
                  defaultValue={person.dantoc}
                  inputRef={nation}
                />
              </div>
              <div className="flex justify-between">
                <TextField
                  type="date"
                  style={{ width: "45%" }}
                  id="outlined-required"
                  defaultValue={person.ngaysinh}
                  label="Ngày sinh"
                  inputRef={birth}
                />
                <TextField
                  style={{ width: "45%" }}
                  id="outlined-required"
                  label="Nguyên quán"
                  defaultValue={person.nguyenquan}
                  inputRef={home_town}
                />
              </div>
              <div className="flex justify-between">
                <TextField
                  style={{ width: "45%" }}
                  id="outlined-required"
                  defaultValue={person.noilamviec}
                  label="Nơi làm việc"
                  inputRef={workspace}
                />
                <TextField
                  style={{ width: "45%" }}
                  id="outlined-required"
                  label="Thường trú"
                  defaultValue={person.thuongtru}
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
                Change
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
