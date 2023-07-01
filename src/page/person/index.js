import { Button } from "@mui/material";
import { Table } from "antd";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import AddPerson from "./AddPerson";
import DeadForm from "./DeadForm";
import EditPerson from "./EditPerson";



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
  const [item, setItem] = useState(initData);

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);


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
      title: "Mã nhân khẩu",
      dataIndex: "manhankhau",
      key: "manhankhau",
    },
    {
      title: "Họ tên",
      dataIndex: "hoten",
      key: "hoten",
    },
    {
      title: "Bí danh",
      dataIndex: "bidanh",
      key: "bidanh",
    },
    {
      title: "CCCD",
      dataIndex: "cccd",
      key: "cccd",
    },
    {
      title: "Ngày cấp",
      dataIndex: "ngaycap",
      key: "ngaycap",
    },
    {
      title: "Nơi cấp",
      dataIndex: "noicap",
      key: "noicap",
    },
    {
      title: "Giới tính",
      dataIndex: "gioitinh",
      key: "gioitinh",
    },
    {
      title: "Nghề nghiệp",
      dataIndex: "nghenghiep",
      key: "ngheghiep",
    },
    {
      title: "Dân tộc",
      dataIndex: "dantoc",
      key: "dantoc",
    },
    {
      title: "Nguyên quán",
      dataIndex: "nguyenquan",
      key: "nguyenquan",
    },
    {
      title: "Ngày sinh",
      dataIndex: "ngaysinh",
      key: "ngaysinh",
    },
    {
      title: "Nơi làm việc",
      dataIndex: "noilamviec",
      key: "noilamviec",
    },
    {
      title: "Ghi chú",
      dataIndex: "ghichu",
      key: "ghichu",
    },
    {
      title: "Thường trú chuyển đến",
      dataIndex: "thuongtru"
    },
    {
      title: "Hành động",
      render: (_, record) => (
        <>
          <EditIcon style={{ cursor: "pointer" }} onClick={()=> handleEdit(record)}/>
          <DeleteIcon style={{ cursor: "pointer", color: "red" }} onClick={()=> handleDelete(record)} />
        </>
      ),
      width: "7%"
    },
  ];
  const handleEdit = (record)=>{
    setItem(record);
    setOpenEdit(true);
    console.log(record);
  }
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
            ngaycap: item.created_at,
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
      <EditPerson 
        handleClose={handleCloseEdit}
        open={ openEdit}
        handleOpen={handleOpenEdit}
        person={item}
        render={render}
        setRender={setRender}
      />
    </div>
  );
};

export default Person;
