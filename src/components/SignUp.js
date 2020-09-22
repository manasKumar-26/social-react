import React, { Component } from 'react';

class SignUp extends Component {
  render() {
    return (
      <form className="login-form">
        <span className="login-signup-header">Sign Up As A New User</span>
        <div className="field">
          <input type="text" placeholder="Enter Your Display Name" />
        </div>
        <div className="field">
          <input type="email" placeholder="Enter Your Registered Email Id" />
        </div>
        <div className="field">
          <input type="password" placeholder="Enter Your Password" />
        </div>
        <div className="field">
          <input type="password" placeholder="Re-Enter Your Password" />
        </div>
        <div className="field">
          <button>Sign Up</button>
        </div>
      </form>
    );
  }
}

export default SignUp;
