import { Space, Table, Tag } from "antd";
import axios from "axios";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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
  const navigate = useNavigate();
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
      title: "Chu ho",
      dataIndex: "person_of_department",
    },
    {
      title: "Ho ten nguoi tam tru",
      dataIndex : "name",
    },
    {
      title: "Tu ngay",
      dataIndex: "start_date",
    },{
      title: "Den ngay",
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
          
          {/* <EditIcon style={{cursor:"pointer",marginRight:20,color: "#E4CCCC"}}/> */}
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
