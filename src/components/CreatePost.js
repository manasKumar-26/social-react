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
    return (
      <div className="create-post">
        <textarea
          className="add-post"
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
function mapStateToProps({ posts }) {
  return {
    posts,
  };
}
export default connect(mapStateToProps)(CreatePost);
