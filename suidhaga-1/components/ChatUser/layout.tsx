import React from 'react'
import MAN from '@/public/image/man.jpg'
import Image from 'next/image'

interface ChildProp{
    userName: String;
    newMessages: string;
}

const Notificationlayout:React.FC<ChildProp> = ({userName , newMessages}) => {
  return (
    <div>
      <div className='flex flex-row items-center justify-between p-[2%] cursor-pointer'>
       <div className='flex flex-row items-center gap-2 '>
            <Image src={MAN} alt='' style={{width:'50px' , height:'50px' }} className='rounded-[20%]'/> 
            <div className='flex flex-col mr-[]'>
                <span className='font-semibold'>{userName}</span>
                <span className='w-[80%] text-xs'>{newMessages}</span>
            </div>
       </div>
        <span className='h-2 w-2 rounded-[50%] bg-blue-500 mr-[5%]'></span>
      </div>
    </div>
  )
}

export default Notificationlayout;
