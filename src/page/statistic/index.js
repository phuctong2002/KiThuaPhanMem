import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { HiReceiptTax } from "react-icons/hi";
import PieChart from "./PieChart";

// App.js
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useEffect, useState } from "react";
import { BarChart } from "./BarChart";
import axios from "axios";
import { useNavigate } from "react-router-dom";



import { dataBarChart, dataPieChart } from "../../utils/CreateData";

Chart.register(CategoryScale);

const initData = [
  { id: 1, category: "Nam", quatity: 100 },
  {
    id: 2,
    category: "Nu",
    quatity: 200,
  },
];

const initData2 = [
  {
    id: 1,
    category: "0-20",
    quatity: 200,
  },
  {
    id: 1,
    category: "21-40",
    quatity: 300,
  },
  {
    id: 1,
    category: "41-60",
    quatity: 100,
  },
  {
    id: 1,
    category: "60+",
    quatity: 100,
  },
];

const Statistic = () => {
    const navigate = useNavigate();
    const [person , setPerson] = useState(0);
    const [department , setDepartment] = useState(0);
    const [absence , setAbsence] = useState(0);
    const [sojourn , setSojourn] = useState(0);
    const [payment , setPayment] = useState(0);
    const [donation , setDonation] = useState(0);


  const [barchart, setBarchart] = useState({
    datasets: [
      {
        label: "Số lượng",
        data: initData2.map((item) => item.quatity),
        backgroundColor: ["#2a71d0", "#50AF95", "#f4fc03", "#fc0303" ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
    labels: initData2.map((item)=> item.category)
  });
  const [chartData, setChartData] = useState({
    datasets: [
      {
        label: "Số lượng",
        data: initData.map((item) => item.quatity),
        backgroundColor: ["#2a71d0", "#50AF95"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
    labels: initData.map((item) => item.category),
  });

  useEffect(()=>{
    axios.get("/person/")
    .then( (res)=>{
        console.log(res.data);
        setChartData( dataPieChart(res.data));
        setBarchart(dataBarChart(res.data));
        setPerson(res.data.length);
    })
    .catch( (err)=>{
        console.log(err);
    })
    axios.get("/department/")
        .then( (res)=>{
            setDepartment(res.data.length);
        })
    axios.get("/absence/")
        .then( (res)=>{
            setAbsence(res.data.length);
        })
    axios.get("/sojourn/")
        .then( (res)=>{
            setSojourn(res.data.length);
        })
    axios.get("/payment/event/")
        .then( (res)=>{
            setPayment(res.data.length);
        })
    axios.get("/donation/event/")
        .then( (res)=>{
            setDonation(res.data.length);
        })
  },[])



  return (
    <Grid container spacing={2}>
      <Grid item xs={12} className="flex justify-between">
        <Card sx={{ width: 180, maxHeight: 120 }} >
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Hộ khẩu
              </Typography>
              <Typography
                variant="body2"
                component="div"
                className="flex items-center justify-between"
              >
                <div>
                  <HomeIcon style={{ fontSize: 40 }} />
                </div>
                <div>
                  <h1 className="text-[32px]">{department}</h1>
                </div>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{ width: 180, maxHeight: 120 }}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Nhân khẩu
              </Typography>
              <Typography
                variant="body2"
                component="div"
                className="flex items-center justify-between"
              >
                <div>
                  <Diversity3Icon style={{ fontSize: 40 }} />
                </div>
                <div>
                  <h1 className="text-[32px]">{person}</h1>
                </div>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{ width: 180, maxHeight: 120 }}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Tạm trú
              </Typography>
              <Typography
                variant="body2"
                component="div"
                className="flex items-center justify-between"
              >
                <div>
                  <PersonAddAlt1Icon style={{ fontSize: 40 }} />
                </div>
                <div>
                  <h1 className="text-[32px]">{sojourn}</h1>
                </div>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{ width: 180, maxHeight: 120 }}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Tạm vắng
              </Typography>
              <Typography
                variant="body2"
                component="div"
                className="flex items-center justify-between"
              >
                <div>
                  <PersonRemoveAlt1Icon style={{ fontSize: 40 }} />
                </div>
                <div>
                  <h1 className="text-[32px]">{absence}</h1>
                </div>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{ width: 180, maxHeight: 120 }}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Khoản thu
              </Typography>
              <Typography
                variant="body2"
                component="div"
                className="flex items-center justify-between"
              >
                <div>
                  <HiReceiptTax style={{ fontSize: 40 }} />
                </div>
                <div>
                  <h1 className="text-[32px]">{payment}</h1>
                </div>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{ width: 180, maxHeight: 120 }}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Đóng góp
              </Typography>
              <Typography
                variant="body2"
                component="div"
                className="flex items-center justify-between"
              >
                <div>
                  <VolunteerActivismIcon style={{ fontSize: 40 }} />
                </div>
                <div>
                  <h1 className="text-[32px]">{donation}</h1>
                </div>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid className="flex justify-around items-center " style={{marginTop: 20}} item xs={12}>
        <PieChart chartData={chartData} />
        <BarChart chartData={barchart} />
      </Grid>
    </Grid>
  );
};

export default Statistic;
