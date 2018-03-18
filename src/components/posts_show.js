import React, { Component, PropTypes} from 'react';
import { connect } from 'react-redux'
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';

class PostsShow extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
}

  onDeleteClick() {
    this.props.deletePost(this.props.params.id)
    .then(() => {
      // Once blog post has been deleted, navigate user to the Index
      // We navigate by calling this.context.router.push with the
      // new path to navigate to.
      this.context.router.push('/');
    });
  }

  render() {

    const { post } = this.props; // ES6 syntax to define a constant. Line below produces the same result.
    // const post = this.props.post;

    if(!post) {
      return <div>loading...</div>
    }

      return (
        <div>
          <Link to="/">Back to posts</Link>
          <button
            className="btn btn-danger pull-xs-right"
            onClick={this.onDeleteClick.bind(this)}>
            Delete Post
          </button>
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

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
