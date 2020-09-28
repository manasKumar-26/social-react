import React, { Component } from 'react';
import Comment from './Comment';
class Comments extends Component {
  render() {
    const { comments, _id } = this.props.post;
    return (
      <React.Fragment>
        {comments.map((comment) => (
          <Comment comment={comment} postid={_id} />
        ))}
      </React.Fragment>
    );
  }
}

export default Comments;
