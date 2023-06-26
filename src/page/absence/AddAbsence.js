import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

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

export default function AddAbsence({ handleClose, open, handleOpen }) {
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
            <h1 className="text-[24px] font-medium">Khai bao tam vang</h1>
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
                    style={{width: "45%"}}
                  id="outlined-required"
                  label="Họ tên"
                  defaultValue="Lê Văn A"
                />
                <TextField
                    style={{width: "45%"}}

                  id="outlined-required"
                  label="Bí danh"
                  defaultValue="LA"
                />
              </div>
              <div className="flex justify-between">
                <TextField
                    style={{width: "45%"}}
                  id="outlined-required"
                  label="Required"
                  defaultValue="Hello World"
                />
                <TextField
                    style={{width: "45%"}}
                  id="outlined-required"
                  label="Dân tộc"
                  defaultValue="Kinh"
                />
              </div>
              <div className="flex justify-between">
                <TextField
                    style={{width: "45%"}}
                    id="outlined-required"
                  label="Quê quán"
                  defaultValue="Thanh Hóa"
                />
                <TextField
                    style={{width: "45%"}}
                    id="outlined-required"
                  label="Required"
                  defaultValue="Hello World"
                />
              </div >
              <div className="flex justify-between">
                <TextField
                    style={{width: "45%"}}
                    id="outlined-required"
                  label="Địa chỉ thường trú"
                  defaultValue="Thanh Hóa"
                />
                <TextField
                    style={{width: "45%"}}
                    id="outlined-required"
                  label="CMNN"
                  defaultValue="0123456789"
                />
              </div>
              <div className="flex justify-between">
                <TextField
                    style={{width: "45%"}}
                    id="outlined-required"
                  label="Nơi làm việc"
                  defaultValue="Hà Nội"
                />
                <TextField
                    style={{width: "45%"}}
                    id="outlined-required"
                  label="Ngày sinh"
                  defaultValue="Hello World"
                />
              </div>
              
            </Box>
          </Typography>

          <Typography
            className="text-right"
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{marginTop: 40}}
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
            >
              Add
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
