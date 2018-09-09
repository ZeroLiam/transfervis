import React, { Component } from 'react';
import $ from 'jquery';
import eplogo from './../assets/logos/00_eplnew.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPollH, faSearch, faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';

// Add all icons to the library so you can use it in your page
library.add(faPollH, faGlobeAmericas);

class LeftSidebar extends Component{
    constructor(props){
        super(props);

        this.state = {
            openSearch: true
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
    }

    onIconClick(evt){

        if(evt.target.id == "search-btn"){
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
        }else if(evt.target.id == "enable-map-btn"){
            $("#enable-map-btn svg").toggleClass("active-feature");
        }else if(evt.target.id == "enable-sankey-btn"){
            $("#enable-sankey-btn svg").toggleClass("active-feature");
        }
    }

    render(){
        return(
            <div className="left-sidebar">
                {/* EPL logo */}
                <div className="left-sidebar-container" id="left-epllogo">
                    <img src={eplogo} />
                </div>

                {/* Toggle search */}
                <div className="left-sidebar-container" id="left-search">
                    <div className="left-sidebar-icon" id="search-btn"
                onClick={(...args)=> this.onIconClick(...args)}>
                        <FontAwesomeIcon icon={faSearch} />
                        <span className="icon-left-title">Search</span>
                    </div>
                    <div className="searchbar">
                        <input type="text" className="inputsearch" id="searchterm" placeholder="search term" /> <span className="fas fa-search searchbar-btn-ic"></span>
                    </div>
                </div>

                {/* Toggle Map view */}
                <div className="left-sidebar-container" id="left-toggle-map">
                    <div className="left-sidebar-icon" id="enable-map-btn"
                    onClick={(...args)=> this.onIconClick(...args)}>
                            <FontAwesomeIcon icon={faGlobeAmericas} />
                            <span className="icon-left-title">Map</span>
                    </div>
                </div>

                {/* Toggle Sankey View */}
                <div className="left-sidebar-container" id="left-toggle-sankey">
                    <div className="left-sidebar-icon" id="enable-sankey-btn"
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