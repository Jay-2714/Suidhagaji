// client/components/DeleteUserButton.js
import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_JOB } from '@/graphql/mutations/deleteJob.mutations';
import { GET_JOBS } from '@/graphql/queries/jobs.queries'
import { Button } from 'antd';
import toast from 'react-hot-toast';

interface DeleteJobButtonProps {
    jobId: string;
}

const DeleteJobButton: React.FC<DeleteJobButtonProps> = ({ jobId }) => {
    const [deleteJob, { loading, error }] = useMutation(DELETE_JOB, {
        variables: { jobId: jobId },
        onCompleted: (data) => {
            if (data.deleteJob.success) {
                toast.success(data.deleteJob.message);
            } else {
                toast.error(data.deleteJob.message);
            }
        },
        onError: () => {
            toast.error('An error occurred while deleting the job.');
        },
        refetchQueries: [GET_JOBS],
    });

    const handleDelete = async () => {
        try {
            await deleteJob();
        } catch (err) {
            console.error(err);
            toast.error('An error occurred while deleting the user.');
        }
    };

    return (
        <Button onClick={handleDelete} loading={loading} danger>
            Delete User
        </Button>
    );
};

export default DeleteJobButton;
