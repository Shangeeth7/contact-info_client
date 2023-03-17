import "./notFound.css";
import { PageHeader, Divider } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export function NotFound() {
  const goBack = (
    <Link style={{ color: "grey" }} to="/login">
      <u>Home page</u>
    </Link>
  );
  return (
    <div>
      <PageHeader
        className="site-page-header"
        title="Contact Info - Not Found"
        extra={goBack}
      />

      <div className="image-container" alt="error:404"></div>
    </div>
  );
}
