/* global firebase:true */
import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoginContainer from './LoginContainer';
import ChatContainer from './ChatContainer';
import UserContainer from './UserContainer';
import NotificationResource from '../resources/NotificationResource';
import '../app.css';

class App extends Component {
  state = { user: null, messages: [], messagesLoaded: false };

  componentDidMount() {
    this.notifications = new NotificationResource(
      firebase.messaging(),
      firebase.database()
    );
    firebase.auth().onAuthStateChanged(user => {
      console.log(this.state.user);
      if (user) {
        this.setState({ user });
        this.listenForMessages();
        this.notifications.changeUser(user);
      } else {
        this.props.history.push('/login');
      }
    });
    firebase
      .database()
      .ref('/messages')
      .on('value', snapshot => {
        this.onMessage(snapshot);
        if (!this.state.messagesLoaded) {
          this.setState({ messagesLoaded: true });
        }
      });
  }
  onMessage = snapshot => {
    const messages = Object.keys(snapshot.val()).map(key => {
      const msg = snapshot.val()[key];
      msg.id = key;
      return msg;
    });
    this.setState({ messages });
  };
  listenForMessages = () => {
    firebase
      .database()
      .ref('/messages')
      .on('value', snapshot => {
        this.onMessage(snapshot);
        if (!this.state.messagesLoaded) {
          this.setState({ messagesLoaded: true });
        }
      });
  };

  handleSubmitMessage = msg => {
    const data = {
      msg,
      author: this.state.user.email,
      user_id: this.state.user.uid,
      timestamp: Date.now()
    };
    firebase
      .database()
      .ref('messages/')
      .push(data);
  };
  render() {
    return (
      <div id="container">
        <Route path="/login" component={LoginContainer} />
        <Route
          path="/users/:id"
          render={({ match }) => (
            <UserContainer
              messages={this.state.messages}
              messagesLoaded={this.state.messagesLoaded}
              userID={match.params.id}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <ChatContainer
              onSubmit={this.handleSubmitMessage}
              user={this.state.user}
              messagesLoaded={this.state.messagesLoaded}
              messages={this.state.messages}
            />
          )}
        />
      </div>
    );
  }
}

App.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func })
};
export default withRouter(App);
