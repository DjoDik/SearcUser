import React, { useState } from 'react';

export default function Pagination({ users, setPage, itemsPerPage }) {
  const [currentPage, setCurrentPage] = useState(1);
  console.log('useStatePage', currentPage);

  const nextPage = () => {
    // Через prev не корректно меняются страницы. По этому через переменную
    const nextPageValue = currentPage + 1;
    setCurrentPage(nextPageValue);
    setPage(nextPageValue);
  };

  const prevPage = () => {
    // Через prev не корректно меняются страницы. По этому через переменную
    const prevPageValue = currentPage - 1;
    setCurrentPage(prevPageValue);
    setPage(prevPageValue);
  };

  return (
    <>
      {users?.length > itemsPerPage && (
        <div
          style={{
            margin: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <button
            className="btn btn-primary"
            onClick={prevPage}
            disabled={currentPage === 1}
            style={{ margin: '5px' }}
          >
            Назад
          </button>
          <button
            className="btn btn-primary"
            style={{ margin: '5px' }}
            onClick={nextPage}
            disabled={currentPage * itemsPerPage >= users?.length}
          >
            Вперед
          </button>
        </div>
      )}
    </>
  );
}
