import React from 'react';
import ﻿ajax from 'superagent';

import PostCode from './PostCode';
import StopList from './StopList';

const postcodeUrl = 'https://api.postcodes.io/postcodes'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      longitude: '',
      latitude: '',
      hasCoordinates: false,
    };
  }

  postcodeSearch(postcode) {
    ajax.get(`${postcodeUrl}/${postcode}`)
        .end((error, response) => {
          if (!error && response) {
            this.setState({
              longitude: response.body.result.longitude,
              latitude: response.body.result.latitude,
              hasCoordinates: true
            });
          } else {
            console.log('There was an error fetching the data', error);
          }
        }
      );
  }

  render() {
    const hasCoordinates = this.state.hasCoordinates;

    let busStopList;
    if (hasCoordinates) {
      busStopList = <StopList longitude={this.state.longitude} latitude={this.state.latitude} />
    } else {
      busStopList = null;
    }

    return (
      <div>
        <h1>BusWire - When is your next bus</h1>
        <h2>Enter your post code to find your closest bus stops.</h2>
        <PostCode onSearch={this.postcodeSearch.bind(this)}/>
        {busStopList}
      </div>
    );
  }
}

export default App;
