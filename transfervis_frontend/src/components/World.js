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
import geotweets from './../assets/mapdata/sampledata2.json';
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
      panning: true,
      mapgrab: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleZoomIn = this.handleZoomIn.bind(this);
    this.handleZoomOut = this.handleZoomOut.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  handleMouseDown(){
    this.setState((state)=>{
      return {mapgrab: true}
    })
  }

  handleMouseUp(){
    this.setState((state)=>{
      return {mapgrab: false}
    })
  }

  handleMove(evt){

    evt.preventDefault();
    var deltaX = evt.originalEvent.pageX;
    var deltaY = evt.originalEvent.pageY;

    if(this.state.panning && this.state.mapgrab){
      var mouseDiffX = (this.state.center[0] - deltaX) / 10;
      var mouseDiffY = (this.state.center[1] - deltaY)/10;
      this.setState((state)=>{
        return {center: [mouseDiffY, mouseDiffX]}
      })
    }
  }

  handleReset() {
    this.setState({
      center: [0,20],
      zoom: 1,
      panning: false
    })
  }

  handleZoomIn() {
    var newzoom = this.state.zoom * 2;
    var pan = true;

    if(newzoom > 4){
      newzoom = 4;
    }

    this.setState((state)=>{
      return {zoom: newzoom, panning: pan}
    })
  }

  handleZoomOut() {
    var newzoom = this.state.zoom / 2;
    var pan = true;

    if(newzoom < 1){
      newzoom = 1;
    }

    this.setState((state)=>{
      return {zoom: newzoom, panning: pan}
    })
  }


  handleClick(countryIndex) {
    console.log("Clicked on a country: ", this.state.worldData[countryIndex])
  }

  handleMarkerClick(markerIndex) {
    console.log("Marker: ", this.state.tweetData[markerIndex]["location"], this.state.tweetData[markerIndex]["created_at"])
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
        tweetData: cleanTweets, tweetCoord: markers, panning: false
      }
    });
  }

  render() {
    // $("svg").on("mousemove", this.handleMove);
    // $("svg").on("mousedown", this.handleMouseDown);
    // $("svg").on("mouseup", this.handleMouseUp);

  return (
    <div id="_mapWorld" className="world-component" style={wrapperStyles}>
      <div className="zoomcontrol-component">
        <div className="zoom-symbol btn" onClick={this.handleZoomIn}>
          { "+" }
        </div>
        <div className="zoom-symbol btn" onClick={this.handleZoomOut}>
          { "-" }
        </div>
        <div className="zoom-symbol btn" onClick={this.handleReset}>
          { "Reset" }
        </div>
      
      </div>

        <ComposableMap
            projectionConfig={{
              scale: 205,
            }}
            width={980}
            height={551}
            style={{
              width: "100%",
              height: "auto",
            }}
            >
            <ZoomableGroup center={this.state.center} zoom={this.state.zoom}>
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
                        fill="#E91E6344"
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