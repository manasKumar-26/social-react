import React, { Component } from 'react';
import propTypes from 'prop-types';
import Createpost from './CreatePost';
import Post from './Post';
class PostsList extends Component {
  render() {
    const { posts, isLoggedIn } = this.props;
    console.log(posts);
    return (
      <React.Fragment>
        <div className="posts-list">
          {isLoggedIn && <Createpost />}
          {posts.map((post) => (
            <Post post={post} key={post._id} />
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
