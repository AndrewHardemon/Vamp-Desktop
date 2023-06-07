import React, { Component } from 'react';

import Image from '../../../components/Image/Image';
import {BASE_API_URL} from "../../../util/constants";
import { Link } from 'react-router-dom';
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
          image: `${BASE_API_URL}/images/` + resData.post.imageUrl,
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
        <Link to="/"><button class="button button--accent button--raised">Go Back</button></Link>
        {/* <h1>{this.state.title}</h1> */}
        {/* <h2>
          Created by {this.state.author} on {this.state.date}
        </h2> */}
        {/* <div className="single-post_image">
          <Image contain imageUrl={this.state.image} full/>
        </div> */}
        <div className="single-post_container">
          <img class="single-post_isolated-image" style={{maxHeight:"90vh"}} src={this.state.image}></img>
        </div>
        {/* <p>{this.state.content}</p> */}
      </section>
    );
  }
}

export default SinglePost;
