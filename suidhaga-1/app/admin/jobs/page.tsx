"use client";
import React, { useEffect, useState } from "react";
import {useMutation, useQuery } from "@apollo/client";
import { Table, Skeleton, Avatar, Dropdown, Select, AutoComplete, Input, message } from "antd";
import { GET_JOBS } from "@/graphql/queries/jobs.queries";
import NewImage from "@/public/image/photo-1584184924103-e310d9dc82fc.avif";


const { Search } = Input;
import { DownOutlined } from "@ant-design/icons";
import { UPDATE_JOB_STATUS } from "@/graphql/mutations/updateJobStatus.mutations";
import toast from "react-hot-toast";
import DeleteJobButton from "@/components/buttons/deleteJobButton";
import { DELETE_JOB } from "@/graphql/mutations/deleteJob.mutations";

interface Job {
  _id: string;
  title: string;
  description: string;
  name: string;
  quantity: number;
  image: string;
  amount: number;
  status: String;
}

const Job: React.FC = () => {
  const { loading, error, data } = useQuery<{ jobs: Job[] }>(GET_JOBS);
  const [updateJobStatus] = useMutation(UPDATE_JOB_STATUS);
  const [searchResults, setSearchResults] = useState<Job[]>([]);
  const [suggestions, setSuggestions] = useState<{ value: string }[]>([]);
  const [deleteJob] = useMutation(DELETE_JOB);

  useEffect(() => {
    if (data && data.jobs) {
      setSearchResults(data.jobs);
      setSuggestions(data.jobs.map((job) => ({ value: job.title })));
    }
  }, [data]);

  const handleDelete = async (id: string) => {
 
    try {
      console.log("deleting JOb");
    
      
      await deleteJob({ 
        variables: { 
          jobId: id, 
        } ,
      });
      message.success("Job deleted successfully");
      // Optionally, refetch the data after deletion
      // client.reFetchQueries({ include: ['jobs'] });
    } catch (error) {
      message.error("Failed to delete job");
      console.error("Error deleting job:", error);
    }
  };

  const handleSearch = (value: string) => {
    if (data && data.jobs) {
      const filteredJobs =
        value.trim() === ""
          ? data.jobs
          : data.jobs.filter(
              (job) =>
                job.title.toLowerCase().includes(value.toLowerCase()) ||
                job.name.toLowerCase().includes(value.toLowerCase())
            );
      setSearchResults(filteredJobs);
      setSuggestions(filteredJobs.map((job) => ({ value: job.title })));
    }
  };

  if (loading) return <Skeleton active />;
  if (error) return <p>Error: {error.message}</p>;

  const handleStatusChange = async (jobId: any, newStatus: String) => {
    try {
      const { data } = await updateJobStatus({ variables: { jobId, status: newStatus } });
      if (data && data.updateJobStatus) {
        toast.success('Job status updated successfully');
      } else {
          toast.error('Job not found');
      }
    } catch (error) {
      toast.error('Failed to update job status');
    }
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (_: any, record: Job) => <Avatar src={record?.image} />,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string, record: Job) => (
        <Select
          value={status}
          onChange={(newStatus) => handleStatusChange(record._id, newStatus)}
          options={[
            { value: 'Active', label: 'Active' },
            { value: 'Inactive', label: 'Inactive' },
          ]}
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: Job) => (
        <a onClick={() => handleDelete(record._id)}>Delete</a>
      ),
    },
  ];


  return (
    <div className="overflow-auto">
      <div className="px-3 py-2">
        <AutoComplete
          className="bg-gray-200 rounded-sm w-full"
          options={suggestions}
          onSearch={handleSearch}
          filterOption={(inputValue, option) =>
            option?.value.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
          }
        >
          <Search placeholder="Search by title or username" enterButton />
        </AutoComplete>
      </div>
      <Table
        bordered
        dataSource={searchResults}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
    </div>
  );
};

export default Job;
