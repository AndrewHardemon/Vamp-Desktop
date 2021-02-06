import React from 'react';

import './Image.css';

const image = props => (
  <div
    className="image"
    style={{
      backgroundImage: `url('${props.imageUrl}')`,
      backgroundSize: props.contain ? 'contain' : 'cover',
      backgroundPosition: props.left ? 'left' : 'center',
      height: props.full ? "100%" : "100px", //might not need the props anymore
      width: props.full ? "100%" : "100px"
    }}
  />
);

export default image;
