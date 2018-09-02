import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Router } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory';
import Main from './containers/Main';
import './App.css';

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router history={history}>
          <Route path="/" component={Main} />
      </Router>
    );
  }
}

export default App;
