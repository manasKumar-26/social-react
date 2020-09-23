import React, { Component } from 'react';
import { signup } from '../actions/auth';
class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      password: '',
      confirm_password: '',
    };
  }
  handleName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  handleEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  handlepassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  handleReenterPassword = (e) => {
    this.setState({
      confirm_password: e.target.value,
    });
  };
  handleFormubmit = (e) => {
    e.preventDefault();
    const { email, name, password, confirm_password } = this.state;
    signup(email, name, password, confirm_password);
  };
  render() {
    return (
      <form className="login-form">
        <span className="login-signup-header">Sign Up As A New User</span>
        <div className="field">
          <input
            type="text"
            placeholder="Enter Your Display Name"
            onChange={this.handleName}
          />
        </div>
        <div className="field">
          <input
            type="email"
            placeholder="Enter Your Registered Email Id"
            onChange={this.handleEmail}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Enter Your Password"
            onChange={this.handlepassword}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Re-Enter Your Password"
            onChange={this.handleReenterPassword}
          />
        </div>
        <div className="field">
          <button onClick={this.handleFormubmit}>Sign Up</button>
        </div>
      </form>
    );
  }
}

export default SignUp;
