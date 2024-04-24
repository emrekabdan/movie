import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
import RouteWrapper from "./config/routeWrapper";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <BrowserRouter>
      <RouteWrapper />
    </BrowserRouter>
  </>
);
reportWebVitals();
