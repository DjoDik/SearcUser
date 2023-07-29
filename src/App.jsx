import React, { useState } from 'react';
import CustomInput from './Components/CustomInput';
import UserInfoModal from './Components/UserInfoModal';
import UserContainer from './Components/UserContainer';

function App() {
  const [users, setUsers] = useState([]);
  const [oneUserInfo, setOneUserInfo] = useState({});

  return (
    <>
      <CustomInput setUsers={setUsers} />
      <UserContainer users={users} setOneUserInfo={setOneUserInfo} />
      <UserInfoModal oneUserInfo={oneUserInfo} />
    </>
  );
}

export default App;
