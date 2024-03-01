import React from 'react';

import Button from '../../Button/Button';
import Image from "../../Image/Image"
import { Link } from 'react-router-dom';
import {BASE_API_URL} from "../../../util/constants";
import './Post.css';

const Post = props => (
  <article className="post">
    <header className="post_header">
      <h3 className="post_meta">
        {props.author} ({props.date})
      </h3>
      {localStorage.getItem("name") === props.author ? (
      <div className="post_actions">
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
      ) : (
        <div className="post_actions">
          <Button mode="flat" onClick={props.onStartEdit}>
            Reply
          </Button>
        </div>
      )}
    </header>
    <hr></hr>
    <div className='post_container'>
      <div className="post_content">{props.content}</div>
      <div className="post_image" style={props.image ? null : {display: "none"}}>
        <Link to={props.id}>
          <Image imageUrl={`${BASE_API_URL}/images/` + props.image} contain /> 
        </Link>
      </div>
    </div>
  </article>
);

export default Post;
