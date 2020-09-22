import React from 'react';
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
  handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log(this.emailInputRef);
    // console.log(this.passwordInputRef.current.value);
    console.log(this.state);
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
    return (
      <form className="login-form">
        <span className="login-signup-header">Log In</span>
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
          <button onClick={this.handleFormSubmit}>Log In</button>
        </div>
      </form>
    );
  }
}

export default Login;
