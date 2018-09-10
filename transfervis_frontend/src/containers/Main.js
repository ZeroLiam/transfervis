import React, { Component } from 'react';
import LeftSidebar from './../components/LeftSidebar';
import Header from './../components/Header';
import WorldFinal from './../components/WorldFinal';

class Main extends Component {

  render() {
    return (
      <div className="App">
        <LeftSidebar />
        <Header />
        <WorldFinal id="_worldmap" width="900" height="530" events="true" />
      </div>
    );
  }
}

export default Main;