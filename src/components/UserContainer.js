import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Header from './Header';

class UserContainer extends Component {
  getAuthor = author => {
    if (!this.renderedUserEmail) {
      this.renderedUserEmail = true;
      return <p className="author">{author}</p>;
    }
    return null;
  };
  renderedUserEmail = false;
  render() {
    return (
      <div id="UserContainer" className="inner-container">
        <Header>
          <Link to="/" href="/">
            <button className="red">Back To Chat</button>
          </Link>
        </Header>
        {this.props.messagesLoaded ? (
          <div id="message-container">
            {this.props.messages.map(
              msg =>
                msg.user_id === this.props.userID && (
                  <div key={msg.id} className="message">
                    {this.getAuthor(msg.author)}
                    <p>{msg.msg}</p>
                  </div>
                )
            )}
          </div>
        ) : (
          <div id="loading-container">
            <img src="/assets/icon.png" alt="logo" id="loader" />
            &lt;
          </div>
        )}
      </div>
    );
  }
}

UserContainer.propTypes = {
  messagesLoaded: PropTypes.bool,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      msg: PropTypes.string,
      author: PropTypes.string
    })
  ),
  userID: PropTypes.string
};
export default UserContainer;
