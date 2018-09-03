import React, { Component } from 'react';
import _ from 'lodash';
import $ from 'jquery';
import * as topojson from "topojson-client";
import * as d3 from 'd3';
// import england_gen from './../assets/mapdata/topo_eer.svg';
// import england_det_svg from './../assets/mapdata/topo_lad.svg';
import england_det_topojson from './../assets/mapdata/topo_lad.topojson';

class Map extends Component {
  constructor(props){
    super(props);

    this.state = {
      width: 0,
      height: 0,
      svg: {},
      projection: {},
      path: {},
      svg: {},
      features: {},
      color: {},
      zoom: {},
      tooltip: {}
    }
  }

  componentDidMount(){
    //Map dimensions (in pixels)
    var width = 498,
    height = 300;

    //Map projection
    var projection = d3.geoConicEqualArea()
    .scale(5261.64939607282)
    .center([-1.464219263856116,52.5612078903616]) //projection center
    .parallels([49.86474946193845,55.81107189401146]) //parallels for conic projection
    .rotate([1.464219263856116]) //rotation for conic projection
    .translate([223.73154180207496,329.68261055776594]) //translate to center the map in view

    //Generate paths based on projection
    var path = d3.geoPath()
    .projection(projection);

    //Create an SVG
    var svg = d3.select("#"+this.props.id).append("svg")
    .attr("width", width)
    .attr("height", height);

    //Group for the map features
    var features = svg.append("g")
    .attr("class","features");

    //Create choropleth scale
    var color = d3.scaleQuantize()
    .domain([0,1])
    .range(d3.range(5).map(function(i) { return "q" + i + "-5"; }));

    //Create zoom/pan listener
    //Change [1,Infinity] to adjust the min/max zoom scale
    var zoom = d3.zoom()
    .scaleExtent([1, Infinity])
    .on("zoom",this.zoomed);

    svg.call(zoom);

    //Create a tooltip, hidden at the start
    var tooltip = d3.select("#"+this.props.id).append("div").attr("class","tooltip");

    Promise.all([england_det_topojson]).then(this.ready);

    this.setState((prevState)=>{
      
      prevState.width = width;
      prevState.height = height;
      prevState.svg = svg;
      prevState.projection = projection;
      prevState.path = path;
      prevState.features = features;
      prevState.color = color;
      prevState.zoom = zoom;
      prevState.tooltip = tooltip;

      return prevState;
    });
  }

  ready(geodata) {
    console.log("geodata: ", geodata);
    //Create a path for each map feature in the data
    this.state.features.selectAll("path")
    .data(topojson.feature(geodata,geodata.objects.lad).features) //generate features from TopoJSON
    .enter()
    .append("path")
    .attr("d",this.state.path)
    .attr("class", function(d) { return (typeof this.color(d.properties.LAD13CD) == "string" ? this.color(d.properties.LAD13CD) : ""); })
    .on("mouseover",this.showTooltip)
    .on("mousemove",this.moveTooltip)
    .on("mouseout",this.hideTooltip)
    .on("click",this.clicked);

    }

    render() {

      return (
        <div className="map-component" id={this.props.id}>
        </div>
      );
  }
}
  export default Map;