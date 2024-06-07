import React, { useState } from "react";
import { Card, Col, Row, Pagination } from "antd";

const { Meta } = Card;

const cardData = [
  {
    title: "Europe Street beat",
    description: "www.instagram.com",
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    title: "Europe Street beat",
    description: "www.instagram.com",
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    title: "Europe Street beat",
    description: "www.instagram.com",
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    title: "Europe Street beat",
    description: "www.instagram.com",
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    title: "Europe Street beat",
    description: "www.instagram.com",
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    title: "Europe Street beat",
    description: "www.instagram.com",
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    title: "Europe Street beat",
    description: "www.instagram.com",
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    title: "Europe Street beat",
    description: "www.instagram.com",
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    title: "Europe Street beat",
    description: "www.instagram.com",
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    title: "Europe Street beat",
    description: "www.instagram.com",
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    title: "Europe Street beat",
    description: "www.instagram.com",
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    title: "Europe Street beat",
    description: "www.instagram.com",
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    title: "Europe Street beat",
    description: "www.instagram.com",
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    title: "Europe Street beat",
    description: "www.instagram.com",
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    title: "Europe Street beat",
    description: "www.instagram.com",
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    title: "Europe Street beat",
    description: "www.instagram.com",
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    title: "Europe Street beat",
    description: "www.instagram.com",
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    title: "Europe Street beat",
    description: "www.instagram.com",
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    title: "Europe Street beat",
    description: "www.instagram.com",
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    title: "Europe Street beat",
    description: "www.instagram.com",
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    title: "Europe Street beat",
    description: "www.instagram.com",
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    title: "Europe Street beat",
    description: "www.instagram.com",
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    title: "Europe Street beat",
    description: "www.instagram.com",
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    title: "Europe Street beat",
    description: "www.instagram.com",
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },

  // Thêm nhiều thẻ hơn nếu cần
];

const Stores = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8; // Số lượng thẻ trên mỗi trang

  const handleChangePage = (page) => {
    setCurrentPage(page);
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
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={cardData.length}
        onChange={handleChangePage}
        style={{ textAlign: "center", marginTop: 16, marginRight: 16}}
      />
    </div>
  );
};

export default Stores;
