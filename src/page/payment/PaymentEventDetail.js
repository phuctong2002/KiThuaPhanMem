import { Table } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import AddPayment from "./AddPayment";

const initData = [
  {
    mahokhau: "1",
    machuho: "1",
    ten: "Phuc",
    diachi: "Tho Xuan, Thanh Hoa",
  },
];

const PaymentEventDetail = () => {
  const {id} = useParams();
  const columns = [
    {
      title: "Hộ gia đình",
      dataIndex: "department_name",
      width: "40%"
    },
    {
      title: "Ngày đóng",
      dataIndex : "date",
      width: "40%"
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
      axios.get("/payment/" + id)
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
      <AddPayment open={open} handleClose={handleClose} handleOpen={handleOpen} render={render} setRender={setRender}/>
    </div>
  );
};

export default PaymentEventDetail;
