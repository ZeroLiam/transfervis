import React, { Component } from 'react';
import _ from 'lodash';
import $ from 'jquery';
import alltweets from './../assets/twitterdata/sampledata3.json';

class DataOverview extends Component{
    constructor(props){
        super(props);

        this.state = {
            tweetData: [],
            topRetweets: [],
            topLikes: [],
            winner: null
        }
    }

    componentDidMount() {
        let images = {};
        let arr = [];
        let r = require.context("./../assets/logos", false, /.*\.png$/);

        arr = r.keys().map((item, index) => {
                var keyname = item.replace(/\.\/\d+_/, '').replace('.png', '');
                images[keyname] = r(item);
                return r(item);
            });
        this.setState((state)=>{
            return {imgs: arr, imgsrc: images};
        });

        var newgeotweets = _.map(this.props.team, (tweet, key)=>{
            var lat = parseFloat(tweet.latitude);
            var lon = parseFloat(tweet.longitude);
      
            if(!isNaN(lat) && !isNaN(lon) && tweet.location !== ""){
              return tweet;
            }else{
              return;
            }
          });
          
          var cleanTweets = _.compact(newgeotweets);
          var sortedRetweets = _.orderBy(cleanTweets, ['retweet_count'], ['desc']);
          var sortedLikes = _.orderBy(cleanTweets, ['favorite_count'], ['desc']);

        //   var groupretweets = _(alltweets.children.children.children.children).groupBy('name')
        //   .map(function(v, k) { return { name: k, data: _.map(v, 'size') } })
        //   .value();

          console.log(alltweets.children);

          this.setState((state)=>{
            return {tweetData: cleanTweets, topRetweets: sortedRetweets, topLikes: sortedLikes}
          });
     }

    render(){
        $("#tabLiked").on("click", this.activateTab);
        $("#tabRetweets").on("click", this.activateTab);

        return(
            <div id={this.props.id} className="data-overview-component">
                <h3>Top Team of the Week</h3>
                {/* <img id={"winner-team-img-" + this.state.winner} alt={"team-logo-" + this.state.winner} src={this.state.winnersrc} /> */}
            </div>
        );
    }
}

export default DataOverview;