import React from 'react';
import PropTypes from 'prop-types';
import ChatPane from '../components/ChatPane.jsx';
import Welcome from '../components/Welcome.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Client from '../service/Client.js';
import Server from '../service/server.js';

const HOST = '127.0.0.1';
const PORT = 8081;

export default class App extends React.Component {
  constructor() {
    super();
    this.client = new Client();
    this.server = new Server();
    this.server.connect(HOST, PORT, this.client);
    this.state = {
      name: ''
    };
  }

  onNameChange = (userName) => {
    this.setState({ name: userName });
    this.client.join(userName);
  }
  
  render() {
    const { name } = this.state;
    const client = this.client;
    return (
      <div className="window">
        <Header />
        <div className="window-content">
          { name ? <ChatPane client={client} /> : <Welcome onNameChange={this.onNameChange}/> }
        </div>
        <Footer />
      </div>
    );
  }
}


