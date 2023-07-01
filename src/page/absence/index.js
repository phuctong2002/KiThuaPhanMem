import { Table } from "antd";
import axios from "axios";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
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
  const [data, setData] = useState(initData);
  const [open, setOpen] = useState(false);
  const [render, setRender] = useState(0);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = (record)=>{
    console.log(record);
    axios.delete(`/absence/${record.id}`)
      .then((res)=>{
        console.log(res);
        setRender(render+1);
      })
      .catch( (err)=>{
        console.log(err);
      })
  }
  const columns = [
    {
      title: "Nhân khẩu",
      dataIndex: "person_name",
    },
    {
      title: "Địa điểm",
      dataIndex: "place",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "start_date",
    },
    {
      title: "Ngày kết thúc",
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
          {/* <EditIcon
            style={{ cursor: "pointer", marginRight: 20, color: "#E4CCCC" }}
          /> */}
          <DeleteIcon style={{ cursor: "pointer", color: "red" }} onClick={()=> handleDelete(record)}/>
        </>
      ),
    },
  ];
  

  useEffect(() => {
    axios
      .get("/absence/")
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
      <AddAbsence
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
        render={render}
        setRender={setRender}
      />
    </div>
  );
};

export default Absence;
