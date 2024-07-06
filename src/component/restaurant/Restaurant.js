import React, { useState, useEffect } from "react";
import {
  Card,
  Col,
  Row,
  Pagination,
  Avatar,
  Button,
  Popconfirm,
  message,
} from "antd";
import axios from "axios";
import {
  UnorderedListOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import "./Restaurant.css";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/axios";

const { Meta } = Card;

const Restaurant = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [restaurants, setRestaurants] = useState([]);
  const pageSize = 8; // Số lượng thẻ trên mỗi trang
  const navigate = useNavigate(); // Sử dụng useNavigate thay thế useHistory

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://instaeat.azurewebsites.net/api/Restaurant",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response data:", response.data);
      if (response.data && response.data.items) {
        setRestaurants(response.data.items); // Lưu dữ liệu từ server vào state restaurants
      } else {
        console.error("Invalid data received:", response.data);
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleViewFood = (restaurantId) => {
    navigate(`/list_food/${restaurantId}`);
  };

  const handleAddRestaurant = () => {
    navigate("/add-restaurant");
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentCards = restaurants.slice(startIndex, endIndex);

  const onDelete = async (id) => {
    try {
      await apiClient.delete("/Restaurant/" + id);
      message.success("Delete successfully");
      fetchRestaurants();
    } catch (error) {
      message.error("Internal server error!");
    }
  };

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginBottom: "10px" }}
        onClick={handleAddRestaurant}
      >
        Add Restaurant
      </Button>
      <Row gutter={8} style={{ display: "flex", justifyContent: "center" }}>
        {currentCards.map((restaurant) => (
          <Col
            key={restaurant.restaurantId}
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
                  alt="restaurant"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <UnorderedListOutlined
                  key="list food"
                  onClick={() => handleViewFood(restaurant.restaurantId)}
                />,
                <Popconfirm
                  title="Delete restaurant"
                  description="Are you sure to delete this restaurant?"
                  onConfirm={() => onDelete(restaurant.restaurantId)}
                  okText="Yes"
                  cancelText="No"
                >
                  <DeleteOutlined />
                </Popconfirm>,
                <EllipsisOutlined key="ellipsis" />,
                <EditOutlined />,
              ]}
            >
              <Meta
                avatar={
                  <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${restaurant.restaurantId}`}
                  />
                }
                title={restaurant.restaurantName}
                description={restaurant.address}
              />
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={restaurants.length}
        onChange={handleChangePage}
        style={{ textAlign: "center", marginTop: 16, marginRight: 16 }}
      />
    </div>
  );
};

export default Restaurant;
