import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Input, InputNumber, Spin } from "antd";
import userapi from "./userapi";
const onFinish = (values) => {
  console.log(values);
};

const validateMessages = {
  required: "${label}",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
const EditUser = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/user/${id}")
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        form.setFieldValue({ user: data });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, [id, form]);
  if (loading) {
    return <Spin tip="Loading..." />;
  }
 const onFinish =(values)=>{
  console.log("Form values:",values);
  
 }
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  return (
    <Form
      form={form}
      name="edit-user"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      validateMessages={validateMessages}
      {...layout}
    >
      <Form.Item
        name={["user", "name"]}
        label="Name"
        rules={[{ type: "name" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name={["user", "phone"]} label="Phone number">
        <Input />
      </Form.Item>
      <Form.Item name={["user", "desciptiion"]} label="Description">
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default EditUser;
