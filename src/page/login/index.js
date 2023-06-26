import { Row, Col, Input, Space } from "antd";
import Button from '@mui/material/Button';
import { EyeTwoTone ,EyeInvisibleOutlined, UserOutlined} from "@ant-design/icons";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import login from "../../asset/img/login.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const username = useRef(null);
  const password = useRef(null);



  const handleLogin = ()=>{
    const obj = {
      "username": username.current.input.value,
      "password": password.current.input.value
    }
    console.log( obj);
    if( !obj.password || !obj.password){
      console.error("Nhap lai thong tin dang nhap");
      return 
    }
    axios.post("/user", obj)
      .then( (reponse)=>{
        sessionStorage.setItem("username", reponse.data.username);
        console.log(reponse.data);
        navigate("/");
      })
      .catch( (err)=>{
        console.log(err);
      });

  }

  return (
    <div className="h-[100vh]">
      <Row className="h-[100%]">
        <Col span={12}>
          <img src={login} className="h-[100%] contain" />
        </Col>
        <Col span={12}>
          <div className="border-solid border-[2px] rounded-[10px]  m-[100px] p-[40px] h-[500px] w-[500px]  flex flex-col">
            <h6 className="text-center mb-[20px] mt-[40px] text-[32px] text-[Montserrat]">Login Form</h6>
            <div className="pb-[15px]">
              <h1 className="text-[#666666] text-[16px]">Email</h1>
              <Input ref={username} size="large" className="w-[100%] rounded-[20px]" placeholder="Your email" />
            </div>
            <div className="py-[15px]">
              <h1 className="text-[#666666] text-[16px]">Password</h1>
                <Input.Password ref={password} className="w-[100%] rounded-[20px]" size="large" placeholder="Password" />
            </div>
            <div className="mt-[15px] flex">
                <Button onClick={handleLogin} style={{width:"100%", borderRadius: "20px"}} variant="contained">Log in</Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
