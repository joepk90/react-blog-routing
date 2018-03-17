import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  // Event handler to push users back to the homepage when a post is sucessfuly submitted.
  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
        // blog post has been created, navigate user to the Index
        // We navigate by calling this.context.router.push with the
        // new path to navigate to.
        this.context.router.push('/');
      });
  }

  render() {
    const { fields: { title, categories, content }, handleSubmit} = this.props;
    // const { handleSubmit} = this.props; This assignment is the same as the above line below
    // (the assigned variable 'handleSubmit' must be the same value being assigned).
    // const handleSubmit = this.props.handleSubmit;


    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create a New Post</h3>
        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : '' }`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title}/>
          <div className="text-help">
          {title.touched ? title.error : ''}
          </div>
        </div>

        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : '' }`}>
          <label>Categories</label>
          <input type="text" className="form-control" {...categories}/>
          <div className="text-help">
          {categories.touched ? categories.error : ''}
          </div>
        </div>

        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : '' }`}>
          <label>Content</label>
          <textarea type="text" className="form-control" {...content}/>
          <div className="text-help">
          {content.touched ? content.error : ''}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>

      </form>
    );
  }
}

function validate(values) {
  const errors = {};

if (!values.title) {
  errors.title = 'Enter a title';
}
if (!values.categories) {
  errors.categories = 'Enter categories';
}
if (!values.content) {
  errors.content = 'Enter some content';
}

  return errors;
}

// conntect: 1st argument is mapStateToProps, 2nd is mapDispathToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispathToProps

export default reduxForm({
    form: 'PostsNewForm',
    fields: ['title', 'categories', 'content'],
    validate
}, null, {createPost} )(PostsNew);
