import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { fetchPost } from '../actions/posts';
import { loginSuccess } from '../actions/auth';
import Navbar from './Navbar';
import Home from './Home';
import Page404 from './Page404';
import Login from './Login';
import Signup from './SignUp';
import Setting from './Setting';
import User from './User';
import jwt_decode from 'jwt-decode';
const PrivateRoute = (pvtRouteProps) => {
  const { isLoggedIn, path, component: Component } = pvtRouteProps;
  return (
    <Route
      path={path}
      render={(props) => {
        return isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};
class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPost());
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwt_decode(token);
      this.props.dispatch(loginSuccess(user));
    }
  }
  render() {
    const { posts, auth } = this.props;
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
            <PrivateRoute
              path="/settings"
              component={Setting}
              isLoggedIn={auth.isLoggedIn}
            />
            <PrivateRoute
              path="/user/:userid"
              component={User}
              isLoggedIn={auth.isLoggedIn}
            />
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
    auth: state.auth,
  };
}
const newAppComp = connect(mapStateToProps)(App);
export default newAppComp;
