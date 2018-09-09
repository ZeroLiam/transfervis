import React, { Component } from 'react';
import { Mercator } from '@vx/geo';
import $ from 'jquery';
import * as topojson from 'topojson-client';
import topology from './../assets/mapdata/world-topo.json';
const world = topojson.feature(topology, topology.objects.units);

class World extends Component {
    constructor(props){
        super(props);

        
    }

  render() {

  return (
    <div className="world-component">

    <svg id="_worldMap" width={this.props.width} height={this.props.height}>
      <Mercator
        data={world.features}
        scale={this.props.width / 630 * 100}
        precision={0.1}
        center={[0,12]}
        translate={[this.props.width / 2, this.props.height / 2 + 50]}
        onClick={data => event => {
          if (!this.props.events) return;
          alert(`Clicked: ${data.properties.name} (${data.id})`);
        }}
      />
    </svg>
        
    </div>
  )
}
}
export default World;