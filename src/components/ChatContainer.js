/* global firebase:true */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Header from './Header';

class ChatContainter extends Component {
  state = { newMessage: '' };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate(previousProps) {
    if (previousProps.messages.length !== this.props.messages.length) {
      this.scrollToBottom();
    }
  }
  handleLogout = () => {
    firebase.auth().signOut();
  };
  handleInputChange = e => {
    this.setState({ newMessage: e.target.value });
  };
  handleSubmit = () => {
    this.props.onSubmit(this.state.newMessage);
    this.setState({ newMessage: '' });
  };
  handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleSubmit();
    }
  };
  scrollToBottom = () => {
    const messageContainer = ReactDOM.findDOMNode(this.messageContainer);
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  };
  render() {
    return (
      <div id="ChatContainer" className="inner-container">
        <Header>
          <button className="red" onClick={this.handleLogout}>
            Logout
          </button>
        </Header>
        {this.props.messagesLoaded ? (
          <div
            id="message-container"
            ref={element => {
              this.messageContainer = element;
            }}
          >
            {this.props.messages.map((msg, i) => (
              <div
                key={msg.id}
                className={`message ${this.props.user.email === msg.author &&
                  'mine'}`}
              >
                <p>{msg.msg}</p>
                {(!this.props.messages[i + 1] ||
                  this.props.messages[i + 1].author !== msg.author) && (
                  <p className="author">
                    <Link
                      to={`/users/${msg.user_id}`}
                      href={`/users/${msg.user_id}`}
                    >
                      {msg.author}
                    </Link>
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div id="loading-container">
            <img src="/assets/icon.png" alt="logo" id="loader" />
          </div>
        )}

        <div id="chat-input">
          <textarea
            placeholder="Add your message..."
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown}
            value={this.state.newMessage}
          />
          <button>
            <svg viewBox="0 0 24 24">
              <path fill="#424242" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
            </svg>
          </button>
        </div>
      </div>
    );
  }
}

ChatContainter.propTypes = {
  onSubmit: PropTypes.func,
  messagesLoaded: PropTypes.bool,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      msg: PropTypes.string,
      author: PropTypes.string
    })
  ),
  user: PropTypes.shape({ email: PropTypes.string })
};
export default ChatContainter;
