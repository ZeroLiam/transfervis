import React, { Component } from 'react';
import LeftSidebar from './../components/LeftSidebar';
import Header from './../components/Header';
import World from './../components/World';
import Treemap from './../components/Treemap';
import TopTweets from './../components/TopTweets';
import geotweets from './../assets/mapdata/sampledata2.json';

class Main extends Component {
  constructor(props){
    super(props);

    this.state = {
      activevistype: "diagram",
      activeteam: 1
    }

    this.receivedType = this.receivedType.bind(this);
    this.getTeamData = this.getTeamData.bind(this);
  }

  getTeamData(team){
    console.log(team);
    this.setState({activeteam: parseInt(team)});
  }

  receivedType(typedata){
    
    this.setState((state) => {
        state.activevistype = typedata;

        return state;
     });
}

componentDidMount(){
  console.log(this.state.activevistype);
  console.log(this.state.activeteam);
  
}

  render() {
    let teamjson = geotweets;
    let diag;
    if (this.state.activevistype === "world") {
      diag = <World team={teamjson} id="_worldmap" width="900" height="530" events="true" />;
    } else {
      diag = <Treemap id="_treemap" />;
    }

    return (
      <div className="App">
        <LeftSidebar receiveActiveType={(...args)=>this.receivedType(...args)} />
        <Header receiveTeam={(...args)=>this.getTeamData(...args)} />
        
        <div id="_viscontainer">
          {diag}
        </div>

        <TopTweets team={teamjson} id="_tweetsContainer" maxTweets="20" minTweets="10" />
      
      </div>
    );
  }
}

export default Main;