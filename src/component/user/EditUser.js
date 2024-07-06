import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://instaeat.azurewebsites.net/api/Account/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        form.setFieldsValue(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        message.error("Failed to fetch user data");
      }
    };

    fetchUser();
  }, [form, id]);

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem("token");
      // Update roleId if needed
      values.roleId = values.roleId || 1; // Default roleId to 1 if not provided
      await axios.put(
        `https://instaeat.azurewebsites.net/api/Account/${id}`,
        {
          name: values.name,
          password: values.password,
          roleId: values.roleId,
          phone: values.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("User updated successfully");
      navigate("/user");
    } catch (error) {
      console.error("Error updating user:", error);
      if (error.response && error.response.data) {
        console.error("Response data:", error.response.data);
        const errorMessages = Object.values(error.response.data.errors).flat();
        errorMessages.forEach((msg) => message.error(msg));
      } else {
        message.error("Failed to update user");
      }
    }
  };

  return (
    <Form
      form={form}
      name="editUserForm"
      onFinish={handleSubmit}
      layout="vertical"
      initialValues={{
        name: "",
        password: "",
        roleId: 1, // Default roleId or set it from fetched data
        phone: "",
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
        label="Mật khẩu"
        name="password"
        rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Role ID"
        name="roleId"
        rules={[{ required: true, message: "Vui lòng nhập Role ID!" }]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label="Điện thoại"
        name="phone"
        rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update User
        </Button>
        <Button
          style={{ marginLeft: "10px" }}
          onClick={() => navigate("/user")}
        >
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditUser;
