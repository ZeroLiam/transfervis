import React, { Component } from 'react';
import $ from 'jquery';

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
            $(".searchbar").css("display", "inline-block");
            $("#search-btn").addClass("hover");
        }else{
            $(".searchbar").css("display", "none");
            $("#search-btn").removeClass("hover");
        }
    }

    onIconClick(evt){

        if(evt.target.id == "search-btn"){
            this.setState((state)=>{
                return {openSearch: !state.openSearch};
            });
        }

        if(this.state.openSearch){
            $(".searchbar").css("display", "inline-block");
            $("#search-btn").addClass("hover");
        }else{
            $(".searchbar").css("display", "none");
            $("#search-btn").removeClass("hover");
        }
    }

    render(){
        return(
            <div className="left-sidebar">
                <br /> <br/> <br /> <br />
                <div className="left-sidebar-container" id="left-search">
                    <div className="left-sidebar-icon" id="search-btn"
                onClick={(...args)=> this.onIconClick(...args)}>
                        <i className="fas fa-search"></i>
                    </div>
                    <div className="searchbar">
                        <input type="text" className="inputsearch" id="searchterm" placeholder="search term" /> <span className="fas fa-search searchbar-btn-ic"></span>
                    </div>
                </div>


            </div>
        );
    }
}

export default LeftSidebar;