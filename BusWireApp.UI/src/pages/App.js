import React from 'react';
import ﻿ajax from 'superagent';

import PostCode from './PostCode';

const postcodeUrl = 'https://api.postcodes.io/postcodes'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      longitude: '',
      latitude: '',
    };
  }

  postcodeSearch(postcode) {
    console.log(postcode);
    ajax.get(`${postcodeUrl}/${postcode}`)
        .end((error, response) => {
          if (!error && response) {
            this.setState({
              longitude: response.body.result.longitude,
              latitude: response.body.result.latitude
            });
          } else {
            console.log('There was an error fetching the data', error);
          }
        }
      );
  }

  save

  render() {
    return (
      <div>
        <h1>BusWire - When is your next bus</h1>
        <h2>Enter your post code to find your closest bus stops.</h2>
      <PostCode onSearch={this.postcodeSearch.bind(this)}/>
        <p>{this.state.longitude}</p>
        <p>{this.state.latitude}</p>
      </div>
    );
  }
}

export default App;
