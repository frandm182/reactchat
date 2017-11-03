import React, { Component } from 'react';
import Header from './Header';

class LoginContainer extends Component {
  state = { email: '', password: '' };
  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value });
  };
  handlePasswordChange = ({ target }) => {
    this.setState({ password: target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
  };
  render() {
    return (
      <div id="LoginContainer" className="inner-container">
        <Header />
        <form onSubmit={this.handleSubmit}>
          <p>Sign in or sign up by entering your email and password.</p>
          <input
            type="text"
            onChange={this.handleEmailChange}
            value={this.state.email}
            placeholder="Your email"
          />

          <input
            type="password"
            onChange={this.handlePasswordChange}
            value={this.state.password}
            placeholder="Your password"
          />
          <button className="red light" type="submit">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginContainer;
