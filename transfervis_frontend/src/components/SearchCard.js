import React, { Component } from 'react';
import _ from 'lodash';

class SearchCard extends Component {
    getSlider(){
        
        var optionsData = this.props.cardData.data;
        return(
            <div id={"carousel-" + this.props.alt} className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    {
                        _.map(optionsData, (v,i)=>{
                            return (
                                <div key={i} className={"carousel-item " + (i == 0 ? "active" : "")}>
                                    {v}
                                </div>
                            )
                        })
                    }
                </div>
                <a className="carousel-control-prev" href={"#carousel-" + this.props.alt} role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href={"#carousel-" + this.props.alt} role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        );
    }

    // getStatic(){
    //     return();
    // }

  render() {
    return (
      <div className="searchcard col-2">
        <div className="card border border-secondary">
            {/* <div className="card-header">
                <strong className="card-title">{this.props.title}</strong>
            </div> */}
            <div className="card-body">
                {this.getSlider()}
            </div>
        </div>
      </div>
    );
  }
}

export default SearchCard;