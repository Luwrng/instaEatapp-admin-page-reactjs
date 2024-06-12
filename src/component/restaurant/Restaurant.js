import React, { useState } from "react";
import { Card, Col, Row, Pagination, Button } from "antd";
import axios from "axios";
import "./Restaurant.css";
const { Meta } = Card;

const cardData = [  
  {
    title: "Cơm tấm 9",
    description: "27 đường a thị xã b thị trấn c tỉnh tây ninh việt nam",
    image:
      "https://tse3.mm.bing.net/th?id=OIP.cSRhUlbSC6Va3POAyu_iJAAAAA&pid=Api&P=0&h=180",
    list_food:
      "https://blog.photoadking.com/wp-content/uploads/2020/09/Restaurant-Menu-Templates.jpg",
  },
  {
    title: "Europe Street beat",
    description: "www.instagram.com",
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    list_food: "https://www.example.com", // Link ví dụ khác
  },
  // Thêm nhiều dữ liệu thẻ hơn nếu cần...
];

const Restaurant = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8; // Số lượng thẻ trên mỗi trang

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleViewFood = async (list_food) => {
    try {
      // Giả lập một cuộc gọi API
      const response = await axios.get(list_food);
      console.log(response.data); // Xử lý dữ liệu trả về từ API nếu cần
      // Bạn cũng có thể chuyển hướng đến link hoặc hiển thị dữ liệu trong một modal
      window.open(list_food, "_blank");
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu", error);
      window.open(list_food, "_blank");
    }
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentCards = cardData.slice(startIndex, endIndex);

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
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src={card.image} />}
            >
              <Meta title={card.title} description={card.description} />

              {card.list_food && (
                <Button
                  type="primary"
                  onClick={() => handleViewFood(card.list_food)}
                >
                  View All Food
                </Button>
              )}
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={cardData.length}
        onChange={handleChangePage}
        style={{ textAlign: "center", marginTop: 16, marginRight: 16 }}
      />
    </div>
  );
};

export default Restaurant;
