import React, { Component } from 'react';
import _ from 'lodash';
import { GradientTealBlue, RadialGradient } from '@vx/gradient';
import { Mercator } from '@vx/geo';
import * as topojson from 'topojson-client';
import topology from './../assets/mapdata/topo_eer.json';
const world = topojson.feature(topology, topology.objects.eer);

class Map extends Component {
    constructor(props){
        super(props);

        this.state = {
            width: 10,
            height: 10,
            event: false,
            world: {},
            zoom: 1
        }
        this.handleZoomIn = this.handleZoomIn.bind(this);
        this.handleZoomOut = this.handleZoomOut.bind(this);
        this.onMapMouseWheel = this.onMapMouseWheel.bind(this);
    }

    onMapMouseWheel(evt){
        console.log(evt);
        console.log(evt.deltaY);
    }

    handleZoomIn() {
        this.setState({
            zoom: this.state.zoom * 0.5,
        });
    }

    handleZoomOut() {
        this.setState({
            zoom: this.state.zoom / 0.5,
        });
    }

  render() {
      
  return (
    <div onWheel={this.onMapMouseWheel}>
    <svg width={this.props.width} height={this.props.height}>
      <RadialGradient
        id="geo_mercator_radial"
        from="#55bdd5"
        to="#4f3681"
        r={'80%'}
      />
      <Mercator
        data={world.features}
        scale={this.props.width/20 * 100}
        translate={[340,3000]}
        fill={() => '#8be4c5'}
        stroke={() => '#5fcfa7'}
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
export default Map;