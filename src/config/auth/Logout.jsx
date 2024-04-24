import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { message } from "antd";

import { deleteSession } from "../../services/login";

function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    const sessionId = JSON.parse(window.sessionStorage.getItem("session_id"));
    deleteSession(sessionId)
      .then((res) => {
        const { success } = res.data;
        if (success === true) {
          sessionStorage.clear();
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log("err", err);
        const { success, status_message, status_code } = err.response.data;
        if (success === false) {
          message.error(`CODE:${status_code} MESSAGE:${status_message}`);
          navigate("/");
        }
      });
  }, []);

  return <></>;
}

export default Logout;
