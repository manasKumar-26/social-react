import React, { Component } from 'react';
import propTypes from 'prop-types';
import Createpost from './CreatePost';
import Post from './Post';
class PostsList extends Component {
  render() {
    const { posts } = this.props;
    console.log(posts);
    return (
      <React.Fragment>
        <div className="posts-list">
          <Createpost />

          {posts.map((post) => (
            <Post post={post} />
          ))}
        </div>
      </React.Fragment>
    );
  }
}
PostsList.propTypes = {
  posts: propTypes.array.isRequired,
};
export default PostsList;
