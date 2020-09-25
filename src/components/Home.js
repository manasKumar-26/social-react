import React, { Component } from 'react';
import PostsList from './PostsList';
import Friend from './Friend';
class Home extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="home">
        <PostsList posts={this.props.posts} />
        {this.props.isLoggedIn && <Friend />}
      </div>
    );
  }
}

export default Home;
