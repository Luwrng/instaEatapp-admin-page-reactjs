import React, { useState, useEffect } from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Pagination } from "antd";
import "./User.css";
import { useNavigate } from "react-router-dom";
import userapi from "./userapi";
const { Meta } = Card;


//page size
const User = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 18; 
  const navigate = useNavigate();

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };
  //click to link edit information user
  const handleEditClick = (id) => {
    console.log("Edit icon clicked for user:", id);
    navigate(`/edit/${id}`);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentUsers = userapi.slice(startIndex, endIndex);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {currentUsers.map((user) => (
          <Card
            key={user.id}
            style={{
              width: 240,
              margin: 8,
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined
                key="edit"
                onClick={() => handleEditClick(user.id)}
              />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src={user.avatar} />}
              title={user.name}
              description={ <>
                <div>{user.description}</div>
                <div>{user.phone_number}</div>
              </>}
              
            />
          </Card>
        ))}
      </div>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={userapi.length}
        onChange={handleChangePage}
        style={{ marginTop: "20px" }}
      />
    </div>
  );
};

export default User;
