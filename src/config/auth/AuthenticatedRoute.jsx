import React from "react";
import { Navigate } from "react-router-dom";

export default function AuthenticatedRoute({ children }) {
  if (sessionStorage.getItem(`session_id`) !== null) {
    return children;
  }
  return <Navigate to="/login" />;
}
