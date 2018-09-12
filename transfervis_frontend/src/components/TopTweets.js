import React, { Component } from 'react';
import _ from 'lodash';
import $ from 'jquery';
import Tweet from './ui/Tweet';

class TopTweets extends Component{
    constructor(props){
        super(props);

        this.state = {
            tweetData: [],
            topRetweets: [],
            topLikes: [],
            activeTab: "retweet"
        }
        this.getTopTweets = this.getTopTweets.bind(this);
        this.activateTab = this.activateTab.bind(this);
    }

    componentDidMount() {
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

          this.setState((state)=>{
            return {tweetData: cleanTweets, topRetweets: sortedRetweets, topLikes: sortedLikes, activeTab: "retweet"}
          });
     }

     activateTab(evt){
         var target = evt.currentTarget.id === "tabRetweets" ? "retweet" : "like";

         this.setState({activeTab: target});

         if(evt.currentTarget.id === "tabRetweets"){
            $("#tabLiked").removeClass("active-tab");
            $("#tabRetweets").addClass("active-tab");
         }else{
            $("#tabRetweets").removeClass("active-tab");
            $("#tabLiked").addClass("active-tab");
         }
        
     }

     getTopTweets(){
        var type = this.state.activeTab;
        var tweetObj = type === "retweet" ? this.state.topRetweets : this.state.topLikes;

         if(_.isEmpty(tweetObj)){
            return;
         }else{
            var outputSorted = [];
            for(var sort = 0; sort < this.props.maxTweets; sort++){
                var obj = {
                    _id: "top-"+ type + "-" + sort,
                    text: tweetObj[sort].text,
                    location: tweetObj[sort].location,
                    username: tweetObj[sort].screen_name,
                    count: tweetObj[sort].retweet_count,
                    likes: tweetObj[sort].favorite_count
                }

                outputSorted.push(obj);
            }
            
            return _.map(outputSorted, (v,k)=>{
                    return(
                        <Tweet key={k} id={v._id} text={v.text} location={v.location} username={v.username} count={v.count} likes={v.likes} />
                    );
            });
         }
     }

    render(){
        $("#tabLiked").on("click", this.activateTab);
        $("#tabRetweets").on("click", this.activateTab);

        return(
            <div id={this.props.id} className="top-tweets-component">

                <div className="tweets-tabs">
                    <div className="tab active-tab" id="tabRetweets">
                        <h6>Top Retweets</h6>
                    </div>
                    <div className="tab" id="tabLiked">
                        <h6>Top Liked</h6>
                    </div>
                </div>

                <div className="all-tweets">
                {this.getTopTweets()}
                </div>
            </div>
        );
    }
}

export default TopTweets;