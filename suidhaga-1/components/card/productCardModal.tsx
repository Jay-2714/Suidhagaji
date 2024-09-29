import React, { useState } from "react";
import Image from "next/image";
import { LikeOutlined, CommentOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import CommentCard from "./commentCard";
import { Typography } from "antd";
import { useMutation } from "@apollo/client";
import { DELETE_POST_BY_ID } from "@/graphql/mutations/deletePost.mutation";
import { Button } from "@mui/material";

interface ChildProp {
  image: string;
  title: String;
  details: String;
  color: String;
  size: String;
  quantity: String;
  price: String;
  postId: string;
}

const ProductCardModal: React.FC<ChildProp> = ({
  image,
  title,
  details,
  color,
  size,
  quantity,
  price,
  postId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [rows, setRows] = useState(2);
  const [expanded, setExpanded] = useState(false);
  const[deletePost] = useMutation(DELETE_POST_BY_ID);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (postId: string) => {
    try {
      console.log("deleting Post");

      await deletePost({
        variables: {
          postId: postId,
        },
     
      });
      
      setIsModalOpen(false);
      
      toast.success("Post deleted successfully");
    } catch (error) {
      toast.error("Failed to delete Post");
      console.error("Error deleting Post:", error);
    }
  };

  return (
    <div className="bg-white body-font shadow-gray-300 shadow-xl rounded-sm overflow-hidden m-2 lg:h-[calc(100vh-48vh)] h-full z-[80px]">
      <div className="flex flex-col md:flex-row">
        <div className=" md:w-[40%] lg:w-[80%] ">
          {image && (
            <Image
              alt="ecommerce"
              className="w-full object-cover object-center rounded-xl md:rounded-l-xl md:rounded-t-none h-[100%]"
              src={image}
              width={100}
              height={100}
            />
          )}
        </div>
        <div className="md:w-3/5 md:rounded-r-xl p-4 md:p-6 grow">
          <h2 className="text-sm font-sans text-black font-bold tracking-widest text-xl mb-2">
            {title}
          </h2>
          <div className="mb-4">
            {/* <p className='text-gray-600 mb-2'>{details}</p> */}
            <div className="max-h-[100px] text-clip">
              <Typography.Paragraph
                ellipsis={{
                  rows,
                  expandable: "collapsible",
                  expanded,
                  onExpand: (_, info) => setExpanded(info.expanded),
                }}
              >
                {details}
              </Typography.Paragraph>
            </div>
            <div className="flex border-t border-gray-600 py-2">
              <span className="text-black">Color: </span>
              <span className="ml-auto text-black">{color}</span>
            </div>
            <div className="flex border-t border-gray-600 py-2">
              <span className="text-black">Size: </span>
              <span className="ml-auto text-black">{size}</span>
            </div>
            <div className="flex border-t border-b mb-6 border-gray-600 py-2">
              <span className="text-black">Quantity: </span>
              <span className="ml-auto text-black">{quantity}</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <span className="title-font font-medium text-2xl text-black mb-2 md:mb-0 md:mr-4">
              ₹{price}
            </span>
            <div className="flex items-center md:ml-auto">
              <span onClick={() => toast.success(`Post Liked`)}>
                <LikeOutlined className="text-3xl px-2 hover:text-[#A72447] cursor-pointer" />
              </span>
              <CommentOutlined
                onClick={() => setIsOpen(true)}
                className="text-3xl px-2 hover:text-[#A72447] cursor-pointer"
              />


            </div>
          </div>
          <button className='ml-2 w-full bg-[#C84869] border-2 py-2 px-6 focus:outline-none hover:bg-[#A72447] rounded text-white font-semibold' onClick={() => handleDelete(postId)}>
                Delete Post
              </button>
        </div>
      </div>
      <div>
        <CommentCard
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          imageSrc={image}
          title={`${title}`}
          postId={postId}
        />
      </div>
    </div>
  );
};
export default ProductCardModal;
