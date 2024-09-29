'use client'
import React, { useEffect, useState } from 'react'
import NewImage from '@/public/image/photo-1584184924103-e310d9dc82fc.avif'
import Image from 'next/image'
import { LikeOutlined, CommentOutlined } from '@ant-design/icons'
import toast from 'react-hot-toast'
import ProductCard from '@/components/card/postCard'
import { Card } from 'antd'
import Meta from 'antd/es/card/Meta'
import { GET_POSTS } from '@/graphql/queries/post.queries'
import { useQuery } from '@apollo/client'

const Post = () => {
  const { data, loading, error } = useQuery(GET_POSTS)
  const [posts, setPosts] = useState<any[]>([]);
  // console.log(`Posts: `,data)

  useEffect(() => {
    if (data) {
      setPosts(data.posts); // Adjust this line based on the actual structure of the response
    }
  }, [data])

  // useEffect(() => {
  //   console.log(posts);

  // }, [posts])

  const handleLike = () => {
    toast.success(`Post Liked`)
  }

  return (
    <>
      {/* <section className='h-screen'>
      <div className=' bg-white body-font shadow-gray-500 shadow-xl rounded-xl overflow-hidden mb-4 h-[60%]'>
      <div className='px-[1%] py-[1%] mx-auto flex flex-row '>
        <div className='lg:w-4/5 mx-auto '>
          <Image
            alt='ecommerce'
            className='lg:w-full h-[49%] object-cover object-center rounded-xl'
            src={NewImage}
          />
          </div>
          <div>
          <div className='lg:w-full w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0 p-2'>
            <h2 className='text-sm font-sans text-black font-bold tracking-widest text-xl'>
              Chaniya Choli
            </h2>
            <div className='flex mb-4'>
              <a className='flex-grow text-black border-b-2 border-blue-400 py-2 text-lg px-1'>
                Details:
              </a>
            </div>
            <p className='leading-relaxed mb-4 text-gray-600'>
              Required to build xyz items using xyz materials.
            </p>
            <div className='flex border-t border-gray-600 py-2'>
              <span className='text-black'>Color: </span>
              <span className='ml-auto text-black'>Blue</span>
            </div>
            <div className='flex border-t border-gray-600 py-2'>
              <span className='text-black'>Size: </span>
              <span className='ml-auto text-black'>Medium</span>
            </div>
            <div className='flex border-t border-b mb-6 border-gray-600 py-2'>
              <span className='text-black'>Quantity: </span>
              <span className='ml-auto text-black'>4</span>
            </div>
            <div className='flex flex-col'>
              <span className='title-font font-medium text-2xl text-black'>
                $58.00
              </span>
              </div>
              <div className='flex flex-row items-center'>
              <span onClick={()=>toast.success(`Post Liked`)}><LikeOutlined className='text-3xl px-2 hover:text-[#A72447] cursor-pointer' /></span>
              <CommentOutlined className='text-3xl px-2 hover:text-[#A72447] cursor-pointer'></CommentOutlined>
              <button className=' ml-2 w-full bg-[#C84869] border-2 py-2 px-6 focus:outline-none hover:bg-[#A72447] rounded text-white font-semibold'>
                Buy
              </button>
              </div>
            </div>
          </div>
        </div>
        </div>
        </section>
        <section className='h-screen'>
      <div className=' bg-white body-font shadow-gray-500 shadow-xl rounded-xl overflow-hidden mb-4 h-[60%]'>
      <div className='px-[1%] py-[1%] mx-auto flex flex-row '>
        <div className='lg:w-4/5 mx-auto '>
          <Image
            alt='ecommerce'
            className='lg:w-full h-[49%] object-cover object-center rounded-xl'
            src={NewImage}
          />
          </div>
          <div>
          <div className='lg:w-full w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0 p-2'>
            <h2 className='text-sm font-sans text-black font-bold tracking-widest text-xl'>
              Chaniya Choli
            </h2>
            <div className='flex mb-4'>
              <a className='flex-grow text-black border-b-2 border-blue-400 py-2 text-lg px-1'>
                Details:
              </a>
            </div>
            <p className='leading-relaxed mb-4 text-gray-600'>
              Required to build xyz items using xyz materials.
            </p>
            <div className='flex border-t border-gray-600 py-2'>
              <span className='text-black'>Color: </span>
              <span className='ml-auto text-black'>Blue</span>
            </div>
            <div className='flex border-t border-gray-600 py-2'>
              <span className='text-black'>Size: </span>
              <span className='ml-auto text-black'>Medium</span>
            </div>
            <div className='flex border-t border-b mb-6 border-gray-600 py-2'>
              <span className='text-black'>Quantity: </span>
              <span className='ml-auto text-black'>4</span>
            </div>
            <div className='flex flex-col'>
              <span className='title-font font-medium text-2xl text-black'>
                $58.00
              </span>
              </div>
              <div className='flex flex-row items-center'>
              <span onClick={()=>toast.success(`Post Liked`)}><LikeOutlined className='text-3xl px-2 hover:text-[#A72447] cursor-pointer' /></span>
              <CommentOutlined className='text-3xl px-2 hover:text-[#A72447] cursor-pointer'></CommentOutlined>
              <button className=' ml-2 w-full bg-[#C84869] border-2 py-2 px-6 focus:outline-none hover:bg-[#A72447] rounded text-white font-semibold'>
                Buy
              </button>
              </div>
            </div>
          </div>
        </div>
        </div>
        </section> */}

      {/* <ProductCard imageSrc={NewImage} title={'Chaniya Choli'} details={'A Designer Chaniya Choli'} color={'Blue , Red'} size={'xl , lg'} quantity={'20'} price={'20000'} postId={''}/>
      <ProductCard imageSrc={NewImage} title={'Chaniya Choli'} details={'A Designer Chaniya Choli'} color={'Blue , Red'} size={'xl , lg'} quantity={'20'} price={'20000'} postId={''}/> */}
      {/* <div>
        {data && data.post && (
            // <ProductCard
            //   style={{ width: 240 }}
            //   cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            // >
            //   <Meta title={data?.post.title} description={data?.post.description} />
            // </ProductCard>
            <ProductCard imageSrc={NewImage} title={data.post.title} details={data.post.description} color={'Blue , Red'} size={'xl , lg'} quantity={'20'} price={'20000'} postId={''}/>
        )}
      </div> */}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {posts && posts.map((post: any) => (
        <div key={post.id} >
          {/* <JobCard image={job?.image} id={job?._id} imageSrc={NewImage} title={job?.title} details={job?.description} color={job?.color} size={job?.size} quantity={job?.quantity} price={job?.amount}/> */}
          <ProductCard
            image={post?.image}
            title={post?.title}
            details={post?.description}
            color={'Blue , Red'}
            size={'xl , lg'}
            quantity={'20'}
            price={'20000'}
            postId={post._id} />
        </div>
      ))}
    </>
  )
}

export default Post;
