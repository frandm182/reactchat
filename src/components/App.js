/* global firebase:true */
import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoginContainer from './LoginContainer';
import ChatContainer from './ChatContainer';
import '../app.css';

class App extends Component {
  state = { user: null };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      console.log(this.state.user);
      if (user) {
        this.setState({ user });
      } else {
        this.props.history.push('/login');
      }
    });
  }

  render() {
    return (
      <div id="container">
        <Route exact path="/login" component={LoginContainer} />
        <Route exact path="/" component={ChatContainer} />
      </div>
    );
  }
}

App.propTypes = {
  history: PropTypes.arrayOf(PropTypes.string)
};
export default withRouter(App);
