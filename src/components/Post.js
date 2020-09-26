import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Comments from './Comments';
import { connect } from 'react-redux';
import { createComment } from '../actions/posts';
class Post extends Component {
  constructor() {
    super();
    this.state = {
      content: '',
    };
  }
  newComment = (post) => {
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
  render() {
    const { post } = this.props;
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
              <img
                src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
                alt="likes-icon"
              />
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

          <div className="post-comments-list">
            {post.comments.length !== 0 && (
              <Comments comments={post.comments} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Post);
