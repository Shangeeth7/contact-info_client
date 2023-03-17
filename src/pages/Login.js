import { Button, Form, Input, PageHeader, Divider } from "antd";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "https://contact-info-2ere.onrender.com/api/user/login",
        values
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <PageHeader
        className="site-page-header"
        title="C.I"
        subTitle="Contact Info"
      />
      <div className="authentication">
        <div className="authentication-form card p-3">
          <div>
            <h1 className="text-white">
              Welcome <span className="bavckss">Back</span>
            </h1>
          </div>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label={<label style={{ color: "white" }}>E-mail</label>}
              name="email"
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              label={<label style={{ color: "white" }}>Password</label>}
              name="password"
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
                type="password"
              />
            </Form.Item>

            <Button
              className="buttonss my-2 full-width-button"
              htmlType="submit"
            >
              LOGIN
            </Button>
          </Form>
          <div className="link-anchor">
            <Link to="/register" className="anchor">
              New ? <span className="bavckss">REGISTER</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
