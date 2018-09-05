import React, { Component } from 'react';
import Map from './../components/Map';

class Main extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Twitter Premier League</h1>
        </header>
        <Map width="600" height="600" events="false" />
      </div>
    );
  }
}

export default Main;