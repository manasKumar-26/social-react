import React from 'react';
import { connect } from 'react-redux';
import { commentToggleLike } from '../actions/posts';
class Comment extends React.Component {
  toggleLike = () => {
    console.log('liked the  comment');
    this.props.dispatch(
      commentToggleLike(
        this.props.comment._id,
        'Comment',
        this.props.user._id,
        this.props.postid
      )
    );
  };
  deleteComment = () => {
    console.log(this.props.comment._id, ' deleted');
  };
  render() {
    const { comment, user } = this.props;
    const isLiked = comment.likes.includes(user._id);
    const isCommentedByUser = comment.user._id === user._id;
    return (
      <div className="post-comment-item" key={comment._id}>
        <div className="post-comment-header">
          <span className="post-comment-author">{comment.user.name}</span>
          <span className="post-comment-time">
            {comment.createdAt.substring(0, 10)}
          </span>
          <span className="post-comment-likes">{comment.likes.length}</span>
        </div>
        <div className="post-comment-content">
          {comment.content}
          {isLiked ? (
            <div className="flex-c">
              <div onClick={this.toggleLike}>
                <div className="liked">
                  <i class="fas fa-heart"></i>
                </div>
              </div>
              {isCommentedByUser && (
                <div className="deleteButton" onClick={this.deleteComment}>
                  <i class="fas fa-trash"></i>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-c">
              <div onClick={this.toggleLike}>
                <div className="unliked">
                  <i class="fas fa-heart"></i>
                </div>
              </div>
              {isCommentedByUser && (
                <div className="deleteButton" onClick={this.deleteComment}>
                  <i class="fas fa-trash"></i>
                </div>
              )}
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
export default connect(mapStateToProps)(Comment);
