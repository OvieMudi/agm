import React from 'react';

const Paginaton = ({ setPage, currentPage, totalPages }) => {
  const paginationItems1 = [
    <a
      key="prevItem"
      href="/"
      aria-current="false"
      aria-disabled="false"
      tabIndex="0"
      aria-label="Previous item"
      type="prevItem"
      className="item"
      onClick={e => setPage(e)}
    >
      ⟨
    </a>,
    <a
      key="firstItem"
      href="/"
      aria-current="false"
      aria-disabled="false"
      aria-label="First item"
      tabIndex="0"
      type="firstItem"
      className="item"
      onClick={e => setPage(e, 1)}
    >
      1
    </a>
  ];
  const paginationItems2 = [
    <a
      key={totalPages}
      href="/"
      aria-current="false"
      aria-disabled="false"
      aria-label="Last item"
      tabIndex="0"
      type="pageItem"
      className="item"
      onClick={e => setPage(e, totalPages)}
    >
      {totalPages}
    </a>,
    <a
      key="nextItem"
      href="/"
      aria-current="false"
      aria-disabled="false"
      tabIndex="0"
      aria-label="Next item"
      type="nextItem"
      className="item"
      onClick={e => setPage(e)}
    >
      ⟩
    </a>
  ];

  const noOfItems = totalPages > 5 ? 5 : totalPages;
  let currentItem = 1;

  const paginationItems3 = Array(noOfItems)
    .fill(null)
    .map((element, i) => {
      currentItem += 1;
      if (i < noOfItems - 1) {
        if (currentPage > noOfItems && i === 0) {
          currentItem = currentPage - 2;

          return (
            <span
              key="elipses1"
              aria-current="false"
              aria-disabled="true"
              tabIndex="-1"
              type="ellipsisItem"
              className="item"
            >
              ...
            </span>
          );
        }
        return (
          <a
            key={i}
            href="/"
            aria-current="false"
            aria-disabled="false"
            tabIndex="0"
            type="pageItem"
            className="item"
            onClick={e => setPage(e)}
          >
            {currentItem}
          </a>
        );
      } else {
        return (
          <span
            key="elipses2"
            aria-current="false"
            aria-disabled="true"
            tabIndex="-1"
            type="ellipsisItem"
            className="item"
          >
            ...
          </span>
        );
      }
    });

  const paginationItems = paginationItems1
    .concat(paginationItems3)
    .concat(paginationItems2);

  return (
    <div
      aria-label="Pagination Navigation"
      role="navigation"
      className="ui pagination menu"
    >
      {paginationItems}
    </div>
  );
};

export default Paginaton;
