import React, { Component } from 'react';
import PostsList from './PostsList';
import Friend from './Friend';
class Home extends Component {
  render() {
    return (
      <div className="home">
        <PostsList
          posts={this.props.posts}
          isLoggedIn={this.props.isLoggedIn}
        />
        {this.props.isLoggedIn && <Friend />}
      </div>
    );
  }
}

export default Home;
