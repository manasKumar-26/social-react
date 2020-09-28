import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Comments from './Comments';
import { connect } from 'react-redux';
import { createComment, postLikeToggle } from '../actions/posts';
class Post extends Component {
  constructor() {
    super();
    this.state = {
      content: '',
    };
  }
  newComment = (post) => {
    if (this.state.content === '') {
      return;
    }
    this.props.dispatch(createComment(post._id, this.state.content));
    this.setState({
      content: '',
    });
  };
  onComment = (e) => {
    this.setState({
      content: e.target.value,
    });
  };
  toggleLike = () => {
    console.log('liked');
    const { post, user, dispatch } = this.props;
    console.log(post, user);
    dispatch(postLikeToggle(post._id, 'Post', user._id));
  };
  render() {
    const { post, user } = this.props;
    const isLikedByUser = post.likes.includes(user._id);
    return (
      <div className="post-wrapper" key={post._id}>
        <div className="post-header">
          <div className="post-avatar">
            <img
              src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
              alt="user-pic"
            />
            <div>
              <Link to={`/user/${post.user._id}`}>
                <span className="post-author">{post.user.name}</span>
              </Link>
              <span className="post-time">
                {post.createdAt.substring(0, 10)}
              </span>
            </div>
          </div>
          <div className="post-content">{post.content}</div>

          <div className="post-actions">
            <div className="post-like">
              <div onClick={this.toggleLike}>
                {isLikedByUser ? (
                  <div className="liked">
                    <i class="fas fa-heart"></i>
                  </div>
                ) : (
                  <div className="unliked">
                    <i class="fas fa-heart"></i>
                  </div>
                )}
              </div>
              <span>{post.likes.length}</span>
            </div>

            <div className="post-comments-icon">
              <img
                src="https://image.flaticon.com/icons/svg/1380/1380338.svg"
                alt="comments-icon"
              />
              <span>{post.comments.length}</span>
            </div>
          </div>
          <div className="post-comment-box">
            <input
              placeholder="Start typing a comment"
              onChange={this.onComment}
              value={this.state.content}
            />
            <button className="button6" onClick={() => this.newComment(post)}>
              Comment
            </button>
          </div>

          {post.comments.length !== 0 && (
            <div className="post-comments-list">
              <Comments post={post} />
            </div>
          )}
        </div>
      </div>
    );
  }
}
function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  };
}
export default connect(mapStateToProps)(Post);
