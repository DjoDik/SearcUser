import React, { useEffect, useState } from 'react';
import UserList from './UserList';
import Pagination from './Pagination';

export default function UserContainer({ users, setOneUserInfo }) {
  console.log(users);
  const [userOnPage, setUserOnPage] = useState();
  const itemsPerPage = 5;

  useEffect(() => {
    if (users.length > 0) {
      handleSetUserOnPage(1);
    }
  }, [users]);

  const handleSetUserOnPage = (page) => {
    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = users?.slice(indexOfFirstItem, indexOfLastItem);
    setUserOnPage(currentItems);
  };

  return (
    <>
      <UserList userOnPage={userOnPage} setOneUserInfo={setOneUserInfo} />
      <Pagination users={users} setPage={handleSetUserOnPage} itemsPerPage={itemsPerPage} />
    </>
  );
}
