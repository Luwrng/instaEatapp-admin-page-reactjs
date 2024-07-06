import React, { useEffect, useState } from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Pagination, Button, message, Modal } from "antd";
import "./User.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apiClient from "../../api/axios";

const { Meta } = Card;
const { confirm } = Modal;

const User = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  // const [isAdmin, setIsAdmin] = useState(false); // State to track admin status
  const pageSize = 18;
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    // checkUserRole(); // Check user role on component mount
  }, []);

  // const checkUserRole = () => {
  //   const roleId = localStorage.getItem("roleId");
  //   setIsAdmin(roleId === "1"); // Assuming roleId 1 is for admin
  // };

  const fetchUsers = async () => {
    try {
      const response = await apiClient.get("/Account", {
        params: {
          page: currentPage,
          pageSize: 9999,
        },
      });
      console.log(response.data);
      setUsers(response.data.items);
      setTotalItemsCount(response.data.totalItemsCount);
    } catch (error) {
      console.error("Error fetching users:", error);
      message.error("Failed to fetch users");
    }
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleEditClick = (id) => {
    console.log("Edit icon clicked for user:", id);
    navigate(`/edit-user/${id}`);
  };

  const handleAddUser = () => {
    console.log("Add user clicked");
    navigate("/add-user");
  };

  const handleDeleteUser = (userId) => {
    // if (!isAdmin) {
    //   message.error("Only admins can delete users.");
    //   return;
    // }

    confirm({
      title: "Are you sure you want to delete this user?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => deleteUser(userId),
      onCancel: () => console.log("Cancel delete"),
    });
  };

  const deleteUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `https://instaeat.azurewebsites.net/api/Account/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Delete user response:", response.data);
      message.success("User deleted successfully");
      fetchUsers(); // Refresh the user list after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
      message.error("Failed to delete user");
    }
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const currentUsers = users.slice(startIndex, endIndex);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginBottom: "10px" }}
        onClick={handleAddUser}
      >
        Add User
      </Button>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {currentUsers.map((user) => (
          <Card
            key={user.userId}
            style={{
              width: 240,
              margin: 8,
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
            actions={[
              user?.roleId !== 1 && (
                <DeleteOutlined
                  key="delete"
                  style={{ color: "red" }}
                  onClick={() => handleDeleteUser(user.userId)}
                />
              ),
              <EditOutlined
                key="edit"
                onClick={() => handleEditClick(user.userId)}
              />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src={user.avatar} />}
              title={user.name}
              description={
                <>
                  <div>{user.username}</div>
                  <div>{user.phone}</div>
                </>
              }
            />
          </Card>
        ))}
      </div>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={totalItemsCount}
        onChange={handleChangePage}
        style={{ marginTop: "20px" }}
      />
    </div>
  );
};

export default User;
