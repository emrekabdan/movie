import { Menu } from "antd";
import React from "react";
import "./layout.scss";
import { NavLink } from "react-router-dom";

import {
  LogoutOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons/lib/icons";

export default function Sider() {
  const menu = [
    {
      key: "0",
      label: <NavLink to="/">Filmler</NavLink>,
      icon: <VideoCameraOutlined />,
    },
    {
      key: "1",
      label: <NavLink to="/logout">Çıkış</NavLink>,
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <div className="sider">
      <div className="avatar">
        <img src="./assets/img/logo.png" />
      </div>
      <div className="siderMenu">
        <Menu mode="inline" items={menu} />
      </div>
    </div>
  );
}
