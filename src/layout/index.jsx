import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router";

import Header from "./header";
import "./layout.scss";
import "./antTheme.scss";
import Sider from "./sider";
const isMobile = window.matchMedia("only screen and (max-width: 830px)");
export default function Index() {
  const [collapsed, setCollapsed] = useState(isMobile.matches);
  const [mobile, setMobile] = useState(isMobile.matches);
  useEffect(() => {
    window
      .matchMedia("only screen and (max-width: 830px)")
      .addEventListener("change", (e) => {
        setCollapsed(e.matches);
        setMobile(e.matches);
      });
  }, []);
  return (
    <Layout className="layout">
      <Layout.Sider collapsed={collapsed} collapsedWidth="0">
        <Sider />
      </Layout.Sider>
      <Layout
        onClickCapture={() => {
          if (mobile === true) {
            setCollapsed(true);
          }
        }}
      >
        <Layout.Header>
          <Header setCollapsed={setCollapsed} collapsed={collapsed} />
        </Layout.Header>
        <Layout.Content className="content">
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
