import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

import Meta from "antd/es/card/Meta";
import { GET_JOBS_BY_ID } from "@/graphql/queries/jobs.queries";
import { GET_POSTS_BY_ID } from "@/graphql/queries/post.queries";
import AddJobCard from "@/app/(client)/jobs/[jobId]/page";
import AddPostCard from "./postForm";
import AddPostModalCard from "@/app/(client)/posts/[postId]/page";
import NewImage from "@/public/image/photo-1584184924103-e310d9dc82fc.avif";
import {
  GET_AUTHENTICATED_USER,
  GET_USERS,
} from "@/graphql/queries/users.queries";
import { ORDER_BY_USER_ID } from "@/graphql/queries/order.queries";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { Card } from "antd";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

interface ChildProp {
  imageSrc: string; // Assuming imageSrc is a string URL
  name: string;
  email: string;
  phone: string;
}

const Profile: React.FC<ChildProp> = ({ imageSrc, name, email, phone }) => {
  const { accountId } = useParams<{ accountId: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [myJobOpen, setMyJobOpen] = useState(true);
  const [myPostsOpen, setMyPostsOpen] = useState(false);
  const [myOrders, setMyOrders] = useState(false);
  const [applications, setApplications] = useState([]);

  const {
    data: jobsData,
    loading: jobsLoading,
    error: jobsError,
  } = useQuery(GET_JOBS_BY_ID, {
    variables: {
      id: accountId,
    },
  });

  const {
    data: postData,
    loading: postLoading,
    error: postError,
  } = useQuery(GET_POSTS_BY_ID, {
    variables: {
      id: accountId,
    },
  });

  const [userId, setUserId] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);

  const {
    data: orderData,
    loading: orderLoading,
    error: orderError,
  } = useQuery(ORDER_BY_USER_ID, {
    variables: {
      input: {
        operation: "Applied Order",
        appliedUserId: accountId,
        userRole: "Admin",
      },
    },
  });

  const { data, loading, error } = useQuery(GET_AUTHENTICATED_USER);

  const handleCardClick = (jobId: string) => {
    setSelectedJobId(jobId);
    setIsModalOpen(true);
  };

  const handlePostCardClick = (postId: string) => {
    setSelectedPostId(postId);
    setIsPostModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJobId(null);
  };

  const handlePostCloseModal = () => {
    setIsPostModalOpen(false);
    setSelectedPostId(null);
  };

  const handleJobClick = () => {
    setMyJobOpen(true);
    setMyPostsOpen(false);
    setMyOrders(false);
    console.log(jobsData);
  };

  const handlePostClick = () => {
    setMyPostsOpen(true);
    setMyJobOpen(false);
    setMyOrders(false);
  };

  const handleOrderClick = () => {
    setMyOrders(true);
    setMyJobOpen(false);
    setMyPostsOpen(false);
    console.log(orderData + accountId);
  };
  useEffect(() => {
    if (orderError) {
      console.error("Order query error:", orderError.message);
    }
    if (orderData) {
      console.log("Order data:", orderData);
    }
  }, [orderData, orderError]);

  return (
    <>
      <div className="bg-white body-font rounded-xl overflow-hidden mb-2">
        <div className="flex flex-col justify-start">
          <div className="w-full flex justify-center mt-3">
            <Image
              alt="profile"
              className="object-cover object-center rounded-full h-[100%] w-[25%]"
              src={imageSrc}
              width={100}
              height={100}
            />
          </div>
          <div className="w-full flex justify-center">
            <div className="mb-4 md:w-3/5 md:rounded-r-xl p-4 md:p-6">
              <div className="flex py-2">
                <span className="text-black">Name: </span>
                <span className="ml-auto text-black">{name}</span>
              </div>
              <div className="flex border-t border-gray-600 py-2">
                <span className="text-black">Email: </span>
                <span className="ml-auto text-black">{email}</span>
              </div>
              <div className="flex border-t border-gray-600 py-2">
                <span className="text-black">Phone: </span>
                <span className="ml-auto text-black">{phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white body-font rounded-xl overflow-hidden mb-2">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 p-2 ">
          <div
            className={`cursor-pointer border-2 rounded-full flex justify-center p-2 ${
              myOrders ? "bg-blue-500 text-white" : ""
            }`}
            onClick={handleOrderClick}
          >
            MY ORDERS
          </div>
          <div
            className={`cursor-pointer border-2 rounded-full flex justify-center p-2 ${
              myJobOpen ? "bg-blue-500 text-white" : ""
            }`}
            onClick={handleJobClick}
          >
            MY JOBS
          </div>
          <div
            className={`cursor-pointer border-2 rounded-full flex justify-center p-2 ${
              myPostsOpen ? "bg-blue-500 text-white" : ""
            }`}
            onClick={handlePostClick}
          >
            MY POSTS
          </div>
        </div>
      </div>

      <div className="bg-white body-font shadow-xl rounded-xl overflow-hidden ">
        <div className="py-3 pl-3 border-b-2 ">
          {myJobOpen
            ? "MY JOBS"
            : myPostsOpen
            ? "MY POSTS"
            : myOrders
            ? "MY ORDERS"
            : "MY JOBS"}
        </div>
        {myJobOpen && (
          <div className="grid lg:grid-cols-4 gap-1 md:grid-cols-3 grid-cols-3 bg-gray-200">
            {jobsData &&
            jobsData.jobByUserID &&
            jobsData.jobByUserID.length > 0 ? (
              jobsData.jobByUserID.map((job: any) => (
                <Card
                  key={job._id}
                  onClick={() => handleCardClick(job._id)}
                  hoverable
                  className="relative overflow-hidden rounded-lg shadow-md"
                  cover={
                    <Image
                      alt="loading..."
                      src={job.image}
                      height={30}
                      width={100}
                      className="h-[40%] w-full"
                    />
                  }
                >
                  <Meta className="absolute bottom-3"  title={job.title} />
                </Card>
              ))
            ) : (
              <div className="text-center text-gray-500">No jobs found.</div>
            )}
          </div>
        )}

        {myPostsOpen && (
          <div className="grid lg:grid-cols-4 gap-1 md:grid-cols-3 grid-cols-3 bg-gray-200">
            {postData &&
            postData.getPostsById &&
            postData.getPostsById.length > 0 ? (
              postData.getPostsById.map((post: any) => (
                <Card
                  key={post._id}
                  onClick={() => handlePostCardClick(post._id)}
                  hoverable
                  className="relative overflow-hidden rounded-lg shadow-md"

                  cover={
                    <Image
                      alt="loading..."
                      src={post.image}
                      width={100}
                      height={30}
                      className="h-[40%] w-full"
                    />
                  }
                >
                  <Meta className="absolute bottom-3" title={post.title} />
                </Card>
              ))
            ) : (
              <div className="text-center text-gray-500">No posts found.</div>
            )}
          </div>
        )}
        {myOrders && (
          <div className="flex flex-col">
            {orderData &&
            orderData.orderByUserId &&
            orderData.orderByUserId.length > 0 ? (
              orderData.orderByUserId.map((order: any) => (
                <Card
                  key={order._id}
                  >
              
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {order.jobName}
                      </Typography>
                      <Typography color="text.secondary">
                        {"Created By: " + order.customerName}
                      </Typography>
                      <Typography color="text.secondary">
                        {"Applied By: " + order.appliedUsername}
                      </Typography>
                    </CardContent>
                  
            
                </Card>
              ))
            ) : (
              <div className="text-center text-gray-500">No orders found.</div>
            )}
          </div>
        )}
      </div>

      {isModalOpen && selectedJobId && (
        <AddJobCard
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          jobId={selectedJobId}
        />
      )}

      {isPostModalOpen && selectedPostId && (
        <AddPostModalCard
          isOpen={isPostModalOpen}
          onClose={handlePostCloseModal}
          postId={selectedPostId}
        />
      )}
    </>
  );
};

export default Profile;
