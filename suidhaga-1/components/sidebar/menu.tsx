"use client";
import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  VpnKeyOutlined,
  PeopleOutlineOutlined,
  ChecklistOutlined,
  WorkOutlineOutlined,
  PostAddOutlined,
  NotificationsActiveOutlined,
  AddShoppingCartOutlined,
  PointOfSaleOutlined,
  AdminPanelSettingsOutlined,
  BugReportOutlined,
} from "@mui/icons-material";
import Link from "next/link";
import { GET_AUTHENTICATED_USER } from "@/graphql/queries/users.queries";
import { usePathname, useRouter } from 'next/navigation';
import { useQuery } from "@apollo/client";
import Sider from "antd/es/layout/Sider";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export const NavigationLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const { data, loading, error } = useQuery(GET_AUTHENTICATED_USER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {data?.authUser.userType === "Admin" && (
        <Link className="nav-link" aria-current="page" href={href}>
          {children}
        </Link>
      )}
    </>
  );
};

export const MenuList = () => {
  const router = useRouter();
  const path = usePathname();
  const [selectedKey, setSelectedKey] = useState('');

  useEffect(() => {
    console.log("path",path);
    
    setSelectedKey(path);
  }, [path]);
  
  const labels = [
      "Home",
      "Authentication",
      "Bulk Add",
      "Attendance",
      "Users",
      "Roles",
      "Jobs",
      "Post",
      "Orders",
      "Notifications",
      "Payments",
      "Settings",
      "Bugs",
      "Profile",
  ];
  const paths = [
    "/admin",
    "/admin/authentication",
    "/admin/bulkAdd",
    "/admin/attendance",
    "/admin/users",
    "/admin/roles",
    "/admin/jobs",
    "/admin/posts",
    "/admin/orders",
    "/admin/notifications",
    "/admin/payments",
    "/admin/settings",
    "/admin/bugs",
    "/admin/profile",
  ];

  const icons = [
    HomeOutlined,
    VpnKeyOutlined,
    PeopleOutlineOutlined,
    ChecklistOutlined,
    WorkOutlineOutlined,
    PostAddOutlined,
    NotificationsActiveOutlined,
    AddShoppingCartOutlined,
    PointOfSaleOutlined,
    AdminPanelSettingsOutlined,
    BugReportOutlined,
  ].map((icon, index) => ({
    key: paths[index],
    icon: React.createElement(icon),
    label: labels[index],
  }));

  const handleMenuClick = (e: any) => {
    const clickedItem = icons.find(item => item.key === e.key);
    if (clickedItem) {
      router.push(clickedItem.key);
    }
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["0"]}
      selectedKeys={[selectedKey]}
      items={icons.map((item, index) => ({
        ...item,
        key: paths[index],  // Use path as key
      }))}
      onClick={handleMenuClick}
      className="flex flex-col h-screen text-[0.9rem] pt-[10%] bg-[#00154F]"
    />
  );
};
