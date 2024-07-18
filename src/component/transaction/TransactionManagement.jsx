import { Col, message, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import apiClient from "../../api/axios";
import { fetchRestaurantService, fetchUserService } from "../../api/service";
import dayjs from "dayjs";

const TransactionManagement = () => {
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
      const { data } = await apiClient.get("/Transaction", {
        params: {
          pageSize: 9999,
          minDate: "1/1/1753",
          maxDate: "12/31/9999",
        },
      });

      setData(data?.items?.map((it) => ({ ...it, key: it.transactionId })));
    } catch (error) {
      message.error("Fetch data error");
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "transactionId",
      key: "transactionId",
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
      key: "userId",
      dataIndex: "userId",
      render: (id) => {
        const foundCustomer = accountData.find((it) => it.userId === id);

        return foundCustomer?.name;
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Created At",
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
        <Col>List Transaction</Col>
      </Row>

      <Table dataSource={data} columns={columns} style={{ marginTop: 32 }} />
    </>
  );
};

export default TransactionManagement;
