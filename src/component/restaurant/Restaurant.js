import React, { useState } from "react";
import {
  Card,
  Col,
  Row,
  Pagination,
  // SettingOutlined,
  // EditOutlined,
  // EllipsisOutlined,
  Avatar,
} from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  UnorderedListOutlined,
  PhoneOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import restaurant_api from "./restaurant_api";
// import axios from "axios";
import "./Restaurant.css";
const { Meta } = Card;

const Restaurant = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8; // Số lượng thẻ trên mỗi trang

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };
  const navigate = useNavigate();
  const handleViewFood = (list_food) => {
    navigate(`/list_food/${list_food}`);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentCards = restaurant_api.slice(startIndex, endIndex);

  return (
    <div>
      <Row gutter={8} style={{ display: "flex", justifyContent: "center" }}>
        {currentCards.map((card, index) => (
          <Col
            key={index}
            span={6}
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            <Card
              style={{ width: 300 }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <UnorderedListOutlined
                  key="list food"
                  onClick={() => handleViewFood(card.id)}
                />,
                <PhoneOutlined key="phone" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={
                  <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                }
                title={card.title}
                description={card.description}
              />
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={restaurant_api.length}
        onChange={handleChangePage}
        style={{ textAlign: "center", marginTop: 16, marginRight: 16 }}
      />
    </div>
  );
};

export default Restaurant;
