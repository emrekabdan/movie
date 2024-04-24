import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import Index from "../layout";

import Callback from "./auth/Callback";
import Login from "./auth/Login";
import Logout from "./auth/Logout";
import AuthenticatedRoute from "./auth/AuthenticatedRoute";

const Main = lazy(() => import("../pages/main"));
const NotFound = lazy(() => import("./errors/NotFound"));

function RenderPage(children) {
  return <Suspense>{children}</Suspense>;
}

export default function RouteWrapper() {
  return (
    <div>
      <Routes>
        <Route
          element={
            <AuthenticatedRoute>
              <Index />
            </AuthenticatedRoute>
          }
        >
          <Route path="/" element={RenderPage(<Main />)} />
        </Route>
        <Route path="*" element={RenderPage(<NotFound />)} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={RenderPage(<Login />)} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </div>
  );
}
