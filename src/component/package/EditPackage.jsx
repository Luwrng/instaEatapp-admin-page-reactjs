import { Button, Col, Form, Input, InputNumber, message, Row } from "antd";
import React, { useCallback, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import apiClient from "../../api/axios";

const EditPackage = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const { data } = await apiClient.get(`/Package/${id}`);
      form.setFieldsValue(data);
    } catch (error) {
      message.error("Fetch package failed");
    }
  }, [form, id]);

  useEffect(() => {
    fetchData();
  }, [fetchData, id]);

  const onSubmit = (values) => {
    updatePackageService(values);
  };

  const updatePackageService = async (data) => {
    try {
      await apiClient.put(`/Package/${id}`, data);
      message.success("Update package successfully");
      navigate("/package");
    } catch (error) {
      message.error("Update package failed");
    }
  };

  return (
    <>
      <Row align="middle" justify="space-between">
        <Col>Update Package</Col>

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
          Update package
        </Button>
      </Form>
    </>
  );
};

export default EditPackage;
