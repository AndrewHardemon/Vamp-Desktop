import React from 'react';

import './Logo.css';

const logo = props => <h1 className="logo">{localStorage.getItem("name") || props.name || "VAMP"}</h1>;

export default logo;
