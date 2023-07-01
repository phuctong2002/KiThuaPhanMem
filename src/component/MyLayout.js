import {
  LogoutOutlined,
} from "@ant-design/icons";
import { Breadcrumb,Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
import {BsFillHouseFill, BsFillPeopleFill, BsHouseAddFill, BsHouseDashFill} from "react-icons/bs"
import {HiReceiptTax} from "react-icons/hi";
import { useNavigate } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;


function getItem(label, key, icon, route) {
  return {
    key,
    icon,
    route,
    label,
  };
}

const items = [
  getItem("Hộ khẩu", "1", <BsFillHouseFill/>, "/"),
  getItem("Nhân khẩu", "2", <BsFillPeopleFill />, "/person"),
  getItem("Tạm trú", "3", <BsHouseAddFill/>, "/sojourn"),
  getItem("Tạm vắng", "4", <BsHouseDashFill />, "/absence"),
  getItem("Thu phí", "5", <HiReceiptTax />, "/payment"),
  getItem("Đóng góp", "6", <HiReceiptTax />, "/donation"),
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
