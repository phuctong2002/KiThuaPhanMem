import { Space, Table, Tag } from "antd";
import axios from "axios";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddEvent from "./AddEvent";

const initData = [
  {
    tenkhoanthu: "Tien cuu chien binh Viet Nam",
    sotien: "10000",
    thuduoc: "10000000"
  },
];

const Payment = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Ten khoan thu",
      dataIndex: "tenkhoanthu",
      key: "tenkhoanthu",
      width : "25%"
    },
    {
      title: "So tien",
      dataIndex: "sotien",
      key: "sotien",
      width : "25%"
    },
    {
      title: "Thu duoc",
      dataIndex: "thuduoc",
      key: "thuduoc",
      width : "25%"
    },
    {
      title: "Thao tac",
      render: (_, record) => (
        <>
          <Button
            style={{ borderRadius: 20 , marginRight: 20}}
            variant="contained"
            fontSize="small"
          >
            Detail
          </Button>
          <EditIcon style={{cursor:"pointer",marginRight:20,color: "#E4CCCC"}}/>
          <DeleteIcon style={{cursor: "pointer", color:"red"}} />
        </>
      ),
      width : "25%"
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

  //   useEffect(()=>{
  //     axios.get("/api/v1/hokhau", {
  //       headers: {
  //         Authorization: "Bearer " + sessionStorage.getItem("token"),
  //       }
  //     })
  //       .then( res =>{
  //         const newData = res.data.map( (item, index)=>{
  //           return {
  //             key: index,
  //             mahokhau: item.mahokhau,
  //             machuho: item.manhankhau,
  //             ten: item.hoten,
  //             diachi: item.diachi,
  //           }
  //         })
  //         console.log( newData );
  //         setData( newData );
  //       })
  //   },[])

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
      <AddEvent open={open} handleClose={handleClose} handleOpen={handleOpen}/>
    </div>
  );
};

export default Payment;