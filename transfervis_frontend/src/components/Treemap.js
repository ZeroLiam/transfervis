import React, { Component } from 'react';
import { ResponsiveTreeMap } from '@nivo/treemap';
import geotweets from './../assets/twitterdata/sampledata3.json';

class Treemap extends Component {

    // make sure parent container have a defined height when using responsive component,

    // otherwise height will be 0 and no chart will be rendered.

    // website examples showcase many properties, you'll often use just a few of them.

    render(){
        return(
            <div className="treemap-container">
                <ResponsiveTreeMap
                root={geotweets}
                identity="name"
                value="size"
                innerPadding={21}
                outerPadding={3}
                margin={{
                    "top": 10,
                    "right": 10,
                    "bottom": 10,
                    "left": 10
                }}
                label="size"
                labelFormat=".0s"
                labelSkipSize={12}
                labelTextColor="#ffffff"
                colors="purpleRed_green"
                colorBy="name"
                borderColor="inherit:darker(0.3)"
                animate={true}
                motionStiffness={90}
                motionDamping={11}
            />
            </div>
        );
    }

}

export default Treemap;