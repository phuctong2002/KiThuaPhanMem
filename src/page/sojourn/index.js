import {  Table } from "antd";
import axios from "axios";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import AddSojourn from "./AddSojourn";

const initData = [
  {
    mahokhau: "1",
    machuho: "1",
    ten: "Phuc",
    diachi: "Tho Xuan, Thanh Hoa",
  },
];

const Sojourn = () => {
  const [data, setData] = useState(initData);
  const [open, setOpen] = useState(false);
  const [render, setRender] = useState(0);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

    useEffect(()=>{
      axios.get("/sojourn/")
        .then( res =>{
          console.log(res.data);
          setData(res.data);
        })
    },[render])

  const handleDelete = (record)=>{
    console.log(record.id);
    axios.delete(`/sojourn/${record.id}`)
      .then((res)=>{
        console.log(res);
        setRender(render + 1);
      })
      .catch( (err)=>{
        console.log(err);
      })
  }
  const columns = [
    {
      title: "Chủ hộ",
      dataIndex: "person_of_department",
    },
    {
      title: "Họ tên người tạm trú",
      dataIndex : "name",
    },
    {
      title: "Từ ngày",
      dataIndex: "start_date",
    },{
      title: "Đến ngày",
      dataIndex: "end_date",
    },
    {
      title: "Lí do", 
      dataIndex: "reason",
    },
    {
      title: "Hành động",
      render: (_, record) => (
        <>
          <DeleteIcon style={{cursor: "pointer", color:"red"}} 
            onClick={()=> handleDelete(record)}
          />
        </>
      ),
    },
  ];


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
      <AddSojourn open={open} handleClose={handleClose} handleOpen={handleOpen} render={render} setRender={setRender}/>
    </div>
  );
};

export default Sojourn;
