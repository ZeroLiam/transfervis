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
            width: (this.props.width/18 * 100),
            height: 10,
            posx: (this.props.width/2 + 150),
            posy: (this.props.width/15 * 100),
            event: false,
            world: {},
            zoom: 1
        }
        this.handleZoomIn = this.handleZoomIn.bind(this);
        this.handleZoomOut = this.handleZoomOut.bind(this);
        this.onMapMouseWheel = this.onMapMouseWheel.bind(this);
    }

    onMapMouseWheel(evt){
        let mousezoom = evt.deltaY;
        var unit = evt.deltaMode;
        console.log("this.state.width: ", this.state.width, "this.width.zoom: ", this.state.zoom, "evt.deltaY: ", evt.deltaY , evt.deltaMode, " unit");
        
        if(mousezoom > 0){
            this.handleZoomIn();
        }else{
            this.handleZoomOut();
        }
    }

    handleZoomIn() {
        this.setState({
            zoom: this.state.zoom * 0.5,
            width: this.state.width * 0.5,
            posx: this.state.posx * 0.5,
            posy: this.state.posy * 0.5
        });
    }

    handleZoomOut() {
        this.setState({
            zoom: this.state.zoom / 0.5,
            width: this.state.width / 0.5,
            posx: this.state.posx / 0.5,
            posy: this.state.posy / 0.5
        });
    }

  render() {
    console.log("this.state.width: ", this.state.width, "this.state.posx: ", this.state.posx, "this.state.posy: ", this.state.posy);

  return (
    <div onWheel={this.onMapMouseWheel}>
    <svg width={this.props.width} height={this.props.height}>
      <Mercator
        data={world.features}
        scale={this.state.width}
        translate={[this.state.posx,this.state.posy]}
        // center={[10,100]}
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