import { Space, Table, Tag } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddDonation from "./AddDonation";
// import AddSojourn from "./AddSojourn";

const initData = [
  {
    mahokhau: "1",
    machuho: "1",
    ten: "Phuc",
    diachi: "Tho Xuan, Thanh Hoa",
  },
];

const DonationDetail = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const columns = [
    {
      title: "Chủ hộ",
      dataIndex: "department_name",
      width: "30%"
    },
    {
      title: "Ngày đóng",
      dataIndex : "date",
      width: "40%"
    },
    {
        title: "Số tiền đóng góp",
        dataIndex : "price",
        width: "30%"
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

    useEffect(()=>{
      axios.get("/donation/" + id)
        .then( res =>{
          console.log(res.data);
          setData(res.data);
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
      <AddDonation open={open} handleClose={handleClose} handleOpen={handleOpen} render={render} setRender={setRender}/>
    </div>
  );
};

export default DonationDetail;
