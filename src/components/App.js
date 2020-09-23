import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { fetchPost } from '../actions/posts';
import { loginSuccess } from '../actions/auth';
import Navbar from './Navbar';
import Home from './Home';
import Page404 from './Page404';
import Login from './Login';
import Signup from './SignUp';
import jwt_decode from 'jwt-decode';
class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPost());
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      const user = jwt_decode(token);
      this.props.dispatch(loginSuccess(user));
    }
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
