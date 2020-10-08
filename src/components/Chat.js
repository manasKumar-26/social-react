import React, { Component } from 'react';
import '../chat.css';
import { connect } from 'react-redux';
import io from 'socket.io-client';
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [], // {content: 'some message', self: true}
      typedMessage: '',
    };
    this.socket = io.connect('http://54.237.158.65:5000');
    this.userEmail = props.user.email;
    if (this.userEmail) {
      this.setUpConnections();
    }
  }
  setUpConnections = () => {
    this.socket.on('connect', () => {
      console.log('connected');
      this.socket.emit('join_room', {
        user_email: this.userEmail,
        chatroom: 'codeial',
      });
      this.socket.on('user_joined', () => {
        console.log('successfully joined');
      });
    });
    this.socket.on('receive_message', (data) => {
      const { messages } = this.state;
      const messageObj = {};
      messageObj.content = data.message;
      if (data.user_email === this.userEmail) {
        messageObj.self = true;
      }
      this.setState({
        messages: [...messages, messageObj],
      }, () => {
        this.handleScroll()
      });
    });
  };
  handleSubmit = () => {
    const { typedMessage } = this.state;
    if (typedMessage && this.userEmail) {
      this.setState(
        {
          typedMessage: '',
        },
        () => {
          this.socket.emit('send_message', {
            message: typedMessage,
            user_email: this.userEmail,
            chatroom: 'codeial',
          });
        }
      );
    }
  };
  handleScroll = () => {
    document.getElementsByClassName('chat-messages')[0].scrollTop = document.getElementsByClassName('chat-messages')[0].scrollHeight
  }
  render() {
    const { typedMessage, messages } = this.state;
    console.log(messages);
    return (
      <div className="chat-container">
        <div className="chat-header">
          ChatBot
          <div>
            <i class="fa fa-minus"></i>
          </div>
        </div>
        <div className="chat-messages">
          {messages.map((message) => (
            <div
              className={
                message.self
                  ? 'chat-bubble self-chat'
                  : 'chat-bubble other-chat'
              }
            >
              {message.content}
            </div>
          ))}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={typedMessage}
            onChange={(e) => this.setState({ typedMessage: e.target.value })}
          />
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  };
}
export default connect(mapStateToProps)(Chat);
