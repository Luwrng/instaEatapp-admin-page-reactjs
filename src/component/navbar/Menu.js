import React, { useState } from "react";
import {
  HomeOutlined,
  UserOutlined,
  ShopOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import "./Menu.css";

const MenuComponent = () => {
  const navigate = useNavigate();

  const items = [
    {
      key: "0",
      icon: <HomeOutlined />,
      label: "Home",
      link: "/home",
    },
    {
      key: "1",
      icon: <UserOutlined />,
      label: "User",
      link: "/user",
    },
    {
      key: "2",
      icon: <ShopOutlined />,
      label: "Restaurant",
      link: "/restaurant",
    },
    {
      key: "3",
      icon: <LogoutOutlined />,
      label: "Logout",
      link: "/logout",
    },
  ];

  const handleClick = (e) => {
    const clickedItem = items.find((item) => item.key === e.key);
    if (clickedItem) {
      if (clickedItem.label === "Logout") {
        handleLogout();
      } else {
        navigate(clickedItem.link);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Xóa thông tin người dùng từ localStorage
    localStorage.removeItem("token");
    // navigate("/"); // Điều hướng về trang đăng nhập
    window.location.href = "/";
  };

  const getLevelKeys = (items1) => {
    const key = {};
    const func = (items2, level = 1) => {
      items2.forEach((item) => {
        if (item.key) {
          key[item.key] = level;
        }
        if (item.children) {
          func(item.children, level + 1);
        }
      });
    };
    func(items1);
    return key;
  };

  const levelKeys = getLevelKeys(items);

  const [stateOpenKeys, setStateOpenKeys] = useState(["2", "23"]);
  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["231"]}
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      style={{
        width: 256,
      }}
      items={items}
      onClick={handleClick}
    />
  );
};

export default MenuComponent;
