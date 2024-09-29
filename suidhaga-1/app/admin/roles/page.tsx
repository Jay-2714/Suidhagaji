'use client'
import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Table, Skeleton, AutoComplete, Input, Modal, Form, Select, Button } from "antd";
import { GET_USERS } from "@/graphql/queries/users.queries";
import { UPDATE_USER_ROLE } from "@/graphql/mutations/users.mutations";

const { Search } = Input;
const { Option } = Select;

interface User {
  _id: string;
  username: string;
  phone: string;
  userType: string;
  name: string;
}

interface DataType extends User {
  Sr_no: number;
}

const GetUsers: React.FC = () => {
  const { data, loading, error, refetch } = useQuery(GET_USERS);
  const [updateUserRole] = useMutation(UPDATE_USER_ROLE);
  const [list, setList] = useState<DataType[]>([]);
  const [searchResults, setSearchResults] = useState<DataType[]>([]);
  const [suggestions, setSuggestions] = useState<{ value: string }[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (data && data.users) {
      const formattedUsers = data.users.map((user: any, index: any) => ({
        Sr_no: index + 1,
        ...user,
        phone: user.phone.toString(),  // Ensure phone number is a string
      }));
      setList(formattedUsers);
      setSearchResults(formattedUsers);
    }
  }, [data]);

  const handleSearch = (value: string) => {
    if (data && data.users) {
      let filteredUsers: DataType[];
      if (value.trim() === '') {
        filteredUsers = data?.users.map((user: any, index: any) => ({
          Sr_no: index + 1,
          ...user,
          phone: user.phone.toString(),
        }));
      } else {
        filteredUsers = data.users
          .filter((user: { name: string; userType: string; phone: string | string[]; }) => 
            user.name.toLowerCase().includes(value.toLowerCase()) ||
            user.userType.toLowerCase().includes(value.toLowerCase()) ||
            user.phone.includes(value)                      
          )
          .map((user: any, index: any) => ({
            Sr_no: index + 1,
            ...user,
          }));
      }
      setSearchResults(filteredUsers);
      setSuggestions(filteredUsers.map(user => ({ value: user.name })));
    }
  };

  const handleSelect = (value: string) => {
    const selectedUser = searchResults.find(user => user.name === value);
    if (selectedUser) {
      setSelectedUserId(selectedUser._id);
    }
  };

  const handleRowClick = (record: DataType) => {
    setSelectedUserId(record._id);
    form.setFieldsValue({ userType: record.userType });
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await updateUserRole({
        variables: { userId: selectedUserId, userType: values.userType },
      });
      setIsModalVisible(false);
      refetch();
    } catch (err) {
      console.error("Error updating user role: ", err);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Sr_no',
      dataIndex: 'Sr_no',
      key: 'Sr_no',
    },
    {
      title: 'Username',
      dataIndex: 'name',
      key: 'username',
      render: (text: any, record: any) => (
        <span style={{ fontWeight: selectedUserId === record._id ? 'bold' : 'normal' }}>{text}</span>
      ),
    },
    {
      title: 'User Type',
      dataIndex: 'userType',
      key: 'userType',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
    },
  ];

  if (loading) return <Skeleton active />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="overflow-auto">
      <div className="px-3 py-2">
        <AutoComplete
          className="bg-gray-200 rounded-sm w-full"
          options={suggestions}
          onSelect={handleSelect}
          onSearch={handleSearch}
          filterOption={(inputValue, option) =>
            option?.value.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
          }
        >
          <Search
            placeholder="Search"
            loading={loading}
            enterButton
          />
        </AutoComplete>
      </div>
      <Table
        bordered
        dataSource={searchResults}
        columns={columns}
        rowKey="Sr_no"
        pagination={false}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        rowClassName={(record) => (record._id === selectedUserId ? 'highlight-row' : '')}
      />
      <Modal
        title="Update User Role"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="userType"
            label="User Type"
            rules={[{ required: true, message: 'Please select a user type!' }]}
          >
            <Select placeholder="Select a user type">
              <Option value="employer">Manufacturer</Option>
              <Option value="employee">Artisan</Option>
              <Option value="Admin">Admin</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GetUsers;
