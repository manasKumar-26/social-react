import React, { Component } from 'react';

class Comments extends Component {
  render() {
    const { comments } = this.props;
    return (
      <React.Fragment>
        {comments.map((comment) => {
          return (
            <div className="post-comment-item" key={comment._id}>
              <div className="post-comment-header">
                <span className="post-comment-author">{comment.user.name}</span>
                <span className="post-comment-time">
                  {comment.createdAt.substring(0, 10)}
                </span>
                <span className="post-comment-likes">
                  {comment.likes.length}
                </span>
              </div>
              <div className="post-comment-content">{comment.content}</div>
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}

export default Comments;
