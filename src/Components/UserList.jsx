import React from 'react';

export default function UserList({ userOnPage, setOneUserInfo }) {
  const clickHandler = (el) => {
    setOneUserInfo(el);
  };
  return (
    <>
      <ul className="list-group">
        {userOnPage?.map((el) => (
          <li
            className="list-group-item"
            key={el.id}
            style={{ textAlign: 'center', cursor: 'pointer' }}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            data-bs-config="el"
            onClick={() => clickHandler(el)}
          >
            {el.login}
          </li>
        ))}
      </ul>
    </>
  );
}
