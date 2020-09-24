import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { clearAuth, login } from '../actions/auth';
class Login extends React.Component {
  //   constructor() {
  //     super();
  //     this.emailInputRef = React.createRef();
  //     this.passwordInputRef = React.createRef();
  //   }
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }
  componentWillUnmount() {
    this.props.dispatch(clearAuth());
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log(this.emailInputRef);
    // console.log(this.passwordInputRef.current.value);
    const { email, password } = this.state;
    this.props.dispatch(login(email, password));
  };
  handleEmailState = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  handlePasswordState = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  render() {
    const { inProgress, error, isLoggedIn } = this.props.auth;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    console.log(this.props);
    if (isLoggedIn) {
      return <Redirect to={from} />;
    }
    return (
      <form className="login-form">
        <span className="login-signup-header">Log In</span>
        {error && <div className="alert error-dailog">{error}</div>}
        <div className="field">
          <input
            type="email"
            placeholder="Enter Your Registered Email Id"
            required
            // ref={this.emailInputRef}
            onChange={this.handleEmailState}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Enter Your Password"
            // ref={this.passwordInputRef}
            onChange={this.handlePasswordState}
          />
        </div>
        <div className="field">
          {inProgress ? (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Logging In
            </button>
          ) : (
            <button onClick={this.handleFormSubmit}>Log In</button>
          )}
        </div>
      </form>
    );
  }
}
function mapStatetoProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStatetoProps)(Login);
