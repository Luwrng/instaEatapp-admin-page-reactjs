import { Button, Col, Form, Input, InputNumber, message, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import apiClient from "../../api/axios";

const AddPackage = () => {
  const [form] = Form.useForm();

  const onSubmit = (values) => {
    addPackageService(values);
  };

  const addPackageService = async (data) => {
    try {
      await apiClient.post("/Package", data);
      message.success("Add package successfully");
      form.resetFields();
    } catch (error) {
      message.error("Add package failed");
    }
  };

  return (
    <>
      <Row align="middle" justify="space-between">
        <Col>Add Package</Col>

        <Col>
          <Link to="/package">
            <Button type="primary">List Package</Button>
          </Link>
        </Col>
      </Row>

      <Form
        style={{
          marginTop: 32,
        }}
        layout="vertical"
        form={form}
        onFinish={onSubmit}
      >
        <Form.Item
          label="Package Name"
          name="packageName"
          rules={[
            {
              required: true,
              message: "Please enter package name",
            },
          ]}
        >
          <Input placeholder="Name" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[
            {
              required: true,
              message: "Please enter price",
            },
          ]}
        >
          <InputNumber placeholder="Price" style={{ minWidth: 200 }} />
        </Form.Item>

        <Form.Item
          name="point"
          label="Point"
          rules={[
            {
              required: true,
              message: "Please enter point",
            },
          ]}
        >
          <InputNumber placeholder="Point" style={{ minWidth: 200 }} />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Add package
        </Button>
      </Form>
    </>
  );
};

export default AddPackage;
