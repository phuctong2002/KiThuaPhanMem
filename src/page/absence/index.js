import { Space, Table, Tag } from "antd";
import axios from "axios";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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
      title: "Ma ho khau",
      dataIndex: "mahokhau",
      key: "mahokhau",
    },
    {
      title: "Ma chu ho",
      dataIndex: "machuho",
      key: "machuho",
    },
    {
      title: "Chu ho",
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: "Dia chi",
      dataIndex: "diachi",
      key: "diachi",
    },
    {
      title: "Thao tac",
      render: (_, record) => (
        <>
          
          <EditIcon style={{cursor:"pointer",marginRight:20,color: "#E4CCCC"}}/>
          <DeleteIcon style={{cursor: "pointer", color:"red"}} />
        </>
      ),
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
      <AddAbsence open={open} handleClose={handleClose} handleOpen={handleOpen}/>
    </div>
  );
};

export default Absence;
