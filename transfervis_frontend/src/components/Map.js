import React, { Component } from 'react';
import { Mercator } from '@vx/geo';
import $ from 'jquery';
import * as topojson from 'topojson-client';
import topology from './../assets/mapdata/topo_eer.json';
const world = topojson.feature(topology, topology.objects.eer);

class Map extends Component {
    constructor(props){
        super(props);

        this.state = {
            width: (this.props.width/19 * 100),
            height: 10,
            posx: (this.props.width/2 + 150),
            posy: (this.props.width/16 * 100),
            lastMousePosX: 0,
            lastMousePosY: 0,
            transX: 0,
            transY: 0,
            startMove: 0,
            event: false,
            maptaken: false,
            cursorType: "grab",
            world: {},
            zoom: 1
        }
        this.handleZoomIn = this.handleZoomIn.bind(this);
        this.handleZoomOut = this.handleZoomOut.bind(this);
        this.onMapMouseWheel = this.onMapMouseWheel.bind(this);
        this.onMapTaken = this.onMapTaken.bind(this);
        this.onMapRelease = this.onMapRelease.bind(this);
        this.onMapMove = this.onMapMove.bind(this);
    }

    componentDidMount(){
        this.setState((state)=>{
            return {lastMousePosX: $('#_mapEngland').position().left, lastMousePosY: $('#_mapEngland').position().top};
        });
    }

    onMapMouseWheel(evt){
        let mousezoom = evt.deltaY;
        if(mousezoom > 0){
            this.handleZoomOut();
        }else{
            this.handleZoomIn();
        }
    }

    onMapTaken(evt){
        evt.preventDefault();
        var deltaX = evt.pageX;
        var deltaY = evt.pageY;
        this.setState((state) => {
            
            return {maptaken: true, cursorType: "grabbing", lastMousePosX: deltaX, lastMousePosY: deltaY}
          });
    }

    onMapRelease(evt){
        var deltaX = evt.pageX;
        var deltaY = evt.pageY;

        evt.preventDefault();
        this.setState((state) => {
            
            return {maptaken: false, cursorType: "grab", startMove: 0, lastMousePosX: deltaX, lastMousePosY: deltaY}
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
                var mouseDiffX = this.state.lastMousePosX - deltaX;
                var mouseDiffY = this.state.lastMousePosY - deltaY;
                var map = $("#_mapEngland").position();
                // console.log("zoom: ", zoom, "map x: ", map.left, "map y: ", map.top);

                this.setState((state) => {
                    
                    return {transX: -1 * mouseDiffX, transY: -1 * mouseDiffY}
                  });
            }
            
        }
    }

    handleZoomIn() {
        this.setState({
            zoom: this.state.zoom / 0.5,
        });
    }

    handleZoomOut() {
        this.setState({
            zoom: this.state.zoom * 0.5,
        });
    }

  render() {
    
    var zoomStyle = {
        transform: 'scale(' + this.state.zoom + ') translate(' + this.state.transX + 'px, ' + this.state.transY + 'px)',
        cursor: this.state.cursorType
    }

  return (
    <div className="map-component">
    
    <div className="zoomcontrol-component">
        <div id="zoom-plus" className="btn btn-light zoom-symbol"  onClick={(e) => this.handleZoomIn(e)}>+</div>
        <div id="zoom-minus" className="btn btn-light zoom-symbol" onClick={(e) => this.handleZoomOut(e)}>-</div>
    </div>

    <svg id="_mapEngland" width={this.props.width} height={this.props.height} className="zoom-style" style={zoomStyle}
    onWheel={(...args)=> this.onMapMouseWheel(...args)} 
    onMouseDown={(...args)=> this.onMapTaken(...args)}
    onMouseUp={(...args)=> this.onMapRelease(...args)}
    onMouseMove={(...args)=> this.onMapMove(...args)}>
      <Mercator
        data={world.features}
        scale={this.state.width}
        translate={[this.state.posx,this.state.posy]}
        fill={() => '#8be4c5'}
        stroke={() => '#5fcfa7'}
        // onClick={data => event => {
        //   if (!this.props.events) return;
        //   alert(`Clicked: ${data.properties.name} (${data.id})`);
        // }}
      />
    </svg>
        
    </div>
  )
}
}
export default Map;