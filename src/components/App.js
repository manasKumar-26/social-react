import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { fetchPost } from '../actions/posts';
import Navbar from './Navbar';
import Home from './Home';
import Page404 from './Page404';
import Login from './Login';
import Signup from './SignUp';
class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPost());
  }
  render() {
    const { posts } = this.props;
    console.log(posts);
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => {
                return <Home posts={posts} {...props} />;
              }}
            />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Signup} />
            <Route component={Page404} />
          </Switch>
        </div>
      </Router>
    );
  }
}
function mapStateToProps(state) {
  return {
    posts: state.posts.posts,
  };
}
const newAppComp = connect(mapStateToProps)(App);
export default newAppComp;
