import {useEffect, useState} from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { Table } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddMember from "./AddMember";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const memeberColumn = [
  {
    title: "Ma ho khau",
    dataIndex: "mahokhau",
    width: "25%"
  },
  {
    title: "Ma nhan khau",
    dataIndex: "manhankhau",
    width: "25%"
  },
  {
    title: "Ten",
    dataIndex: "ten",
    width: "25%",
  },
  {
    title: "Quan he",
    dataIndex: "quanhe",
    width: "25%",
  }

]

const changeColumn = [
  {
    title: "Ngay thoi doi",
    dataIndex: "date",
    width: "50%"
  },
  
  {
    title: "Noi dung thay doi",
    dataIndex: "content",
    width: "50%"
  }
]



const DepartmentDetail = () => {
  const {id} = useParams();
  const [value, setValue] = useState(0);

  const [open, setOpen] = useState(false);
  const [item, setItem] = useState(null);
  const [member, setMember] = useState(null);
  const [render, setRender] = useState(0);
  const [change, setChange] = useState(null);

  const handleOpen = (item) => {
    setOpen(true);
    setItem(item);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(()=>{
    axios.get(`/department/relation/${id}`)
    .then(res => {
        console.log(res.data);  
        const newData = res.data.map( (item, index)=>{
          return {
            mahokhau: item.department_id,
            manhankhau: item.person_id,
            ten: item.person_name,
            quanhe: item.relation,
            
          }
        })
        setMember(newData);
      })
    .catch( err => {
      console.log(err);
    })
    axios.get(`/department/change/${id}`)
      .then((res)=>{
        console.log(res.data);
        setChange(res.data);
      })
  },[render])

  return (
    <Box className="" sx={{ flexGrow: 1 }}>
      <Grid className="px-[24px] pt-[0px] " container spacing={2}>
        <Grid item xs={12} className="">
          <Item className="text-[28px] py-[0px] w-[100%]">
            <h4 className="text-[24px] text-left text-[black] w-[100%] bg-[white] font-[600] my-[0]">
              Chi tiết
            </h4>
          </Item>
        </Grid>
        <Grid style={{ paddingTop: "0px" }} item xs={12}>
          <Box sx={{ width: "100%" }}>
            <Box
              className="bg-[white] w-[100%] flex  justify-between"
              sx={{ borderBottom: 1, borderColor: "divider" }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Thành viên" {...a11yProps(0)} />
                <Tab label="Thay đổi" {...a11yProps(1)} />
              </Tabs>
              <div>
                <Button
                  onClick={handleOpen}
                  style={{marginRight: 20, width: 120, borderRadius: 20 }}
                  variant="contained"
                >
                  Them tv
                </Button>
                <Button
                  // onClick={handleOpen}
                  style={{ width: 120, borderRadius: 20 }}
                  variant="contained"
                >
                  Tach ho
                </Button>
              </div>
            </Box>
            <TabPanel className={`h-[490px]`} value={value} index={0}>
              <Table columns={memeberColumn} dataSource={member} pagination={{ pageSize: 4}}/>
              <AddMember open={open} handleClose={handleClose} render={render} setRender={setRender}/>
            </TabPanel>
            <TabPanel value={value} index={1} className="h-[490px]">
              <Table columns={changeColumn} dataSource={change} pagination={{ pageSize: 4}}/>
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DepartmentDetail;
