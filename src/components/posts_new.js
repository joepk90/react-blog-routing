import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

const FIELDS = {
  title: {
    type: 'input',
    label: 'Title for Post'
  },
  categories: {
    type: 'input',
    label: 'Enter some categories for this post'
  },
  content: {
    type: 'textarea',
    label: 'Post Contents'
  },
};

// ['title', 'categories', 'content'];

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

renderField(fieldConfig, field) {
  const fieldHelper = this.props.fields[field];

  return (
    <div className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : '' }`}>
      <label>{fieldConfig.label}</label>
      <fieldConfig.type type="text" className="form-control" {...fieldHelper}/>
      <div className="text-help">
      {fieldHelper.touched ? fieldHelper.error : ''}
      </div>
    </div>
  );
}

  render() {
    const { handleSubmit} = this.props;
    // const { handleSubmit} = this.props; This assignment is the same as the above line below
    // (the assigned variable 'handleSubmit' must be the same value being assigned).
    // const handleSubmit = this.props.handleSubmit;


    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create a New Post</h3>

      {_.map(FIELDS, this.renderField.bind(this))}

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>

      </form>
    );
  }
}

function validate(values) {
  const errors = {};


_.each(FIELDS, (type, field) => {
  if(!values[field]) {
    errors[field] = `Enter a ${field}`;
  }
});

  return errors;
}

// conntect: 1st argument is mapStateToProps, 2nd is mapDispathToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispathToProps

export default reduxForm({
    form: 'PostsNewForm',
    fields: _.keys(FIELDS),
    validate
}, null, {createPost} )(PostsNew);
