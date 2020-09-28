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
  render() {
    const { comment, user } = this.props;
    const isLiked = comment.likes.includes(user._id);
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
          <div onClick={this.toggleLike}>
            {isLiked ? (
              <div className="liked">
                <i class="fas fa-heart"></i>
              </div>
            ) : (
              <div className="unliked">
                <i class="fas fa-heart"></i>
              </div>
            )}
          </div>
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
