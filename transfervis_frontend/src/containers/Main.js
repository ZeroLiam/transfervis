import React, { Component } from 'react';
import LeftSidebar from './../components/LeftSidebar';
import Header from './../components/Header';

class Main extends Component {

  render() {
    return (
      <div className="App">
        <LeftSidebar />
        <Header />
      </div>
    );
  }
}

export default Main;