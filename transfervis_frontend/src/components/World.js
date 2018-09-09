import React, { Component } from 'react';
import { Mercator } from '@vx/geo';
import { Group } from '@vx/group';
import { GlyphCircle } from '@vx/glyph';
import { withTooltip, Tooltip } from '@vx/tooltip';
import $ from 'jquery';
import * as topojson from 'topojson-client';
import topology from './../assets/mapdata/world-topo.json';
import geotweets from './../assets/mapdata/tweetgeotst.json';
const world = topojson.feature(topology, topology.objects.units);

class World extends Component {
    constructor(props){
        super(props);
    }

  render() {
    
  return (
    <div id="_mapWorld" className="world-component">

    <svg id="_worldMap" width={this.props.width} height={this.props.height}>
       <Mercator
        data={world.features}
        scale={this.props.width / 630 * 100}
        precision={0.1}
        center={[0,12]}
        translate={[this.props.width / 2, this.props.height / 2 + 50]}
        onClick={data => event => {
            console.log(data);
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