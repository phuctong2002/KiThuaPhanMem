import { Space, Table, Tag } from "antd";
import axios from "axios";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddDepartment from "./AddDepartment";
import { BiDetail } from "react-icons/bi";

const initData = [
  {
    mahokhau: "1",
    ten: "Phuc",
    diachi: "Tho Xuan, Thanh Hoa",
  },
];

const Department = () => {
  const navigate = useNavigate();
  const [render, setRender] = useState(0);
  const handleDelete = (record) => {
    console.log(record.mahokhau);
    axios
      .delete(`/department/${record.mahokhau}`)
      .then((res) => {
        console.log(res.data);
        setRender(render + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const columns = [
    {
      title: "Ma ho khau",
      dataIndex: "mahokhau",
      key: "mahokhau",
      width: "25%",
    },
    {
      title: "Chu ho",
      dataIndex: "ten",
      key: "ten",
      width: "25%",
    },
    {
      title: "Dia chi",
      dataIndex: "diachi",
      key: "diachi",
      width: "25%",
    },
    {
      title: "Thao tac",
      render: (_, record) => (
        <>
          <BiDetail
            className="inline-block text-[24px] mr-[20px] cursor-pointer"
            onClick={() => {
              navigate(`department/${record.mahokhau}`);
              console.log(record);
            }}
          />
          <EditIcon
            style={{ cursor: "pointer", marginRight: 20, color: "#E4CCCC" }}
          />
          <DeleteIcon
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => handleDelete(record)}
          />
        </>
      ),
      width: "20%",
    },
  ];
  const [data, setData] = useState(initData);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios.get("/department/").then((res) => {
      const newData = res.data.map((item, index) => {
        return {
          key: index,
          mahokhau: item.id,
          machuho: item.person_id,
          ten: item.person_name,
          diachi: item.address,
        };
      });
      console.log(newData);
      setData(newData);
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
      <AddDepartment
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
        render={render}
        setRender={setRender}
      />
    </div>
  );
};

export default Department;
