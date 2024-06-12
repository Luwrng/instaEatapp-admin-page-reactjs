import React from "react";
import { useParams } from "react-router-dom";
import { Card, Row, Col } from "antd";

// Mock foodApi data
const foodApi = {
  1: [
    {
      id: 1,
      name: "Phở gà",
      description: "Phở gà với thịt gà tươi ngon và nước dùng đậm đà",
      image: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
    },
    {
      id: 2,
      name: "Bún riêu",
      description: "Bún riêu với cua vàng và bún tươi",
      image: "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
    },
  ],
  2: [
    {
      id: 1,
      name: "Phở gà",
      description: "Phở gà với thịt gà tươi ngon và nước dùng đậm đà",
      image: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
    },
    {
      id: 3,
      name: "Bánh mì chảo",
      description: "Bánh mì chảo nóng hổi với trứng và thịt",
      image: "https://api.dicebear.com/7.x/miniavs/svg?seed=3",
    },
    {
      id: 4,
      name: "Cơm gà",
      description: "Cơm gà hấp dẫn với thịt gà và cơm trắng",
      image: "https://api.dicebear.com/7.x/miniavs/svg?seed=4",
    },
  ],

  3: [
    {
      id: 5,
      name: "Bánh mì chảo",
      description: "Bánh mì chảo nóng hổi với trứng và thịt",
      image: "https://api.dicebear.com/7.x/miniavs/svg?seed=3",
    },
    {
      id: 6,
      name: "Cơm gà",
      description: "Cơm gà hấp dẫn với thịt gà và cơm trắng",
      image: "https://api.dicebear.com/7.x/miniavs/svg?seed=4",
    },
  ],

  4: [
    {
      id: 7,
      name: "Bánh mì chảo",
      description: "Bánh mì chảo nóng hổi với trứng và thịt",
      image: "https://api.dicebear.com/7.x/miniavs/svg?seed=3",
    },
    {
      id: 8,
      name: "Cơm gà",
      description: "Cơm gà hấp dẫn với thịt gà và cơm trắng",
      image: "https://api.dicebear.com/7.x/miniavs/svg?seed=4",
    },
  ],
};

const { Meta } = Card;

const ListFood = () => {
  const { list_food } = useParams();

  // Lấy danh sách món ăn từ foodApi dựa trên id từ tham số URL
  const selectedFoodList = foodApi[list_food];

  // Kiểm tra nếu không có món ăn tương ứng
  if (!selectedFoodList) {
    return <div>Không có món ăn</div>;
  }

  return (
    <div>
      <h1>Danh sách món ăn</h1>
      <Row gutter={16}>
        {selectedFoodList.map((food) => (
          <Col span={6} key={food.id}>
            <Card hoverable cover={<img alt={food.name} src={food.image} />}>
              <Meta title={food.name} description={food.description} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ListFood;
