import React, { Component } from 'react';
import _ from 'lodash';
import $ from 'jquery';
import { get } from 'axios';
import { feature } from 'topojson-client';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from "react-simple-maps"
import { scaleLinear } from 'd3-scale';
import { geoAzimuthalEqualArea } from "d3-geo";
import ReactTooltip from "react-tooltip"
import england_det_topojson from './../assets/mapdata/topo_eer_topojson2.json';

const colorScale = scaleLinear()
  .domain([0, 100000000, 1338612970]) // Max is based on China
  .range(["#FFF176", "#FFC107", "#E65100"])

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
};

class Map extends Component {
  constructor() {
    super()

    this.state = {
      zoom: 1,
      geographyPaths: []
    }

    this.handleZoomIn = this.handleZoomIn.bind(this);
    this.handleZoomOut = this.handleZoomOut.bind(this);
  }
  handleZoomIn() {
    this.setState({
      zoom: this.state.zoom * 0.5,
    })
  }
  handleZoomOut() {
    this.setState({
      zoom: this.state.zoom / 0.5,
    })
  }
  

  componentDidMount() {
    // this.setState({geographyPaths: england_det_topojson});
    console.log(england_det_topojson);

    // setTimeout(() => {
    //   ReactTooltip.rebuild()
    // }, 100)
  }
  projection(width, height, config) {
    return geoAzimuthalEqualArea()
      .rotate([-10,-52,0])
      .scale(config.scale)
  }

    render() {

      return (
        <div className="map-component" id={this.props.id} >
        <button onClick={ this.handleZoomIn }>{ "Zoom in" }</button>
        <button onClick={ this.handleZoomOut }>{ "Zoom out" }</button>
        <hr />
          <ComposableMap 
          width={980}
          height={551}
          projection={this.projection}
          projectionConfig={{
            scale: 4000,
          }}
          style={{ width: "100%" }}>
            <ZoomableGroup  center={[10,52]} zoom={ this.state.zoom }>
              <Geographies geography={england_det_topojson} disableOptimization> 
                {(geographies, projection) => geographies.map((geography, i) => (
                  <Geography
                    key={ `geography-${i}` }
                    cacheId={ `geography-${i}` }
                    geography={ geography }
                    projection={ projection }
                    style={{
                      default: {
                        fill: colorScale(geography.properties.pop_est),
                        stroke: "#FFF",
                        strokeWidth: 0.5,
                        outline: "none",
                      },
                    }}
                  />
                ))}
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>
      );
  }
}
  export default Map;