import React from 'react';
import { Route, IndexRoute} from 'react-router';

import App from './components/app';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';

export default (
   <Route path="/" component={App} >
      <IndexRoute component={PostsIndex} />
      <Route path="posts/new" component={PostsNew} />
      <Route path="posts/new" component={PostsNew} />
      <Route path="posts/:id" component={PostsShow} />
   </Route>
);

// this.props.pa rams.id
// Using :id, react-router will pass the provided id parameter from the url to the PostsShow object
