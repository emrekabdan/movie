import React from "react";
import { Button } from "antd";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import "./layout.scss";

export default function Header({ collapsed, setCollapsed }) {
  return (
    <div className="header">
      <Button
        className="menuCollapsed"
        type="primary"
        onClick={() => {
          setCollapsed(!collapsed);
        }}
        style={{
          marginBottom: 16,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
    </div>
  );
}
