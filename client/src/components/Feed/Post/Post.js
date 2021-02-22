import React from 'react';

import Button from '../../Button/Button';
import Image from "../../Image/Image"
import './Post.css';

const post = props => (
  <article className="post">
    <header className="post__header">
      <h3 className="post__meta">
        {props.author} ({props.date})
      </h3>
      <div className="post__actions">
        <Button mode="flat" link={props.id}>
          View
        </Button>
        <Button mode="flat" onClick={props.onStartEdit}>
          Edit
        </Button>
        <Button mode="flat" design="danger" onClick={props.onDelete}>
          X
        </Button>
      </div>
    </header>
    <hr></hr>
    <div className="post__image" style={props.image ? null : {display: "none"}}>
      <Image imageUrl={'http://localhost:8080/'+props.image} contain />
    </div>
    <div className="post__content">{props.content}</div>

  </article>
);

export default post;
