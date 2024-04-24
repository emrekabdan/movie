import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="notFound">
      <Result
        status="404"
        title="404"
        subTitle="Sayfa Bulunamadı"
        extra={
          <Button tyoe="primary" onClick={() => navigate("/")}>
            Anasayfaya Dön
          </Button>
        }
      />
    </div>
  );
}
