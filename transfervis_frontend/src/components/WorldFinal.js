import React, { Component } from 'react';
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
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
      translation: [0,0]
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
    var base = this.state.scaleval, propw = this.state.scaleval + ((this.state.wval * 100) / this.state.scaleval), proph = this.state.scaleval + ((this.state.hval * 100) / this.state.scaleval);

    return geoMercator()
      .scale(base)
      .translate([ propw / 2, proph / 2 ])
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

      this.setState((state) => {
          
          return {maptaken: true, center: [deltaX, deltaY]}
        });
  }

  onMapRelease(evt){
    var deltaX = evt.pageX;
    var deltaY = evt.pageY;

      this.setState((state) => {
          return {maptaken: false, startMove: 0, center: [deltaX, deltaY]}
        });
  }

  onMapMove(evt){
    var deltaX = evt.pageX;
    var deltaY = evt.pageY;
      var enabledZoom = this.state.zoom > 1;

      if(this.state.maptaken){
          this.setState((state)=>{
              return {startMove: state.startMove + 1}
          });

          if(this.state.startMove > 1 && enabledZoom){
              var mouseDiffX = (this.state.center[0] - deltaX) * this.state.zoom;
              var mouseDiffY = (this.state.center[1] - deltaY) * this.state.zoom;

              this.setState((state) => {
                  
                  return {translation: [-1 * mouseDiffX, -1 * mouseDiffY]}
                });
          }
          
      }
  }

  handleReset(evt) {
      this.setState((state)=>{
         return {zoom: 1, scaleval: 120, wval: 720, hval: 530}
      });
  }

  handleZoomIn(evt) {
      this.setState((state)=>{
        var newzoom = state.zoom + 0.5;

        if(newzoom > 3){
          newzoom = 3;
        }
          return {zoom: newzoom, scaleval: state.scaleval + newzoom}
      });
  }

  handleZoomOut(evt) {
      this.setState((state)=>{
        var newzoom = state.zoom - 0.5;

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
      var lat = parseInt(tweet.latitude);
      var lon = parseInt(tweet.longitude);
      
      if(!isNaN(lat) && !isNaN(lon)){
        return tweet;
      }
    });

    var cleanTweets = _.compact(newgeotweets);

      this.setState({
        worldData: feature(wd, wd.objects.countries).features, tweetData: cleanTweets
      })
  }

  componentDidUpdate(prevProps, prevState){
    setTimeout(() => {
      ReactTooltip.rebuild()
    }, 100);
  }

  render() {
    
    var zoomStyle = {
        transform: 'scale(' + this.state.zoom + ') translate(' + this.state.translation[0] + 'px, ' + this.state.translation[1] + 'px)',
        transition: "all 0.3 ease-in"
    }

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

      <svg id="_mapWorldSVG" onWheel={(...args)=> this.onMapMouseWheel(...args)} 
    onMouseDown={(...args)=> this.onMapTaken(...args)}
    onMouseUp={(...args)=> this.onMapRelease(...args)}
    onMouseMove={(...args)=> this.onMapMove(...args)}
          width={ this.state.wval } height={ this.state.hval } viewBox={"0 0 " + this.state.wval + " " + this.state.hval}>
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