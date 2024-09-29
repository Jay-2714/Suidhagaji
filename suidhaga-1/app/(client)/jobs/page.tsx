'use client'
import React, { useEffect, useState } from 'react'
import ProductCard from '@/components/card/postCard';
import NewImage from '@/public/image/photo-1584184924103-e310d9dc82fc.avif'
import JobCard from '@/components/card/jobCard';
import { useQuery } from '@apollo/client';
import { GET_JOBS } from '@/graphql/queries/jobs.queries';
import { Empty } from 'antd';

const Job = () => {
  const{data,loading,error} = useQuery(GET_JOBS)  
  const[jobs , setJobs] = useState([]);
  
  useEffect(()=>{
    if(data){
      const activeJobs = data.jobs.filter((job: { status: string; }) => job.status === 'Active');
      setJobs(activeJobs);
    }    
  },[data])
  
  // useEffect(()=>{
  //   console.log(jobs);
  // },[jobs])
 
  return (
    jobs? (
    <div>
      {jobs && jobs.map((job : any)=>(
        <div key={job}> 
          <JobCard image={job?.image} id={job?._id} imageSrc={NewImage} title={job?.title} details={job?.description} color={job?.color} size={job?.size} quantity={job?.quantity} price={job?.amount} name={job?.name} customerID={job?.user}/>
        </div>  
      ))}
    </div>
    
  ): <Empty />
)}


export default Job;

//! 1. Add a sample data : [job image , title , description , amount and a button to apply for the job]
//! 2. Each Job should have its own white-bg and add gap between each jobs

