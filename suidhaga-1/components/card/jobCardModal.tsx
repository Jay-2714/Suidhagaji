import React, { useEffect, useState } from "react";
import Image from "next/image";
import { LikeOutlined, CommentOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useRouter } from "next/navigation";
import AddJobCard from "@/app/(client)/jobs/[jobId]/page";
import { useMutation } from "@apollo/client";
import { DELETE_JOB } from "@/graphql/mutations/deleteJob.mutations";
import { GET_JOB_BY_ID } from "@/graphql/queries/jobs.queries";
import Button from "antd/es/button";

interface ChildProp {
  imageSrc: StaticImport;
  title: string;
  details: string;
  color: string;
  size: string;
  quantity: string;
  price: string;
  id: string;
  image: string;
}

const JobCardModal: React.FC<ChildProp> = ({
  id,
  imageSrc,
  title,
  details,
  color,
  size,
  quantity,
  price,
  image,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const [deleteJob] = useMutation(DELETE_JOB);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleDelete = async (id: string) => {
    try {
      console.log("deleting JOb");

      await deleteJob({
        variables: {
          jobId: id,
        },
     
      });
      
      setIsModalOpen(false);
      
      toast.success("Job deleted successfully");
    } catch (error) {
      toast.error("Failed to delete job");
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div className="bg-white body-font shadow-gray-300 shadow-xl rounded-sm overflow-hidden m-2 lg:h-[calc(100vh-48vh)] h-full z-[80px]">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/5 lg:w-[80%] ">
          {image && (
            <Image
              alt="ecommerce"
              className="w-[100%] object-cover object-center rounded-t-xl md:rounded-l-xl  md:rounded-t-none h-[100%] hover:transform-scale-y-[1.2] hover:w-full"
              src={image}
              width={30}
              height={100}
            />
          )}
        </div>
        <div className="md:w-3/5 md:rounded-r-xl p-4 md:p-6">
          <h2 className="text-sm cursor-pointer font-sans text-black font-bold tracking-widest mb-2">
            {title}
          </h2>
          <div className="mb-4">
            <p className="text-gray-600 mb-2">{details}</p>
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
            <div className="flex flex-col items-center md:ml-auto">

            </div>
          </div>
          <div >
            
            <button className='ml-2 h-auto w-full bg-[#C84869] border-2 py-2 px-6 focus:outline-none hover:bg-[#821a36] rounded text-white font-semibold' onClick={() => handleDelete(id)}>
              Delete Job
            </button>
          </div>
        </div>
      </div>

      {/* AddJobCard modal component */}
      {isModalOpen && (
        <AddJobCard
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          jobId={id}
        />
      )}
    </div>
  );
};

export default JobCardModal;
