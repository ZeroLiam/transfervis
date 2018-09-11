import React, { Component } from 'react';
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import $ from 'jquery';
import _ from 'lodash';
import ReactTooltip from 'react-tooltip';
import wd from './../assets/mapdata/50m.json';
import geotweets from './../assets/mapdata/sampledata2.json';

class WorldFinal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      worldData: [],
      tweetData: [],
      tweetCoord: [],
      zoom: 1,
      scaleval: 120,//100%
      wval: 720,//600 -> scaleval + ((wval * 100) / scaleval)
      hval: 530,//442 -> scaleval + ((hval * 100) / scaleval)
      center: [0,20],
      panning: true,
      startMove: 0,
      maptaken: false,
      translation: [360, 265],
      past: [0,0],
      released: false
    };

    this.handleCountryClick = this.handleCountryClick.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleZoomIn = this.handleZoomIn.bind(this);
    this.handleZoomOut = this.handleZoomOut.bind(this);
    this.onMapMouseWheel = this.onMapMouseWheel.bind(this);
    this.onMapTaken = this.onMapTaken.bind(this);
    this.onMapRelease = this.onMapRelease.bind(this);
    this.onMapMove = this.onMapMove.bind(this);
  }

  projection() {
    var base = this.state.scaleval; 
    // var propw = this.state.scaleval + ((this.state.wval * 100) / this.state.scaleval), proph = this.state.scaleval + ((this.state.hval * 100) / this.state.scaleval);

    return geoMercator()
      .scale(base)
      .translate([this.state.translation[0], this.state.translation[1]])
      // .translate([ propw / 2, proph / 2 ])
  }
  handleCountryClick(countryIndex) {
    console.log("Clicked on country: ", this.state.worldData[countryIndex])
  }
  handleMarkerClick(markerIndex) {
    console.log("Marker: ", this.state.tweetData[markerIndex]["screen_name"])
  }

  onMapMouseWheel(evt){
    var mousezoom = evt.deltaY;

      if(mousezoom > 0){
          this.handleZoomOut();
      }else{
          this.handleZoomIn();
      }
  }

  onMapTaken(evt){
    var deltaX = evt.pageX;
    var deltaY = evt.pageY;
    var offset = $("#_mapWorldSVG").offset();
    var divPos = {
        x: deltaX - offset.left,
        y: deltaY - offset.top
    };

      this.setState((state) => {
        var newtrans = [state.translation[0] - divPos.x, state.translation[1] - divPos.y];

        var updatePos = state.released ? state.translation : newtrans;

          return {maptaken: true, translation: [divPos.x, divPos.y], past:[divPos.x, divPos.y]}
      });
  }

  onMapRelease(evt){

      this.setState((state) => {
          return {maptaken: false, startMove: 0, translation: state.translation, released: true}
        });
  }

  onMapMove(evt){
    var deltaX = evt.pageX;
    var deltaY = evt.pageY;
    var offset = $("#_mapWorldSVG").offset();
    var divPos = {
        x: deltaX - offset.left,
        y: deltaY - offset.top
    };

    console.log("from svg: ", offset);
    console.log("from mouse diff: ", divPos);
    console.log("from translation: ", this.state.translation);

      var enabledZoom = this.state.zoom > 1;

      if(this.state.maptaken){
          this.setState((state)=>{
              return {startMove: state.startMove + 1}
          });

          if(this.state.startMove > 1 && enabledZoom){
              // var mouseDiffX = (this.state.center[0] - deltaX);
              // var mouseDiffY = (this.state.center[1] - deltaY);

              this.setState((state) => {
                  return {translation: [360 + (divPos.x), 265 + (divPos.y)], center: divPos}
              });
          }
          
      }
  }

  handleReset(evt) {
      this.setState((state)=>{
         return {zoom: 1, scaleval: 120, wval: 720, hval: 530, translation: [360,265]}
      });
  }

  handleZoomIn(evt) {
      this.setState((state)=>{
        var newzoom = state.zoom + 25;

        if(newzoom > 200){
          newzoom = 200;
        }
          return {zoom: newzoom, scaleval: state.scaleval + newzoom}
      });
  }

  handleZoomOut(evt) {
      this.setState((state)=>{
        var newzoom = state.zoom - 25;

        if(newzoom < 0.8){
          newzoom = 0.8;
        }

        return {zoom: newzoom, scaleval: state.scaleval + newzoom}
      });
  }

  componentDidMount() {
    setTimeout(() => {
        ReactTooltip.rebuild()
      }, 100);

    var newgeotweets = _.map(geotweets, (tweet, key)=>{
      var lat = parseFloat(tweet.latitude);
      var lon = parseFloat(tweet.longitude);
      
      if(!isNaN(lat) && !isNaN(lon)){
        return tweet;
      }
    });

    var cleanTweets = _.compact(newgeotweets);

      this.setState({
        worldData: feature(wd, wd.objects.countries).features, tweetData: cleanTweets,
        translation: [360, 265]
      })
  }

  componentDidUpdate(prevProps, prevState){
    setTimeout(() => {
      ReactTooltip.rebuild()
    }, 100);
  }

  render() {

  return (
    <div id="_mapWorld" className="world-component">
    <div className="zoomcontrol-component">
        <div className="zoom-symbol btn" onClick={(...args)=> this.handleZoomIn(...args)}>
          { "+" }
        </div>
        <div className="zoom-symbol btn" onClick={(...args)=> this.handleZoomOut(...args)}>
          { "-" }
        </div>
        <div className="zoom-symbol btn" onClick={this.handleReset}>
          { "Reset" }
        </div>
      
      </div>

      <svg id="_mapWorldSVG"
      width={ this.state.wval }
      height={ this.state.hval }
      viewBox={"0 0 " + this.state.wval + " " + this.state.hval}
      onMouseDown={(...args)=>this.onMapTaken(...args)}
      onMouseUp={(...args)=>this.onMapRelease(...args)}
      onMouseMove={(...args)=>this.onMapMove(...args)}
      onWheel={(...args)=>this.onMapMouseWheel(...args)}
      >

        <g className="countries">
          {
            this.state.worldData.map((d,i) => (
              <path
                key={ `path-${ i }` }
                d={ geoPath().projection(this.projection())(d) }
                className="country"
                fill={ `rgba(38,50,56,${ 1 / this.state.worldData.length * i})` }
                stroke="#FFFFFF"
                strokeWidth={ 0.5 }
                onClick={ () => this.handleCountryClick(i) }
              />
            ))
          }
        </g>
        <g className="markers">
          {
            this.state.tweetData.map((tweet, i) => {
              if(!isNaN(tweet.latitude) && !isNaN(tweet.longitude)){
                var coord = [parseFloat(tweet.longitude),  parseFloat(tweet.latitude)];
                var tooltipval = tweet.screen_name;

                return(
                  <circle
                  data-tip={ tooltipval }
                  key={ `marker-${i}` }
                  cx={ this.projection()(coord)[0] }
                  cy={ this.projection()(coord)[1] }
                  r={ 6 }
                  fill="#E91E6344"
                  className="marker"
                  style={{
                    cursor: "default"
                  }}
                  onClick={ () => this.handleMarkerClick(i) }
                />
                )
              }
              return null;
            })
          }
        </g>
      </svg>
      <ReactTooltip />
    </div>
  )
}
}
export default WorldFinal;