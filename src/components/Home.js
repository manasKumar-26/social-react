import React, { Component } from 'react';
import PostsList from './PostsList';
import Friend from './Friend';
import Chat from './Chat';
class Home extends Component {
  render() {
    return (
      <div className="home">
        <PostsList
          posts={this.props.posts}
          isLoggedIn={this.props.isLoggedIn}
        />
        {this.props.isLoggedIn && <Friend />}
        {this.props.isLoggedIn && <Chat />}
      </div>
    );
  }
}

export default Home;
