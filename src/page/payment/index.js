import { Table } from "antd";
import axios from "axios";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddEvent from "./AddEvent";

const initData = [
  {
    tenkhoanthu: "Tien cuu chien binh Viet Nam",
    sotien: "10000",
    thuduoc: "10000000",
  },
];

const Payment = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Tên khoản thu",
      dataIndex: "name",
      width: "40%",
    },
    {
      title: "Số tiền",
      dataIndex: "aom",
      width: "40%",
    },
    {
      title: "Hành động",
      render: (_, record) => (
        <>
          <Button
            style={{ borderRadius: 20, marginRight: 20 }}
            variant="contained"
            fontSize="small"
            onClick={()=>{
              console.log(record);
              navigate(`/payment-event-detail/${record.id}`)
            }}
          >
            Detail
          </Button>
        </>
      ),
      width: "20%",
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
      .get("/payment/event/")
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
      <AddEvent open={open} handleClose={handleClose} handleOpen={handleOpen} render={render} setRender={setRender} />
    </div>
  );
};

export default Payment;
