import React from 'react';

import Button from '../../Button/Button';
import Image from "../../Image/Image"
import { Link } from 'react-router-dom';
import {BASE_API_URL} from "../../../util/constants";
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
      <Link to={props.id}>
        <Image imageUrl={`${BASE_API_URL}/images/` + props.image} contain /> 
      </Link>
    </div>
    <div className="post__content">{props.content}</div>

  </article>
);

export default post;
