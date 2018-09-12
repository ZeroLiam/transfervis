import React, { Component } from 'react';
import LeftSidebar from './../components/LeftSidebar';
import Header from './../components/Header';
import World from './../components/World';
import Treemap from './../components/Treemap';
import TopTweets from './../components/TopTweets';

class Main extends Component {
  constructor(props){
    super(props);

    this.state = {
      activevistype: "diagram"
    }

    this.receivedType = this.receivedType.bind(this);
  }

  receivedType(typedata){
    
    this.setState((state) => {
        state.activevistype = typedata;

        return state;
     });
}

componentDidMount(){
  console.log(this.state.activevistype);
}

  render() {
    console.log(this.state.activevistype);
    let diag;
    if (this.state.activevistype === "world") {
      diag = <World id="_worldmap" width="900" height="530" events="true" />;
    } else {
      diag = <Treemap id="_treemap" />;
    }

    return (
      <div className="App">
        <LeftSidebar receiveActiveType={(...args)=>this.receivedType(...args)} />
        <Header />
        
        <div id="_viscontainer">
          {diag}
        </div>

        <TopTweets id="_tweetsContainer" maxTweets="20" minTweets="10" />
      
      </div>
    );
  }
}

export default Main;