import React from 'react';

import './MobileToggle.css';

const mobileToggle = props => (
  <button className="mobile-toggle" onClick={props.onOpen}>
    <span className="mobile-toggle_bar" />
    <span className="mobile-toggle_bar" />
    <span className="mobile-toggle_bar" />
  </button>
);

export default mobileToggle;
