import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Steps,
} from "antd";

import "./style.scss";
import { allow, guest_session } from "../../services/login";
import useSessionStorage from "../../hooks/useSessionStorage";

const Login = () => {
  const [form] = Form.useForm();
  const [session, setSession] = useState({});
  const [, setAccessToken] = useSessionStorage("access_token", null);

  const updateApiKey = (val) => {
    form.setFieldsValue({
      apikey:
        val === "ACCESS"
          ? process.env.SOME_IMPORTANT_ACCESS
          : process.env.SOME_IMPORTANT_APIKEY,
    });
  };

  const selectAfter = (
    <Select defaultValue="APIKEY" onSelect={updateApiKey}>
      <Select.Option value="APIKEY">API Key Auth</Select.Option>
      <Select.Option value="ACCESS">Access Token Auth</Select.Option>
    </Select>
  );

  const steps = [
    {
      title: "Request Token oluşturma",
      content: (
        <>
          <Form.Item
            name="apikey"
            rules={[
              {
                required: true,
                message: "Please input your apikey!",
              },
            ]}
          >
            <Input addonBefore="Header" addonAfter={selectAfter} />
          </Form.Item>
        </>
      ),
    },
    {
      title: "İzin alma",
      content: (
        <div className="allow">
          <div>Oturum Süresi: {session.expiresAt}</div>
          <div>Oturum Id: {session.requestToken}</div>
        </div>
      ),
    },
  ];
  const [current, setCurrent] = useState(0);
  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const onFinish = (values) => {
    if (values.apikey !== undefined) {
      setAccessToken(values.apikey);
      guest_session(values.apikey)
        .then((res) => {
          const { success, request_token, expires_at } = res.data;
          if (success === true) {
            setSession({
              requestToken: request_token,
              expiresAt: expires_at,
            });
            setCurrent(current + 1);
          }
        })
        .catch((err) => {
          console.log("err", err.response.data);
          const { success, status_message, status_code } = err.response.data;
          if (success === false) {
            message.error(`CODE:${status_code} MESSAGE:${status_message}`);
          }
        });
    }
  };

  return (
    <>
      <Row justify="center">
        <Col span={12}>
          <Form form={form} name="basic" onFinish={onFinish} autoComplete="off">
            <Card
              title="Giriş İşlemleri"
              actions={[
                <div>
                  {current > 0 && (
                    <Button
                      style={{
                        margin: "0 8px",
                      }}
                      onClick={() => prev()}
                    >
                      Geri
                    </Button>
                  )}
                  {current < steps.length - 1 && (
                    <Button type="primary" htmlType="submit">
                      İleri
                    </Button>
                  )}
                  {current === steps.length - 1 && (
                    <Button
                      type="primary"
                      onClick={() => {
                        allow(session.requestToken);
                      }}
                    >
                      Bitir
                    </Button>
                  )}
                </div>,
              ]}
            >
              <Steps current={current} items={items} />

              <div className="loginContent">{steps[current].content}</div>
            </Card>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default Login;
