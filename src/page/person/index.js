import { Button } from "@mui/material";
import { Table } from "antd";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import AddPerson from "./AddPerson";
import DeadForm from "./DeadForm";
import moment from "moment";
import { Reorder } from "@mui/icons-material";



const initData = [
  {
    key: 1,
    manhankhau: 1,
    hoten: "Tong Phuc",
    bidanh: "TP",
    cccd: 5654431,
    ngaycap: "15/09/2002",
    noicap: "Thanh Hoa",
    nghenghiep: "Sinh vien",
    dantoc: "Kinh",
    nguyenquan: "Thanh Hoa",
    ngaysinh: "15/09/2002",
    noisinh: "Thanh Hoa",
  },
];

const Person = () => {
  const currentDate = moment().format("DD-MM-YYYY");
  const [openAddForm, setOpenAddForm] = useState(false);
  const [openDeadForm, setOpenDeadForm] = useState(false);
  const handleOpen = () => {
    setOpenAddForm(true);
  };
  const handleClose = () => setOpenAddForm(false);
  const handleOpenDeadForm = () => {
    setOpenDeadForm(true);
  };
  const handleCloseDeadForm = () => setOpenDeadForm(false);
  const [render, setRender] = useState(0);
  const [data, setData] = useState(initData);

  const handleDelete = (record)=>{
    console.log( record.key)
    axios.delete(`/person/${record.key}`)
    .then((res) => {
        console.log(res.data);
        setRender(render+1);
      })
      .catch( (err)=>{
        console.log(err);
      })
  }
  const columns = [
    {
      title: "Ma Nhan Khau",
      dataIndex: "manhankhau",
      key: "manhankhau",
    },
    {
      title: "Ho Ten",
      dataIndex: "hoten",
      key: "hoten",
    },
    {
      title: "Bi Danh",
      dataIndex: "bidanh",
      key: "bidanh",
    },
    {
      title: "CCCD",
      dataIndex: "cccd",
      key: "cccd",
    },
    {
      title: "Ngay Cap",
      dataIndex: "ngaycap",
      key: "ngaycap",
    },
    {
      title: "Noi Cap",
      dataIndex: "noicap",
      key: "noicap",
    },
    {
      title: "Gioi tinh",
      dataIndex: "gioitinh",
      key: "gioitinh",
    },
    {
      title: "Nghe nghiep",
      dataIndex: "nghenghiep",
      key: "ngheghiep",
    },
    {
      title: "Dan toc",
      dataIndex: "dantoc",
      key: "dantoc",
    },
    {
      title: "Nguyen quan",
      dataIndex: "nguyenquan",
      key: "nguyenquan",
    },
    {
      title: "Ngay sinh",
      dataIndex: "ngaysinh",
      key: "ngaysinh",
    },
    {
      title: "Noi lam viec",
      dataIndex: "noilamviec",
      key: "noilamviec",
    },
    {
      title: "Ghi chu",
      dataIndex: "ghichu",
      key: "ghichu",
    },
    {
      title: "Thuong tru chuyen den",
      dataIndex: "thuongtru"
    },
    {
      title: "Thao tac",
      render: (_, record) => (
        <>
          <EditIcon />
          <DeleteIcon style={{ cursor: "pointer", color: "red" }} onClick={()=> handleDelete(record)} />
        </>
      ),
      width: "7%"
    },
  ];
  // const [render, setRender] = useState(1);

  useEffect(() => {
    axios
      .get("/person/")
      .then((response) => {
        const newData = response.data.map((item, index) => {
          return {
            key: item.id,
            manhankhau: item.id,
            hoten: item.name,
            gioitinh: item?.gender,
            bidanh: item.alias,
            noilamviec: item.workspace,
            cccd: item.id_card,
            ngaycap: item.create_at,
            noicap: item.issued_by,
            nghenghiep: item.job,
            dantoc: item.nation,
            nguyenquan: item.home_town,
            ngaysinh: item.birth,
            ghichu: item.note,
            thuongtru: item.address,
          };
        });
        setData(newData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [render]);

  return (
    <div>
      <div className="mb-[10px]">
        <Button
          onClick={handleOpen}
          style={{ borderRadius: 20, width: 120, marginRight: 16 }}
          variant="contained"
        >
          Thêm{" "}
        </Button>
        <Button
          onClick={handleOpenDeadForm}
          style={{ width: 120, borderRadius: 20 }}
          variant="contained"
        >
          Khai tử
        </Button>
      </div>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 4 }} />
      <AddPerson
        handleClose={handleClose}
        open={openAddForm}
        handleOpen={handleOpen}
        render={render}
        setRender={setRender}
      />
      <DeadForm
        handleClose={handleCloseDeadForm}
        open={ openDeadForm}
        handleOpen={handleOpenDeadForm}
        person={data}
      ></DeadForm>
    </div>
  );
};

export default Person;
