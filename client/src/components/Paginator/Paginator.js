import React from 'react';

import './Paginator.css';

const paginator = props => (
  <div className="paginator">
    {props.children}
    <div className="paginator__controls">
      {/* {props.currentPage > 1 && ( */}
        <button className="paginator__control" disabled={props.currentPage <= 1} onClick={props.onPrevious}>
          Previous
        </button>
      {/* )} */}
      {/* <div className='feed__footer'> */}
        <h3>Page {props.currentPage}</h3>
      {/* </div> */}
      {/* {props.currentPage < props.lastPage && ( */}
        <button className="paginator__control" disabled={props.currentPage >= props.lastPage} onClick={props.onNext}>
          Next
        </button>
      {/* )} */}
    </div>
  </div>
);

export default paginator;
