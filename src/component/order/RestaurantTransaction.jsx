import { Col, message, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import apiClient from "../../api/axios";
import { fetchPackageService, fetchRestaurantService } from "../../api/service";
import dayjs from "dayjs";

const RestaurantTransaction = () => {
  const [data, setData] = useState([]);
  const [restaurantData, setRestaurantData] = useState([]);
  const [packageData, setPackageData] = useState([]);

  useEffect(() => {
    fetchData();

    fetchRestaurantService(setRestaurantData);
    fetchPackageService(setPackageData);
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await apiClient.get("/Order", {
        params: {
          pageSize: 9999,
          minDate: "1/1/1753",
          maxDate: "12/31/9999",
        },
      });

      setData(data?.items?.map((it) => ({ ...it, key: it.orderId })));
    } catch (error) {
      message.error("Fetch data error");
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "orderId",
      key: "orderId",
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
      title: "Package",
      key: "packageId",
      dataIndex: "packageId",
      render: (id) => {
        const foundPackage = packageData.find((it) => it.packageId === id);

        return foundPackage?.packageName;
      },
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (orderDate) => {
        return dayjs(orderDate).format("DD/MM/YYYY HH:mm:ss");
      },
    },
  ];

  return (
    <>
      <Row align="middle" justify="space-between">
        <Col>List Restaurant Transaction</Col>
      </Row>

      <Table dataSource={data} columns={columns} style={{ marginTop: 32 }} />
    </>
  );
};

export default RestaurantTransaction;
