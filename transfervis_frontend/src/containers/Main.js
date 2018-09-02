import React, { Component } from 'react';
import SearchCard from './../components/SearchCard';
import _ from 'lodash';

class Main extends Component {
    constructor(props){
        super(props);

        this.state = {
            data: [
                {assetId: 0, title: "Position", alt:"position", data:["Goalkeeper", "Defender", "Midfielder", "Striker"]},
                {assetId: 1, title: "Chemistry Style", alt:"playstyles", data:["BASIC", "SNIPER", "FINISHER", "DEADEYE"]},
                {assetId: 2, title: "Nation", alt:"nation", data:["Argentina", "Brasil", "England", "Germany"]},
                {assetId: 3, title: "League", alt:"league", data:["Argentina Apertura", "Liga do Brasil", "Premier League", "Bundesliga"]},
                {assetId: 4, title: "Price", alt:"price", data:[0, 1000, 150, 1500]}
            ]
        }
    }

  render() {
      
    return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome to React</h1>
        </header>
        <div className="search-container">
            {_.map(this.state.data, (val, key)=>{
                return(
                    <SearchCard key={key} id={key} title={val.title} alt={val.alt} cardData={val} />
                );
            })}
        </div>
      </div>
    );
  }
}

export default Main;