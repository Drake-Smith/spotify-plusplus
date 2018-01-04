import React, { Component } from 'react';
import logo from './../../logo.svg';
import Test  from 'components/Test/Test';
import './App.css';

import { extractParamsFromUrl } from 'helpers';

import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false,
      accessToken: '',
      expiresIn: 0
    }

    this.openLogin = this.openLogin.bind(this);
  }

  componentDidMount() {
    if (window.location.href.indexOf('callback#access_token') > 0) {

      const urlParams = extractParamsFromUrl();
      console.log('url Params', urlParams);

      this.setState({
        loggedIn: true,
        accessToken: urlParams.access_token,
        expiresIn: urlParams.expires_in
      });
    }
  }

  openLogin() {
    window.location = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&redirect_uri=http:%2F%2Flocalhost:3000%2Fcallback&scope=user-read-private`;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Spotify++</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {this.state.loggedIn ? <h1>Logged into Spotify!</h1> : <a onClick={this.openLogin}>Login to Spotify</a>}
        <p>Access Token: {this.state.accessToken}</p>
        <p>Expires In: {this.state.expiresIn}</p>
        <Test />
      </div>
    );
  }
}

export default App;
