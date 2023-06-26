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
  width: 400,
  height: 380,
  bgcolor: "background.paper",
  p: 24,
  padding: "24px",
};

export default function AddEvent({ handleClose, open, handleOpen }) {
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
            <h1 className="text-[24px] font-medium">Thêm khoản thu</h1>
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
                <TextField
                  style={{ width: "90%" , marginTop: 40}}
                  id="outlined-required"
                  label="Tên khoản thu"
                  defaultValue=""
                />
              </div>
              <div className="flex justify-center">
                <TextField
                style={{ width: "90%" , marginTop: 40 }}
                  id="outlined-number"
                  label="So tien"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
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
            >
              Add
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
