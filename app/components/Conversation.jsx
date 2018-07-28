import React from "react";
const ENTER_KEY = 13;

export default class Conversation extends React.Component {
  constructor(props) {
    super(props);
    this.messages = [];
    this.state = {
      messages: []
    }
    props.client.on('text', this.onClientText);
  }
  onClientText = (msg) => {
    msg.time = new Date(msg.dateTime);  
    this.messages.push(msg);
    this.setState({
      messages: this.messages
    });
  }
  static normalizeTime(time, now, locale = 'zh-CN') {
    const isToday = now.toDateString() === time.toDateString();
    return isToday ? time.toLocaleTimeString(locale) : `${time.toLocaleDateString(locale)} ${time.toLocaleTimeString(locale)}`;
  }
  onKeyDown = (e) => {
    if (e.which === ENTER_KEY && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      e.preventDefault();
      this.submit();
    }
  }
  submit() {
    this.props.client.message(this.inputEl.value);
    this.inputEl.value = '';
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.submit();
  }
  render(){
    return (
      <div className="pane padded-more l-chat">
        <ul className="list-group l-chat-conversation">
          {
            this.state.messages.map((msg, i) => {
            return (<li className="list-group-item" key={`${i}${msg}`}>
                <div className="media-body">
                  <time className="media-body-time">{Conversation.normalizeTime(msg.time, new Date())}</time>
                  <strong>{msg.userName}:</strong>
                  { msg.text.split('\n').map((line, index) => {
                    return <p key={line}>{line}</p>
                  }) }
                </div>
              </li>)
            })
          }
        </ul>
        <form className="l-chat-form" onSubmit={this.onSubmit}>
          <div className="form-group">
            <textarea onKeyDown={this.onKeyDown} ref={el => this.inputEl = el} required placeholder="Say something..." className="form-control"></textarea>
          </div>
          <div className="form-actions">
            <button className="btn btn-form btn-primary">OK</button>
          </div>
        </form>
      </div>
    );
  }
}
