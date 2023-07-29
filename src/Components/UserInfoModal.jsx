import React from 'react';

export default function UserInfoModal({ oneUserInfo }) {
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              <img
                src={oneUserInfo.avatar_url}
                style={{ width: '50px', height: '50px', marginRight: '10px' }}
              />
              {oneUserInfo.login}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Закрыть"
            ></button>
          </div>
          <div className="modal-body">
            Url:{' '}
            {
              <a href={oneUserInfo.html_url} style={{ textDecoration: 'none' }}>
                {oneUserInfo.html_url}
              </a>
            }{' '}
            <br />
            Type: {oneUserInfo.type} <br />
            id: {oneUserInfo.id}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
