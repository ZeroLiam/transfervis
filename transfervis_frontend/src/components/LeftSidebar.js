import React, { Component } from 'react';
import $ from 'jquery';
import eplogo from './../assets/logos/00_eplnew.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPollH, faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';

// Add all icons to the library so you can use it in your page
library.add(faPollH, faGlobeAmericas);

class LeftSidebar extends Component{
    constructor(props){
        super(props);

        this.state = {
            openSearch: true,
            activevis: "diagram"
        };

        this.onIconClick = this.onIconClick.bind(this);
    }

    componentDidMount(){
        if(!this.state.openSearch){
            $(".searchbar").show();
            $("#search-btn").addClass("hover");
        }else{
            $(".searchbar").hide();
            $("#search-btn").removeClass("hover");
        }

        if(this.state.activevis === "world"){
            $("#enable-diagram-btn svg").removeClass("active-feature");
            $("#enable-map-btn svg").addClass("active-feature");
        }else if(this.state.activevis === "diagram"){
            $("#enable-diagram-btn svg").addClass("active-feature");
            $("#enable-map-btn svg").removeClass("active-feature");
        }

        this.props.receiveActiveType(this.state.activevis);
    }

    onIconClick(evt){

        if(evt.target.id === "search-btn"){
            this.setState((state)=>{
                return {openSearch: !state.openSearch};
            });

            if(this.state.openSearch){
                $(".searchbar").show(200);
                $("#search-btn svg").toggleClass("active-feature");
                $("#search-btn").addClass("hover");
            }else{
                $(".searchbar").hide(200);
                $("#search-btn svg").toggleClass("active-feature");
                $("#search-btn").removeClass("hover");
            }
        }else if(evt.target.id === "enable-map-btn"){
            $("#enable-diagram-btn svg").removeClass("active-feature");
            $("#enable-map-btn svg").addClass("active-feature");
            this.setState({activevis: "world"});
            this.props.receiveActiveType(this.state.activevis);

        }else if(evt.target.id === "enable-diagram-btn"){
            $("#enable-diagram-btn svg").addClass("active-feature");
            $("#enable-map-btn svg").removeClass("active-feature");
            this.setState({activevis: "diagram"});
            this.props.receiveActiveType(this.state.activevis);
        }
    }

    render(){
        return(
            <div className="left-sidebar">
                {/* EPL logo */}
                <div className="left-sidebar-container" id="left-epllogo">
                    <img alt="EPL Logo" src={eplogo} />
                </div>

                {/* Toggle search */}
                {/* <div className="left-sidebar-container" id="left-search">
                    <div className="left-sidebar-icon" id="search-btn"
                onClick={(...args)=> this.onIconClick(...args)}>
                        <FontAwesomeIcon icon={faSearch} />
                        <span className="icon-left-title">Search</span>
                    </div>
                    <div className="searchbar">
                        <input type="text" className="inputsearch" id="searchterm" placeholder="search term" /> <span className="fas fa-search searchbar-btn-ic"></span>
                    </div>
                </div> */}

                {/* Toggle Map view */}
                <div className="left-sidebar-container" id="left-toggle-map">
                    <div className="left-sidebar-icon" id="enable-map-btn"
                    onClick={(...args)=> this.onIconClick(...args)}>
                            <FontAwesomeIcon icon={faGlobeAmericas} />
                            <span className="icon-left-title">Map</span>
                    </div>
                </div>

                {/* Toggle Diagram View */}
                <div className="left-sidebar-container" id="left-toggle-diagram">
                    <div className="left-sidebar-icon" id="enable-diagram-btn"
                    onClick={(...args)=> this.onIconClick(...args)}>
                            <FontAwesomeIcon icon={faPollH} />
                            <span className="icon-left-title">Diagram</span>
                        </div>
                </div>
            </div>
        );
    }
}

export default LeftSidebar;