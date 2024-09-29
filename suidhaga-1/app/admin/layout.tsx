"use client";
import React, { useEffect, useState } from "react";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import Image from "next/image";
import { Layout, Button, Menu } from "antd";
const { Header, Sider } = Layout;
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { LOGOUT } from "@/graphql/mutations/users.mutations";
import toast from "react-hot-toast";
import { MenuList } from "@/components/sidebar/menu";
import HeaderH from "@/components/Header/header";
import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "@/graphql/queries/users.queries";


export default function AdminHome({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [logout] = useMutation(LOGOUT);
  const { data, loading, error } = useQuery(GET_AUTHENTICATED_USER);
  const userType = data?.authUser.usertype;
  console.log(userType);

  async function signOut() {
    try {
      await logout().then(() => {
        toast.success(`user logged out`);
      });
    } catch (error) {
      console.log(error);
      toast.error(`could not logout`);
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 720) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      <div className="flex flex-col">
        <HeaderH userType={userType} />
        <Layout className="lg:mt-[2.6%] md:mt-[4.4%] sm:mt-[5.8%] mt-[9%] h-screen w-full overflow-hidden fixed">
          {/* <Sider collapsed={collapsed} trigger={null} className="text-[#fff] ">
                  
                    <MenuList />
               </Sider> */}
          <Sider
            className=" overflow-auto h-screen fixed left-0 bottom-0 top-[0px]"
            breakpoint="sm"
            trigger={null}
            collapsed={collapsed}
            collapsedWidth="55"
            onCollapse={(collapse, type) => {
              console.log(collapse, type);
            }}
          >
            <MenuList
            />
          </Sider>
          <Layout>
            <Header className="bg-white p-5 flex items-center justify-between">
              <Button
                type="text"
                className="text-black"
                onClick={() => setCollapsed(!collapsed)}
                icon={<MenuUnfoldOutlined />}
              />
              <div className=" flex flex-row justify-center">
                <Link className="p-1" href="https://www.idf.org.in" passHref>
                  {/* <Image className='w-10 h-12 ' src={logo} alt='idf-logo.png' /> */}
                </Link>
                <div className=" justify-normal ">AkshayShakti</div>
              </div>
              <div className="flex flex-row gap-5 mr-[3%] text-base font-semibold">
                <div className="cursor-pointer" onClick={signOut}>
                  Logout
                </div>
              </div>
            </Header>
            <div className="bg-white m-[1%]">{children}</div>
          </Layout>
        </Layout>
      </div>
    </>
  );
}
