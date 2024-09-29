'use client'
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_JOB_BY_ID } from '../../../../graphql/queries/jobs.queries'; // Adjust the import path if necessary
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import JobCard from '@/components/card/jobCard'; // Adjust the import path if necessary
import JobCardModal from '@/components/card/jobCardModal';

interface AddJobCardProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
}

const AddJobCard: React.FC<AddJobCardProps> = ({ isOpen, onClose, jobId }) => {
  const { data, loading, error } = useQuery(GET_JOB_BY_ID, {
    variables: { id: jobId },
    skip: !jobId,
  });
  console.log(data);
  

  return (
    <Dialog  open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className='bg-blue-950 text-white'>Job Details</DialogTitle>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && data.job && (
          <div className='bg-gray-400'>
          <JobCardModal
            image={data.job.image} 
            id={data.job._id} 
            imageSrc={data.job.NewImage} 
            title={data.job.title} 
            details={data.job.description} 
            color={data.job.color} 
            size={data.job.size} 
            quantity={data.job.quantity} 
            price={data.job.amount} 
          />
          </div>
        )}
    </Dialog>
  );
};

export default AddJobCard;
