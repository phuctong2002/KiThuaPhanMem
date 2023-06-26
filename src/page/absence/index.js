import { Space, Table, Tag } from "antd";
import axios from "axios";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddAbsence from "./AddAbsence";

const initData = [
  {
    mahokhau: "1",
    machuho: "1",
    ten: "Phuc",
    diachi: "Tho Xuan, Thanh Hoa",
  },
];

const Absence = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Nhan khau",
      dataIndex: "person_name",
    },
    {
      title: "Dia diem",
      dataIndex: "place",
    },
    {
      title: "Ngay bat dau",
      dataIndex: "start_date",
    },
    {
      title: "Ngay ket thuc",
      dataIndex: "end_date",
    },
    {
      title: "Li do",
      dataIndex: "reason",
    },
    {
      title: "Thao tac",
      render: (_, record) => (
        <>
          <EditIcon
            style={{ cursor: "pointer", marginRight: 20, color: "#E4CCCC" }}
          />
          <DeleteIcon style={{ cursor: "pointer", color: "red" }} />
        </>
      ),
    },
  ];
  const [data, setData] = useState(initData);
  const [open, setOpen] = useState(false);
  const [render, setRender] = useState(0);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get("/absence/")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [render]);

  return (
    <div className="h-[100%] w-[100%] ">
      <div className="mb-[10px]">
        <Button
          //   onClick={handleOpen}
          style={{ borderRadius: 20, width: 120, marginRight: 16 }}
          variant="contained"
          onClick={handleOpen}
        >
          Thêm{" "}
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 8 }}
      ></Table>
      <AddAbsence
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
        render={render}
        setRender={setRender}
      />
    </div>
  );
};

export default Absence;
