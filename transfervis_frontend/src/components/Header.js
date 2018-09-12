import React, { Component } from 'react';
import _ from 'lodash';

class LeftSidebar extends Component{
    constructor(props){
        super(props);

        this.state = {
            imgs: [],
            imgsrc:{}
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
     }

    render(){
        
        return(
            <div>
                <header className="App-header">
                    <h1 className="app-title">Twitter Premier League</h1>
                    <ul className="header-menu">
                        {_.map(this.state.imgs, (it, k)=>{
                           if(k > 0){
                            return(
                                <li className="header-team" key={k}>
                                    <img alt={"team-logo-" + k} src={it} />
                                </li>
                                );
                            };
                        })}
                    </ul>
                </header>
            </div>
    );
}
}

export default LeftSidebar;