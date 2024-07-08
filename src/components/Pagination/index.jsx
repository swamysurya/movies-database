import { useState } from "react";
import "./index.css";

const Pagination = (props) => {
  // a state for page
  const [pageNo, setPageNo] = useState(1);

  const onNextPage = () => {
    const { apiCallback, totalPages } = props;
    setPageNo((prevPageNo) => {
      if (prevPageNo < totalPages) {
        setPageNo(pageNo + 1);
        apiCallback(pageNo + 1);
      }
    });
  };

  const onPrevPage = () => {
    const { apiCallback } = props;
    setPageNo((prevPageNo) => {
      if (prevPageNo > 1) {
        setPageNo(pageNo - 1);
        apiCallback(pageNo - 1);
      }
    });
  };

  return (
    <div className="mb-3 d-flex justify-content-center align-items-center">
      <button type="button" className="control-btn" onClick={onPrevPage}>
        Prev
      </button>
      <p className="page-no">{pageNo}</p>
      <button type="button" className="control-btn" onClick={onNextPage}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
