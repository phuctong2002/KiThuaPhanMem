import {
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
import {HiReceiptTax} from "react-icons/hi";
import BarChartIcon from '@mui/icons-material/BarChart';
import HomeIcon from '@mui/icons-material/Home';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { useNavigate } from "react-router-dom";
const { Header, Content, Sider } = Layout;


function getItem(label, key, icon, route) {
  return {
    key,
    icon,
    route,
    label,
  };
}

const items = [
  getItem("Thống kê", "0", <BarChartIcon style={{fontSize:24}}/>, "/"),
  getItem("Hộ khẩu", "1", <HomeIcon style={{fontSize:24}}/>, "/department"),
  getItem("Nhân khẩu", "2", <Diversity3Icon style={{fontSize:24}}/>, "/person"),
  getItem("Tạm trú", "3", <PersonAddAlt1Icon style={{fontSize:24}}/>, "/sojourn"),
  getItem("Tạm vắng", "4", <PersonRemoveAlt1Icon style={{fontSize:24}}/>, "/absence"),
  getItem("Thu phí", "5", <HiReceiptTax style={{fontSize:24}}/>, "/payment"),
  getItem("Đóng góp", "6", <VolunteerActivismIcon style={{fontSize:24}}/>, "/donation"),
];


const MyLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const handleLogout = ()=>{
    sessionStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{height: "100vh", backgroundColor:"#cfdedb"}}
      >
        <div className="h-[60px] mb-[20px] leading-[60px] font-medium text-[28px] text-[#0D062D] text-center"><h1>{ collapsed? "Q" : "QLDC"}</h1></div>
        <Menu
        style={{backgroundColor:"#cfdedb"}}
          defaultSelectedKeys={["0"]}
          mode="inline"
        >
          {items.map((item, index) => {
            return (
              <Menu.Item 
                className="text-[16px]"
                key={index}
                icon={item.icon}
                onClick={() => navigate(item.route)}
              >
                {item.label}
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="flex justify-end items-center"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            onClick={handleLogout}
            className="flex items-center bg-[#334454] mr-[50px]"
            type="primary"
            icon={<LogoutOutlined className="block text-[16px]" />}
          >
            Log out
          </Button>
        </Header>
        <Content
          style={{
            margin: "20px 20px",
          }}
        >
          <div
            className="h-[100%] shadow-lg rounded-lg p-4"
            style={{
              padding: 24,
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MyLayout;
