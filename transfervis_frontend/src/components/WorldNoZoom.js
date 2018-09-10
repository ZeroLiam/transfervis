import React, { Component } from 'react';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from "react-simple-maps";
import { feature } from "topojson-client";
import $ from 'jquery';
import _ from 'lodash';
import ReactTooltip from "react-tooltip";
import topology from './../assets/mapdata/50m.json';
import geotweets from './../assets/mapdata/sampledata.json';
// const world = topojson.feature(topology, topology.objects.units);
const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
}

class WorldNoZoom extends Component {
  constructor() {
    super();
    this.state = {
      worldData: [],
      tweetData: [],
      tweetCoord: [],
      zoom: 1,
      center: [0,20],
      cursor: "grab"
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.onMapMouseDown = this.onMapMouseDown.bind(this);
    this.onMapMouseUp = this.onMapMouseUp.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleReset() {
    this.setState({
      center: [0,20],
      zoom: 1,
      cursor: "grab"
    })
  }


  handleClick(countryIndex) {
    console.log("Clicked on a country: ", this.state.worldData[countryIndex])
  }

  handleMarkerClick(markerIndex) {
    console.log("Marker: ", this.state.tweetData[markerIndex]["location"], this.state.tweetData[markerIndex]["created_at"])
  }

  onMapMouseDown(evt){
    this.setState((state)=>{
      return {cursor: "grabbing", mrkrs: null}
    })
  }

  onMapMouseUp(evt){
    this.setState((state)=>{
      return {cursor: "grab"}
    })
  }

  componentDidMount() {
    setTimeout(() => {
        ReactTooltip.rebuild()
      }, 100);

    var newgeotweets = _.map(geotweets, (tweet, key)=>{
      var lat = parseInt(tweet.latitude);
      var lon = parseInt(tweet.longitude);

      if(!isNaN(lat) && !isNaN(lon)){
        return tweet;
      }else{
        return;
      }
    });

    var cleanTweets = _.compact(newgeotweets);

    var markers = _.map(cleanTweets, (val, k)=>{
        return [val.longitude, val.latitude];
    });

    this.setState((state)=>{
      return {
        worldData: feature(topology, topology.objects.countries).features,
        tweetData: cleanTweets, tweetCoord: markers
      }
    });
  }

  render() {
    $("#svg").on("mousedown", this.onMapMouseDown);
    $("#svg").on("mouseup", this.onMapMouseUp);

  return (
    <div id="_mapWorld" className="world-component" style={wrapperStyles}>
        <ComposableMap
          projectionConfig={{
            scale: 205,
          }}
          width={980}
          height={551}
          style={{
            width: "100%",
            height: "auto",
            cursor: this.state.cursor
          }}
          >
          <ZoomableGroup center={[0,20]} disablePanning={false}>
            <Geographies geography={topology}>
              {(geographies, projection) => geographies.map((geography, i) => geography.id !== "ATA" && (
                <Geography
                  key={i}
                  geography={geography}
                  projection={projection}
                  
                />
              ))}
            </Geographies>
            <Markers>
              {
                _.map(this.state.tweetData, (tweet, i) => {
                    
                  return(
                    <Marker
                      key={i}
                      marker={{coordinates: [tweet.longitude, tweet.latitude]}}
                      onClick={(...args)=>this.handleMarkerClick(i)}
                      >
                      <circle
                        data-tip={tweet["screen_name"]}
                        cx={0}
                        cy={0}
                        r={6}
                        fill="#FF5722"
                        stroke="#DF3702"
                        style={{cursor: "pointer"}}
                      />
                    </Marker>
                  );
                })
              }
              </Markers>
          </ZoomableGroup>
        </ComposableMap>
        <ReactTooltip />
    </div>
  )
}
}
export default WorldNoZoom;