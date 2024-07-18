import { Col, Image, message, Row, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import apiClient from "../../api/axios";
import dayjs from "dayjs";
import { fetchRestaurantService, fetchUserService } from "../../api/service";

const ReviewManagement = () => {
  const [data, setData] = useState([]);
  const [restaurantData, setRestaurantData] = useState([]);
  const [accountData, setAccountData] = useState([]);

  useEffect(() => {
    fetchData();

    fetchRestaurantService(setRestaurantData);
    fetchUserService(setAccountData);
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await apiClient.get("/Review/restaurant", {
        params: {
          pageSize: 9999,
        },
      });

      setData(data?.items?.map((it) => ({ ...it, key: it.reviewId })));
    } catch (error) {
      message.error("Fetch data error");
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "reviewId",
      key: "reviewId",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      render: (_, record) => {
        return (
          <Space>
            <Image src={record?.image} width={100} height={100} />

            <p>{record.content}</p>
          </Space>
        );
      },
    },
    {
      title: "Restaurant",
      key: "restaurant",
      dataIndex: "restaurantId",
      render: (id) => {
        const foundRestaurant = restaurantData.find(
          (it) => it.restaurantId === id
        );

        return foundRestaurant?.restaurantName;
      },
    },
    {
      title: "Customer",
      key: "customerId",
      dataIndex: "customerId",
      render: (id) => {
        const foundCustomer = accountData.find((it) => it.userId === id);

        return foundCustomer?.name;
      },
    },
    {
      title: "Review At",
      dataIndex: "created",
      key: "created",
      render: (createdAt) => {
        return dayjs(createdAt).format("DD/MM/YYYY HH:mm:ss");
      },
    },
  ];

  return (
    <>
      <Row align="middle" justify="space-between">
        <Col>List Review</Col>
      </Row>

      <Table dataSource={data} columns={columns} style={{ marginTop: 32 }} />
    </>
  );
};

export default ReviewManagement;
