import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchPost } from '../actions/index';

class PostsShow extends Component {

  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }

  render() {

    const { post } = this.props; // ES6 syntax to define a constant. Line below produces the same result.
    // const post = this.props.post;

    if(!post) {
      return <div>loading...</div>
    }

      return (
        <div>
          <h3>{post.title}</h3>
          <h6>Categories: {post.categories}</h6>
          <p>{post.content}</p>
        </div>
      );
  }
}

function mapStateToProps(state) {
  return { post: state.posts.post };
}

export default connect(mapStateToProps, { fetchPost })(PostsShow);
