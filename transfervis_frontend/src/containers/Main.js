import React, { Component } from 'react';
import LeftSidebar from './../components/LeftSidebar';

class Main extends Component {

  render() {
    return (
      <div className="App">
        <LeftSidebar />
        <header className="App-header">
          <h1 className="app-title">Twitter Premier League</h1>
        </header>

        
      </div>
    );
  }
}

export default Main;