import React, { Component } from 'react';
import { geoMercator, geoPath } from "d3-geo";
import * as d3 from 'd3';
import { feature } from "topojson-client";
import $ from 'jquery';
import _ from 'lodash';
import topology from './../assets/mapdata/110m.json';
import geotweets from './../assets/mapdata/sampledata.json';
// const world = topojson.feature(topology, topology.objects.units);

class World extends Component {
  constructor() {
    super();
    this.state = {
      worldData: [],
      tweetData: [],
      zoom: d3.zoom(),
      drag: d3.drag(),
      map: {},
      svg: {},
      mapZoom: {}
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleZoomIn = this.handleZoomIn.bind(this);
    this.handleZoomOut = this.handleZoomOut.bind(this);
    this.onMapMouseWheel = this.onMapMouseWheel.bind(this);
    this.zoomed = this.zoomed.bind(this);
  }

  handleClick(countryIndex) {
    console.log("Clicked on a country: ", this.state.worldData[countryIndex])
  }

  handleMarkerClick(markerIndex) {
    console.log("Marker: ", this.state.tweetData[markerIndex]["name"], this.state.tweetData[markerIndex]["created_at"])
  }

  onMapMouseWheel(evt){
      let mousezoom = evt.deltaY;
      if(mousezoom > 0){
          this.handleZoomOut();
      }else{
          this.handleZoomIn();
      }
  }

  zoomed(evt) {
    this.state.map.attr("transform", d3.event.transform);
  }

  projection() {
    return geoMercator()
      .scale(100)
      .translate([ this.props.width / 2, this.props.height / 2 ])
  }

  handleZoomIn() {
    // this.setState({
    //     zoom: this.state.zoom / 0.5,
    // });
    this.state.mapZoom.scaleBy(this.state.svg.transition().duration(500), 1.1);
  }

  handleZoomOut() {
      // this.setState({
      //     zoom: this.state.zoom * 0.5,
      // });
      this.state.mapZoom.scaleBy(this.state.svg.transition().duration(500), 0.9);
  }

  componentDidMount() {
    console.log(topology);
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

    this.setState((state)=>{
      return {
        worldData: feature(topology, topology.objects.countries).features,
        tweetData: cleanTweets,
        map: d3.selectAll("#_world"),
        svg: d3.select("#_mapWorld"),
        mapZoom: d3.zoom().on("zoom", this.zoomed)
      }
    });
  }

  render() {
    console.log(this.state.tweetData);
    // this.state.map.call(d3.zoom().on("zoom", this.zoomed));

  return (
    <div id="_mapWorld" className="world-component">
     
      <svg id="_world" width={ this.props.width } height={ this.props.height } viewBox={ "0 0 " + (this.props.width) + " " + (this.props.height) }>
      <g className="countries" id="_countries">
          {
            this.state.worldData.map((d,i) => (
              <path
                key={ `path-${ i }` }
                d={ geoPath().projection(this.projection())(d) }
                className="country"
                onClick={ () => this.handleClick(i) }
              />
            ))
          }
        </g>
        <g className="markers">
          {
            _.map(this.state.tweetData, (place, i) => (
                <circle
                  key={ `marker-${i}` }
                  cx={ this.projection()([place.longitude, place.latitude])[0] }
                  cy={ this.projection()([place.longitude, place.latitude])[1] }
                  r={ (place.retweet_count / 2000)}
                  fill="#E91E6344"
                  className="marker"
                  onClick={ () => this.handleMarkerClick(i) }
                />
            ))
          }
        </g>
      </svg>
    </div>
  )
}
}
export default World;