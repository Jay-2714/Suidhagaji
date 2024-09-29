import React, { useEffect, useState } from 'react';
import Image from 'next/image'; 
import { LikeOutlined, CommentOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { useRouter } from 'next/navigation';
import AddJobCard from '@/app/(client)/jobs/[jobId]/page';
import { APPLY_JOB } from '@/graphql/mutations/applyJob.mutation';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_ORDER } from '@/graphql/mutations/order.mutation';
import { GET_AUTHENTICATED_USER } from '@/graphql/queries/users.queries';

interface ChildProp {
    imageSrc    : StaticImport,
    title       : string, 
    details     : string, 
    color       : string, 
    size        : string, 
    quantity    : string, 
    price       : string,
    id          : string,
    image       : string,
    name        : string,
    customerID  : string,


}

const JobCard: React.FC<ChildProp> = ({ id, imageSrc, title, details, color, size, quantity, price , image , name, customerID}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const jobId = id;
  const jobName = title;
  const [applyJob ,{ loading , error}] = useMutation(APPLY_JOB); 
  const [createOrder ] = useMutation(CREATE_ORDER);
  const { data } = useQuery(GET_AUTHENTICATED_USER);
  const router = useRouter();
  const [role , setRole] = useState();

  useEffect(()=> {
      if(data){
        setRole(data?.authUser?.userType);
      }
  },[data])

  // console.log(jobId)
  console.log(data?.authUser?._id, data?.authUser?.userType);
  

  const handleTitleClick = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }
  


  const onApplyJob = async () => {
    
  try {
    console.log("creating Order");

    const OrderInput = {
        jobID : jobId,
        appliedUsername : data?.authUser?.name,
        appliedUserId : data?.authUser?._id,
        userRole: data?.authUser?.userType,
        customerId: customerID,
        jobName: jobName,
        customerName: name,
    }
    console.log(OrderInput);
    await createOrder({
      variables:{
        input : OrderInput,
      }
    })
    .then(()=>{toast.success("Order Created"),console.log("Order Created")})
    .catch(error =>{ console.log("Crete Order Error : ",error)});
  } catch (error) {
    console.log("Create Order Error : ",error);
  }

    // console.log("jobId",jobId);
    await applyJob ({
      variables: {
        jobId: jobId,
      }
    })
    .then(() => {toast.success(`Successfully applied`)})
    .catch(error =>{console.log(error)});
    // toast.success("Successfully applied");
  }

  return (
    <div className='bg-white body-font shadow-gray-300 shadow-xl rounded-xl overflow-hidden mb-2 lg:h-[calc(100vh-48vh)] h-full z-[80px]'>
      <div className='flex flex-col md:flex-row'>
        <div className='md:w-2/5 lg:w-[80%] '>
          {image && <Image
            alt='ecommerce'
            onClick={handleTitleClick}
            className='w-full transition-transform transform hover:scale-[1.02] ease-in  object-cover object-center rounded-t-xl md:rounded-l-xl  md:rounded-t-none h-[100%] '
            src={image}
            width={30}
            height={100}
          />}
        </div>
        <div className='md:w-3/5 md:rounded-r-xl p-4 md:p-6'>
          <h2 onClick={handleTitleClick} className='text-xl cursor-pointer text-black font-bold tracking-widest mb-2'>
            {title.toUpperCase()}
          </h2>
          <div className='mb-4'>
            <p className='text-gray-600 mb-2'>{details}</p>
            <div className='flex border-t border-gray-600 py-2'>
              <span className='text-black'>Color: </span>
              <span className='ml-auto text-black'>{color}</span>
            </div>
            <div className='flex border-t border-gray-600 py-2'>
              <span className='text-black'>Size: </span>
              <span className='ml-auto text-black'>{size}</span>
            </div>
            <div className='flex border-t border-b mb-6 border-gray-600 py-2'>
              <span className='text-black'>Quantity: </span>
              <span className='ml-auto text-black'>{quantity}</span>
            </div>
          </div>
          <div className='flex flex-col md:flex-row items-center'>
            <span className='title-font font-medium text-2xl text-black mb-2 md:mb-0 md:mr-4'>
            ₹{price}
            </span>
            <div className='flex items-center md:ml-auto'>
              {role==="Admin"||role==="employee"?<button className='ml-2 w-full bg-[#C84869] border-2 py-2 px-6 focus:outline-none hover:bg-[#A72447] rounded text-white font-semibold'
               onClick={onApplyJob}>
                Apply
              </button>:" "}
            </div>
          </div>
        </div>
      </div>

      {/* AddJobCard modal component */}
      {isModalOpen && (
        <AddJobCard isOpen={isModalOpen} onClose={handleCloseModal} jobId={id} />
      )}
    </div>
  );
}

export default JobCard;
