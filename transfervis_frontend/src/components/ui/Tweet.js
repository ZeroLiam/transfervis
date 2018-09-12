import React, { Component } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faUserCircle, faMapMarkerAlt, faHeart } from '@fortawesome/free-solid-svg-icons';

library.add(faTwitter, faUserCircle, faMapMarkerAlt, faHeart);

class Tweet extends Component{

    render(){
        return(
        <div id={this.props.id}  className="top-tweets-container">
            <p className="tweet-text">{this.props.text}</p>
            <div className="tweet-meta">
                <span className="icon-tweet-username">
                    <FontAwesomeIcon className="meta-icon" icon={faUserCircle} />
                    {this.props.username}
                </span>
                <span className="icon-tweet-location">
                    <FontAwesomeIcon className="meta-icon" icon={faMapMarkerAlt} />
                    {this.props.location}
                </span>
                <span className="icon-tweet-count">
                    <FontAwesomeIcon className="meta-icon" icon={faTwitter} /> {this.props.count}
                </span>
                <span className="icon-tweet-likes">
                    <FontAwesomeIcon className="meta-icon" icon={faHeart} /> {this.props.likes}
                </span>
            </div>
        </div>
    );
}
}

export default Tweet;