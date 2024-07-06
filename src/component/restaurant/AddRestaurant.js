import React, { useState } from "react";
import { Form, Input, Button, TimePicker, message } from "antd";
import axios from "axios";

const { RangePicker } = TimePicker;

const AddRestaurant = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const userId = getUserId(); // Lấy userId từ localStorage hoặc bất kỳ nguồn nào khác
      const response = await axios.post(
        "https://instaeat.azurewebsites.net/api/Account/register/restaurant",
        {
          userId: userId,
          restaurant: {
            restaurantName: values.restaurantName,
            address: values.address,
            openTime: values.openCloseTime[0].format("HH:mm"),
            closeTime: values.openCloseTime[1].format("HH:mm"),
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      message.success("Restaurant added successfully");
      console.log("Response:", response.data); // Log response từ API
      // Hiển thị thông tin nhà hàng được thêm vào
      message.info(
        `Added restaurant: ${response.data.restaurant.restaurantName}`
      );
      console.log("Added restaurant details:", response.data.restaurant);
    } catch (error) {
      setLoading(false);
      console.error("Error adding restaurant:", error);
      message.error("Failed to add restaurant");
    }
  };

  const getUserId = () => {
    // Lấy userId từ localStorage hoặc từ cơ chế xác thực khác
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user.userId : null;
  };

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{ openCloseTime: [null, null] }}
    >
      <Form.Item
        name="restaurantName"
        label="Restaurant Name"
        rules={[{ required: true, message: "Please enter restaurant name" }]}
      >
        <Input placeholder="Enter restaurant name" />
      </Form.Item>

      <Form.Item
        name="address"
        label="Address"
        rules={[{ required: true, message: "Please enter address" }]}
      >
        <Input.TextArea rows={4} placeholder="Enter address" />
      </Form.Item>

      <Form.Item
        name="openCloseTime"
        label="Open - Close Time"
        rules={[
          {
            type: "array",
            required: true,
            message: "Please select open and close time",
          },
        ]}
      >
        <RangePicker format="HH:mm" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Add Restaurant
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddRestaurant;
