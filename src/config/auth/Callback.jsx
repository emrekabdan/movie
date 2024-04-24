import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { message } from "antd";

import useSessionStorage from "../../hooks/useSessionStorage";
import { session } from "../../services/login";

function Callback() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const requestToken = searchParams.get("request_token");
  const approved = searchParams.get("approved");
  const [, setSessionId] = useSessionStorage("session_id", null);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("requestToken", requestToken);
    console.log("approved", approved);
    session(requestToken)
      .then((res) => {
        console.log("res", res);
        const { session_id, success } = res.data;
        if (success === true) {
          setSessionId(session_id);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("err", err.response.data);
        const { success, status_message, status_code } = err.response.data;
        if (success === false) {
          message.error(`CODE:${status_code} MESSAGE:${status_message}`);
          navigate("/login");
        }

        console.log("err", err);
      });
  }, []);

  return <></>;
}

export default Callback;
