import React from 'react';

import './Paginator.css';

const paginator = props => (
  <div className="paginator">
    {props.children}
    <div className="paginator_controls">
      {/* {props.currentPage > 1 && ( */}
        <button className="paginator_control" disabled={props.currentPage <= 1} onClick={props.onPrevious}>
          Previous
        </button>
      {/* )} */}
      {/* <div className='feed_footer'> */}
        <h3>Page {props.currentPage}</h3>
      {/* </div> */}
      {/* {props.currentPage < props.lastPage && ( */}
        <button className="paginator_control" disabled={props.currentPage >= props.lastPage || props.totalPosts < 7} onClick={props.onNext}>
          Next
        </button>
      {/* )} */}
    </div>
  </div>
);

export default paginator;
