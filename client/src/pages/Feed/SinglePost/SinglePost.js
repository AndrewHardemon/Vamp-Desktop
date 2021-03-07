import React, { Component } from 'react';

import Image from '../../../components/Image/Image';
import {BASE_API_URL} from "../../../util/constants";
import './SinglePost.css';

class SinglePost extends Component {
  state = {
    title: '',
    author: '',
    date: '',
    image: '',
    content: ''
  };

  componentDidMount() {
    const postId = this.props.match.params.postId;
    fetch(`${BASE_API_URL}/feed/post/` + postId, {
      headers: {
        Authorization: 'Bearer ' + this.props.token
      }
    })
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch image');
        }
        return res.json();
      })
      .then(resData => {
        this.setState({
          title: resData.post.title,
          author: resData.post.creator.name,
          image: `${BASE_API_URL}/` + resData.post.imageUrl,
          date: new Date(resData.post.createdAt).toLocaleDateString('en-US'),
          content: resData.post.content
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <section className="single-post">
        <a href="/"><button class="button button--accent button--raised">Back</button></a>
        {/* <h1>{this.state.title}</h1> */}
        {/* <h2>
          Created by {this.state.author} on {this.state.date}
        </h2> */}
        {/* <div className="single-post__image">
          <Image contain imageUrl={this.state.image} full/>
        </div> */}
        <img class="single-post__isolated-image" src={this.state.image}></img>
        {/* <p>{this.state.content}</p> */}
      </section>
    );
  }
}

export default SinglePost;
