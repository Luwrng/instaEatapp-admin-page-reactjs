import React from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUserForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://instaeat.azurewebsites.net/api/Account/register",
        {
          name: values.name,
          username: values.username,
          phone: values.phone,
          password: values.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("User added successfully");
      navigate("/user");
    } catch (error) {
      console.error("Error adding user:", error);
      if (error.response && error.response.data) {
        console.error("Response data:", error.response.data);
        const errorMessages = Object.values(error.response.data.errors).flat();
        errorMessages.forEach((msg) => message.error(msg));
      } else {
        message.error("Failed to add user");
      }
    }
  };

  return (
    <Form
      form={form}
      name="addUserForm"
      onFinish={handleSubmit}
      layout="vertical"
      initialValues={{
        name: "",
        username: "",
        phone: "",
        password: "",
      }}
    >
      <Form.Item
        label="Tên"
        name="name"
        rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Tài khoản"
        name="username"
        rules={[{ required: true, message: "Vui lòng nhập tài khoản!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Điện thoại"
        name="phone"
        rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Thêm người dùng
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddUserForm;
