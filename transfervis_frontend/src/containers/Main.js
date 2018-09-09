import React, { Component } from 'react';
import LeftSidebar from './../components/LeftSidebar';
import Header from './../components/Header';
import World from './../components/World';

class Main extends Component {

  render() {
    return (
      <div className="App">
        <LeftSidebar />
        <Header />
        <World id="_worldmap" width="800" height="480" events="true" />
      </div>
    );
  }
}

export default Main;