import { Space, Table, Tag } from "antd";
import axios from "axios";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddDonationEvent from "./AddDonationEvent";

const initData = [
  {
    tenkhoanthu: "Ung ho dong bao lu lut",
    thuduoc: "10000000"
  },
];

const Donation = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Tên khoản đóng góp",
      dataIndex: "name",
      width: "80%"
    },
    {
      title: "Hành động",
      render: (_, record) => (
        <>
          <Button
            style={{ borderRadius: 20 , marginRight: 20}}
            variant="contained"
            fontSize="small"
            onClick={()=> navigate(`/donation-detail/${record.id}`)}
          >
            Detail
          </Button>
        </>
      ),
      width: "20%"
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
  useEffect( ()=>{
    axios.get("/donation/event/")
    .then( (res)=>{
      setData(res.data);
    })
    .catch( (err)=>{
      console.error(err);
    })
  },[render])

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
      <AddDonationEvent open={open} handleClose={handleClose} handleOpen={handleOpen} render={render} setRender={setRender}/>
    </div>
  );
};

export default Donation;
