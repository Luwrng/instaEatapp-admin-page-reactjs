import { Col, message, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import apiClient from "../../api/axios";
import { fetchUserService } from "../../api/service";
import { EditOutlined } from "@ant-design/icons";
import UpdatePointModal from "./UpdatePointModal";

const WalletManagement = () => {
  const [data, setData] = useState([]);
  const [accountData, setAccountData] = useState([]);

  useEffect(() => {
    fetchData();

    fetchUserService(setAccountData);
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await apiClient.get("/Wallet", {
        params: {
          pageSize: 9999,
        },
      });

      setData(data?.items?.map((it) => ({ ...it, key: it.walletId })));
    } catch (error) {
      message.error("Fetch data error");
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "walletId",
      key: "walletId",
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
      title: "Total Point",
      dataIndex: "totalPoint",
      key: "totalPoint",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        const foundCustomer = accountData.find(
          (it) => it.userId === record?.userId
        );

        return (
          <UpdatePointModal
            name={foundCustomer?.name}
            id={record.walletId}
            currentPoint={record?.totalPoint}
            refresh={fetchData}
          >
            <EditOutlined style={{ cursor: "pointer" }} />
          </UpdatePointModal>
        );
      },
    },
  ];

  return (
    <>
      <Row align="middle" justify="space-between">
        <Col>List Customer Wallet</Col>
      </Row>

      <Table dataSource={data} columns={columns} style={{ marginTop: 32 }} />
    </>
  );
};

export default WalletManagement;
