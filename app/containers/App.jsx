import React from 'react';
import PropTypes from 'prop-types';
import ChatPane from '../components/ChatPane.jsx';
import Welcome from '../components/Welcome.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

export default class App extends React.Component {
  render() {
    const name = 'Name';
    return (
      <div className="window">
        <Header></Header>
        <div className="window-content">
          { name ? <ChatPane /> : <Welcome /> }
        </div>
        <Footer></Footer>
      </div>
    );
  }
}


