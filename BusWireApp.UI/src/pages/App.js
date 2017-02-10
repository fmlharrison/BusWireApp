import React from 'react';

import BusTimes from './BusTimes';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>BusWire - When is your next bus</h1>
        <h2>Click the button to find out when your next bus is</h2>
        <BusTimes />
      </div>
    );
  }
}

export default App;
