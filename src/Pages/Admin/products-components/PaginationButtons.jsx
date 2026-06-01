import React from "react";

const PaginationButtons = ({filterOptions}) => {
  return (
    <div>
      <div className="pagination-info">
        <p>
          Showing <span>{1}</span> to <span>{5}</span>
          of <span>{10}</span>
        </p>
      </div>
    </div>
  );
};

export default PaginationButtons;
