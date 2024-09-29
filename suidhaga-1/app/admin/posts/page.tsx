"use client";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Table, Skeleton, Avatar, Dropdown, message, Select, Typography, Tooltip } from "antd";
import { GET_POSTS_ADMIN } from "@/graphql/queries/post.queries";
import NewImage from '@/public/image/photo-1584184924103-e310d9dc82fc.avif';
import { DownOutlined } from "@ant-design/icons";

interface Posts {
  _id: string;
  title: string;
  description: string;
  username: string;
  createdAt: string;
}

const Posts: React.FC = () => {
  const { loading, error, data } = useQuery(GET_POSTS_ADMIN);
  const [list, setList] = useState<Posts[]>([]);

  useEffect(() => {
    if (data && data.posts) {
      setList(data.posts);
      console.log(list);
    }
  }, [data]);

  if (loading) return <Skeleton active />;
  if (error) return <p>Error: {error.message}</p>;

  const columns = [
    {
      title: 'Sr. No.',
      dataIndex: 'sr',
      key: 'sr',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: {
        showTitle: false,
      },
      render: (description:string) => (
        <Tooltip placement="topLeft" title={description}>
          {description}
        </Tooltip>
      ),
      // render: (description: String) => (
      //   <Typography.Paragraph
      //     ellipsis={{
      //       rows,
      //       expandable: 'collapsible',
      //       expanded,
      //       onExpand: (_, info) => setExpanded(info.expanded),
      //     }}
      //   >
      //     { description }
      //   </Typography.Paragraph>
      // ),
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ];


  return (
    <div className="overflow-auto">
      <Table
        bordered
        dataSource={list}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
    </div>
  );
};

export default Posts;
