import {  Table } from "antd";
import axios from "axios";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddDepartment from "./AddDepartment";
import { BiDetail } from "react-icons/bi";
import EditDepartment from "./EditDepartment";

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
  const [data, setData] = useState(initData);
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState(null);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
      setOpenEdit(false);
  };
  const handleEdit = (record)=>{
    setItem(record);
    setOpenEdit(true);
  }



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
      title: "Mã hộ khẩu",
      dataIndex: "mahokhau",
      key: "mahokhau",
      width: "25%",
    },
    {
      title: "Tên chủ hộ",
      dataIndex: "ten",
      key: "ten",
      width: "25%",
    },
    {
      title: "Địa chỉ",
      dataIndex: "diachi",
      key: "diachi",
      width: "25%",
    },
    {
      title: "Hành động",
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
            onClick={() => handleEdit(record)}
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
      <EditDepartment
        open={openEdit}
        handleClose={handleCloseEdit}
        handleOpen={handleOpenEdit}
        render={render}
        setRender={setRender}
        item={item}
      />
    </div>
  );
};

export default Department;
