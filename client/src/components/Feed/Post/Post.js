import React from 'react';

import Button from '../../Button/Button';
import Image from "../../Image/Image"
import './Post.css';

const post = props => (
  <article className="post">
    <header className="post__header">
      <h3 className="post__meta" style={{display: "inline"}}>
        {props.author} ({props.date})
      </h3>
      <div className="post__actions" style={{display: "inline", float: "right"}}>
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
      {/* <h1 className="post__title">{props.title}</h1> */}
    </header>
    <hr></hr>
    <div style={{display: "inline", fontSize: "20px"}} className="post__content">{props.content}</div>
    <div className="post__image">
      <Image imageUrl={'http://localhost:8080/'+props.image} contain />
    </div>

  </article>
);

export default post;
