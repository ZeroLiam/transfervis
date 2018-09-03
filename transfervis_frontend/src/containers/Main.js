import React, { Component } from 'react';
import Map from './../components/Map';
import _ from 'lodash';

class Main extends Component {

  render() {
      
    return (
      <div className="App">
        <header className="App-header">
          <h1>Twitter Premier League</h1>
        </header>

        <div id="map_container">
          <Map id="main_england" />
        </div>
        
      </div>
    );
  }
}

export default Main;