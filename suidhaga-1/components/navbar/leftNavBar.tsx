"use client";
import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import {
  FileAddFilled,
  AppstoreFilled,
  ShoppingFilled,
  MailFilled,
} from "@ant-design/icons";
import { AutoComplete, Avatar, Input } from "antd";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import { GET_USERS } from "@/graphql/queries/users.queries";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";

const { Search } = Input;

interface ChildProp {
  setJobVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setPostVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  onUserClick: (userId: string) => void;
}

interface User {
  _id: string;
  username: string;
  name: string;
  userType: string;
}

const LeftNavBar: React.FC<ChildProp> = ({
  setJobVisibility,
  setPostVisibility,
  onUserClick,
}) => {
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [suggestions, setSuggestions] = useState<{ value: string }[]>([]);
  const [randomUsers, setRandomUsers] = useState<User[]>([]);
  const { loading, data } = useQuery<{ users: User[] }>(GET_USERS);

  useEffect(() => {
    setSuggestions([]);
  }, []);

  const handleSearch = (value: string) => {
    if (data && data.users) {
      let filteredUsers: User[];
      if (value.trim() === "") {
        filteredUsers = [];
      } else {
        filteredUsers = data.users.filter((user) =>
          user.name.toLowerCase().includes(value.toLowerCase())
        );
      }
      setSearchResults(filteredUsers);
      setSuggestions(filteredUsers.map((user) => ({ value: user.name })));
    }
  };

  const handleSelect = (value: string) => {
    const selectedUser = searchResults.find((user) => user.name === value);
    if (selectedUser) {
      onUserClick(selectedUser._id);
    }
  };

  useEffect(() => {
    if (data && data.users) {
      const shuffledUsers = shuffleArray(data.users).slice(0, 4); // Get 3 random users
      setRandomUsers(shuffledUsers);
    }
  }, [data]);

  const shuffleArray = (array: User[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  return (
    <div className="flex flex-col h-full justify-evenly gap-1 w-full">
      
      <div className="flex flex-col h-auto rounded-xl  shadow-xl p-1 w-full overflow-hidden">
        <AutoComplete
          className="bg-gray-200 rounded-sm w-full"
          options={suggestions}
          onSelect={handleSelect}
          onSearch={handleSearch}
          filterOption={(inputValue, option) =>
            option?.value.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
          }
        >
          <Search placeholder="Search" loading={loading} enterButton />
        </AutoComplete>
        <List sx={{ width: "100%", maxWidth: 360, bgcolor: "white" }}>
          {randomUsers.map((user) => (
            <React.Fragment key={user._id}>
              <ListItem
                alignItems="flex-start"
                onClick={() => onUserClick(user._id)}
              >
                <ListItemAvatar>
                  <Avatar>{user.name.charAt(0)}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={user.name}
                  secondary={
                    <Typography
                      sx={{ display: "inline", textOverflow: "ellipsis" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {user.userType}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </div>
      <div className="flex flex-col sticky bottom-1 text-gray-700 gap-[1px] justify-evenly p-1 bg-white h-1/2 shadow-xl rounded-lg">
        <span
          className="cursor-pointer text-lg font-semibold flex flex-row gap-3 p-2 rounded-lg hover:bg-gray-200"
          onClick={() => setJobVisibility(true)}
        >
          <FileAddFilled />
          Create Job
        </span>
        <span
          className="cursor-pointer text-lg font-semibold flex flex-row gap-3 p-2 rounded-lg hover:bg-gray-200"
          onClick={() => setPostVisibility(true)}
        >
          <AppstoreFilled />
          Create Post
        </span>
        <span className="cursor-pointer text-lg font-semibold flex flex-row gap-3 p-2 rounded-lg hover:bg-gray-200">
          <ShoppingFilled />
          My Orders
        </span>
        {/* <span className="cursor-pointer text-lg font-semibold flex flex-row gap-3 p-2 rounded-lg hover:bg-gray-200">
          <PersonIcon />
          My Account
        </span> */}
        <span className="cursor-pointer text-lg font-semibold flex flex-row gap-3 p-2 rounded-lg hover:bg-gray-200">
          <MailFilled />
          Contact Us
        </span>
        <span className="cursor-pointer text-lg font-semibold flex flex-row gap-3 p-2 rounded-lg hover:bg-gray-200">
          <GroupsIcon />
          About Us
        </span>
      </div>
    </div>
  );
};

export default LeftNavBar;
