import React, { useState } from "react";
import {
  // ShoppingOutlined,
  // PieChartOutlined,
  // UserOutlined,
  // TagsOutlined,
  // AppstoreOutlined,
  // SkinOutlined,
  // LoginOutlined,
  HomeOutlined,
  UserOutlined,
  ShopOutlined,
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
      link: "/",
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

    // {
    //   key: "0",
    //   icon: <PieChartOutlined />,
    //   label: "Home",
    //   link: "/",
    // },

    // {
    //   key: "1",
    //   icon: <PieChartOutlined />,
    //   label: "Dashboard",
    //   link: "/dashboard",
    // },

    // {
    //   key: "2",
    //   icon: <ShoppingOutlined />,
    //   label: "Orders",
    //   link: "/orders",
    // },
    // {
    //   key: "3",
    //   icon: <UserOutlined />,
    //   label: "Customers",
    //   link: "/customers",
    // },
    // {
    //   key: "4",
    //   icon: <TagsOutlined />,
    //   label: "Product",
    //   link: "/product",
    // },
    // {
    //   key: "5",
    //   icon: <TagsOutlined />,
    //   label: "Categories",
    //   link: "/categories",
    // },
    // {
    //   key: "6",
    //   icon: <AppstoreOutlined />,
    //   label: "Stores",
    //   link: "/stores",
    // },
    // {
    //   key: "7",
    //   icon: <SkinOutlined />,
    //   label: "Couriers",
    //   link: "/couriers",
    // },
    // {
    //   key: "8",
    //   icon: <LoginOutlined />,
    //   label: "LogOut",
    //   link: "/logout",
    // },
  ];

  const handleClick = (e) => {
    const clickedItem = items.find((item) => item.key === e.key);
    if (clickedItem) {
      navigate(clickedItem.link);
    }
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
