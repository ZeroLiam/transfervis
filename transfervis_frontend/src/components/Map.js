import React, { Component } from 'react';
import _ from 'lodash';
import $ from 'jquery';
// import england_det_topojson from './../assets/mapdata/topo_lad.topojson';

class Map extends Component {
  constructor(props){
    super(props);

    this.state = {
      width: 0,
      height: 0
    }
  }

    render() {

      return (
        <div className="map-component" id={this.props.id} >
        
        </div>
      );
  }
}
  export default Map;