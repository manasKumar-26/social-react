import React from 'react';
import { connect } from 'react-redux';
import { createPost } from '../actions/posts';
class CreatePost extends React.Component {
  constructor() {
    super();
    this.state = {
      content: '',
    };
  }
  handleNewPost = (e) => {
    this.setState({
      content: e.target.value,
    });
  };
  newPost = () => {
    this.props.dispatch(createPost(this.state.content));
    this.setState({
      content: '',
    });
  };
  render() {
    const { inProgress } = this.props.posts;
    const { user } = this.props.auth;
    return (
      <div className="create-post">
        <textarea
          className="add-post"
          placeholder={`What's on your mind ? ${user.name} !`}
          value={this.state.content}
          onChange={this.handleNewPost}
        />
        <div>
          <button id="add-post-btn" onClick={this.newPost}>
            Post
          </button>
        </div>
        {inProgress && <div className="alert success-dailog">Posting..</div>}
      </div>
    );
  }
}
function mapStateToProps({ posts, auth }) {
  return {
    posts,
    auth,
  };
}
export default connect(mapStateToProps)(CreatePost);
