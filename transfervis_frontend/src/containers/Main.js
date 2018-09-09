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
        <World id="_worldmap" width="560" height="370" events="true" />
      </div>
    );
  }
}

export default Main;