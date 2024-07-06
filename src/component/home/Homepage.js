import React, { useEffect, useState } from "react";
import { Statistic, Card, Row, Col } from "antd";
import apiClient from "../../api/axios";

const Homepage = () => {
  const [userData, setUserData] = useState([]);
  const [restaurantData, setRestaurantData] = useState([]);

  useEffect(() => {
    // Fetch user data
    apiClient
      .get("/Account")
      .then((response) => {
        setUserData(response.data?.items);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    // Fetch restaurant data
    apiClient
      .get("/Restaurant")
      .then((response) => {
        setRestaurantData(response.data?.items);
      })
      .catch((error) => {
        console.error("Error fetching restaurant data:", error);
      });
  }, []);

  return (
    <div>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic title="User Count" value={userData.length} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Restaurant Count" value={restaurantData.length} />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: "16px" }}>
        <Col span={12}>
          <Card title="Restaurant Names and Addresses">
            <ul>
              {restaurantData.map((restaurant) => (
                <li key={restaurant.id}>
                  <strong>{restaurant.restaurantName}</strong>:{" "}
                  {restaurant.address}
                </li>
              ))}
            </ul>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="User Names and Phone Numbers">
            <ul>
              {userData.map((user) => (
                <li key={user.id}>
                  <strong>{user.name}</strong>: {user.phone}
                </li>
              ))}
            </ul>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Homepage;
