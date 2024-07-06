import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, message } from "antd";

const Login = () => {
  const isLogged = localStorage.getItem("token");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Success:", values);
    await login();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Please fill in both username and password.");
  };

  const login = async () => {
    console.warn(username, password);
    let item = { username, password };

    try {
      let response = await fetch(
        "https://instaeat.azurewebsites.net/api/Account/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(item),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to authenticate.");
      }

      let result = await response.json();
      const profile = result.profile[0];
      if (profile.roleId === 1) {
        localStorage.setItem("token", result.token); // Lưu token vào localStorage
        localStorage.setItem("user", JSON.stringify(profile));
        window.location.href = "/";
      } else {
        message.info("Permission denied!");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to login. Please check your credentials.");
    }
  };

  if (isLogged) {
    return <Navigate to="/home" />;
  }

  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input onChange={(e) => setUsername(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
