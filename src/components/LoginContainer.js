/* global firebase:true */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

class LoginContainer extends Component {
  state = { email: '', password: '', error: '' };

  onLogin() {
    this.props.history.push('/');
  }
  login() {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.onLogin();
      })
      .catch(err => {
        if (err.code === 'auth/user-not-found') {
          this.signup();
        } else {
          this.setState({ error: 'Error logging in.' });
        }
      });
  }
  signup() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: 'Error signing up.' });
      });
  }
  handleSubmit = event => {
    event.preventDefault();
    this.setState({ error: '' });
    if (this.state.email && this.state.password) {
      this.login();
    } else {
      this.setState({ error: 'Please fill in both fields.' });
    }
  };
  handlePasswordChange = ({ target }) => {
    this.setState({ password: target.value });
  };
  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value });
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
          <p className="error">{this.state.error}</p>
          <button className="red light" type="submit">
            Login
          </button>
        </form>
      </div>
    );
  }
}

LoginContainer.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func })
};

export default LoginContainer;
