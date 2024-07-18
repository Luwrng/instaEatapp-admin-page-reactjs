import { Button, Col, message, Popconfirm, Row, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../api/axios";
import { formatPrice } from "../../utils";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const PackageManagement = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await apiClient.get("/Package", {
        params: {
          pageSize: 9999,
        },
      });

      setData(data?.items?.map((it) => ({ ...it, key: it.packageId })));
    } catch (error) {
      message.error("Fetch data error");
    }
  };

  const deletePackageService = async (packageId) => {
    try {
      await apiClient.delete(`/Package/${packageId}`);
      message.success("Delete package successfully");
      fetchData();
    } catch (error) {
      message.error("Delete package failed");
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "packageId",
      key: "packageId",
    },
    {
      title: "Name",
      dataIndex: "packageName",
      key: "packageName",
    },
    {
      title: "Point",
      dataIndex: "point",
      key: "point",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => {
        return formatPrice(price);
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => {
        return (
          <Space size="middle">
            <Link to={`/package/${record.packageId}/edit`}>
              <EditOutlined />
            </Link>

            <Popconfirm
              title="Delete package"
              description="Are you sure you want to delete this package?"
              onConfirm={() => deletePackageService(record.packageId)}
            >
              <DeleteOutlined />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Row align="middle" justify="space-between">
        <Col>List Package</Col>

        <Col>
          <Link to="/package/add">
            <Button type="primary">Add Package</Button>
          </Link>
        </Col>
      </Row>

      <Table dataSource={data} columns={columns} style={{ marginTop: 32 }} />
    </>
  );
};

export default PackageManagement;
