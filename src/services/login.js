import axios from "axios";
const apiUrl = process.env.SOME_IMPORTANT_APIURL;
const accessToken = JSON.parse(window.sessionStorage.getItem("access_token"));

export const guest_session = (authorization) =>
  axios({
    method: "GET",
    url: `${apiUrl}3/authentication/token/new`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${authorization}`,
    },
  }).then((response) => response);

export const session = (token) =>
  axios({
    method: "POST",
    url: `${apiUrl}3/authentication/session/new`,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: { request_token: token },
  }).then((response) => response);

export const deleteSession = (sessionId) =>
  axios({
    method: "DELETE",
    url: `${apiUrl}3/authentication/session`,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: { session_id: sessionId },
  }).then((response) => response);

export const allow = (requestToken) => {
  const to = "http://192.168.4.73:3000/callback";
  const lin = "https://www.themoviedb.org/authenticate/";
  const url = `${lin}${requestToken}?redirect_to=${to}`;
  console.log(url);
  window.location = url;
};
