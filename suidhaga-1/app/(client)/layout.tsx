"use client";
import React, { useEffect, useState } from "react";
import logo from "@/public/image/main-logo.jpg";
import Image from "next/image";
import Header from "@/components/Header/header";
import { LoadingProvider } from "@/context/loading";
// import TopNavbar from "@/components/navbar/topnavbar";
import LeftNavBar from "@/components/navbar/leftNavBar";
import { GET_AUTHENTICATED_USER } from "@/graphql/queries/users.queries";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import ChatUser from "@/components/ChatUser/dm";
import AddJobCard from "@/components/card/jobForm";
import AddPostCard from "@/components/card/postForm";
import Sider from "antd/es/layout/Sider";
import { Button, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import { AppBar, Toolbar, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { FileAddFilled, AppstoreFilled, ShoppingFilled, MailFilled } from "@ant-design/icons";
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import TopNavbar from "@/components/navbar/topnavbar";
import socket from "@/lib/socketservice";
import toast from "react-hot-toast";
// import { setJobVisibility, setPostVisibility } from "@/components/navbar/leftNavBar";

type Notification = {
  name: string;
  message: string;
};


export default function HomeLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const [jobApplicationVisibility, SetJobApplicationVisibility] =
    useState<boolean>(false);
  const [postApplicationVisibility, SetPostApplicationVisibility] =
    useState<boolean>(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [value, setValue] = useState(0);
  const [id, setId] = useState();
  const { data, loading, error } = useQuery(GET_AUTHENTICATED_USER);
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  console.log(data);
  const handleChange = (_event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (data?.authUser) {
      setId(data?.authUser._id);
    }
  }, [data?.authUser]);
  const toggleNavbar = () => {
    setIsNavbarVisible(!isNavbarVisible);
  };

  useEffect(() => {
    // Check for notification permission
    // console.log(Notification.permission);
    
    if (Notification.permission === 'default') {
        Notification.requestPermission();
        console.log('default permission');
    }

    socket.on('notification', (data: Notification) => {
        setNotifications((prevNotifications) => [...prevNotifications, data]);
        // console.log(notifications);
        
        // Show browser notification
        if (Notification.permission == 'granted') {
          // console.log('granted notification'); 
          
          if (data) {
            console.log("Data : ",data);
            const notify = new Notification(`Notification from  ${data?.name}`, {
              body: data?.message,
          });
          notify.onshow=()=>{
            // console.log('shwo');
          }
          notify.onclick=()=>{
            console.log('click');
          }
          // console.log(notify)
          }  
        }
    });

    return () => {
        socket.off('notification');
    };
}, [data]);

  


  return (
    <>
      <LoadingProvider>
        
        <section className={"flex flex-col mt-[3.2%] bg-[#D9D9D9] relative"}>
        <AppBar className="z-10 w-full  xl:hidden md:visible lg:hidden sm:visible bottom-0 bg-white top-auto right-0 left-0" position="fixed" color="primary" >
                    <Toolbar className="w-screen justify-evenly">
                      <BottomNavigation className="w-screen justify-evenly " value={value} onChange={handleChange} showLabels>
                        <BottomNavigationAction label="" icon={<FileAddFilled onClick={() => SetJobApplicationVisibility(true)} />} />
                        <BottomNavigationAction label="" icon={<AppstoreFilled onClick={() => SetPostApplicationVisibility(true)}/>} />
                        <BottomNavigationAction label="" icon={<ShoppingFilled />} />
                        <BottomNavigationAction label="" icon={<MailFilled />} />
                        <BottomNavigationAction label="" icon={<GroupsIcon />} />
                      </BottomNavigation>
                    </Toolbar>
                  </AppBar>
          <div className="">
            {" "}
            <Header userType={data?.authUser?.userType} />{" "}
          </div>

          <div className="overflow-hidden">
            <div id="header" className="justify-center shadow-md shadow-gray-400 lg:mt-0 md:mt-4 mt-8">
              <div className="bg-white h-[90%] w-screen flex justify-center p-[0.4%] z-50">
                <Image className="w-[20%] lg:pt-4 pb-2 sm:pt-2" src={logo} alt="" />
              </div>
            </div>
            <div className="mt-2">
              <div className="flex flex-row justify-between gap-2 w-[100%]">
                {/*left*/}
                <div className="bg-red-600 p-[1%] shadow-xl lg:w-[20%] md:w-0 sm:w-0 xs:w-0 lg:block md:hidden sm:hidden xs:hidden hidden"
                  style={{
                    background: "white",
                    height: "calc(100vh - 50px)",
                    position: "sticky",
                    top: "41px",
                  }}
                >
                  <div className=" mt-auto h-full">
                    <LeftNavBar
                      setJobVisibility={SetJobApplicationVisibility}
                      setPostVisibility={SetPostApplicationVisibility}
                      onUserClick={function (userId: string): void {
                        throw new Error("Function not implemented.");
                      }}
                    />
                  </div>
                </div>

                <div className="h-full lg:w-[60%] sm:w-screen md:w-screen xs:w-screen px-1  ">
                  <div className="flex flex-col justify-start">
                    <div className="z-50 sticky top-12 h-6 mb-2">
                      <div
                        className="sticky top-12 bg-white z-50 h-full rounded-lg"
                      >
                        <TopNavbar />
                      </div>
                    </div>
                    <div className="max-h-screen overflow-y-auto no-scrollbar xl:py-1 py-7 rounded-lg" style={{height: "calc(100vh - 100px)"}}>
                      <span className="" >{children}</span>
                    </div>
                    <AddJobCard
                      isOpen={jobApplicationVisibility}
                      onClose={() => SetJobApplicationVisibility(false)}
                    />
                    <AddPostCard
                      isOpen={postApplicationVisibility}
                      onClose={() => SetPostApplicationVisibility(false)}
                    />
                  </div>
                </div>
                {/* <div className="flex bottom-0  w-screen fixed justify-center lg:hidden bg-blue-500 rounded-md py-2 shadow-2xl shadow-blue-500  h-8">
                  {/* <Button
                    className="border-solid border-blue-500 border-2 rounded-full w-[100%] bottom-8 p-4  z-10 "
                    onClick={toggleNavbar}
                    icon={<PlusOutlined className="text-blue-500" />}
                  ></Button> 
                </div>
             */}

              
         

                <div
                  className="text-gray-800 right-0 p-[1%] shadow-xl lg:w-[20%] md:w-0 sm:w-0 xs:w-0 lg:block md:hidden sm:hidden hidden"
                  style={{
                    background: "white",
                    height: "calc(100vh - 50px)",
                    position: "sticky",
                    top: "41px",
                  }}
                >
                  <ChatUser notifications={notifications}/>
                </div>
              </div>
            </div>
          </div>
        </section>
      </LoadingProvider>
    </>
  );
}
