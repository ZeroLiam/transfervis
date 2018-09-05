import React, { Component } from 'react';
import Map from './../components/Map';
import _ from 'lodash';

class Main extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome to React</h1>
        </header>
        <Map width="498" height="600" events="false" />
      </div>
    );
  }
}

export default Main;