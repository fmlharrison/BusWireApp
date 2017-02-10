import React from 'react';
import ajax from 'superagent';

class BusTimes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      busTimes: [],
    };
  }

  componentWillMount() {
    this.fetchBusData();
  }

  fetchBusData() {
    const baseURL = 'https://api.tfl.gov.uk/StopPoint/490008660N/arrivals';
    ajax.get(baseURL)
        .end((error, response) => {
          if (!error && response) {
            this.saveTimes(response.body);
          } else {
            console.log('This was an error fetching the data', error);
          }
        }
      );
  }

  sortBusTimes(times) {
    times.sort((a, b) => {
      return a.timeToStation - b.timeToStation;
    });
  }

  saveTimes(busTimes) {
    this.setState({ busTimes });
  }

  renderArrivingBuses() {
    return (
      <table>
        <tbody>
          <tr>
            <th>Line</th>
            <th>Destination</th>
            <th>Arriving In</th>
          </tr>
        </tbody>
        {this.state.busTimes.map((bus, index) => {
          return (
            <tbody key={index}>
              <tr>
                <td>{bus.lineName}</td>
                <td>{bus.destinationName}</td>
                <td>{bus.timeToStation} s</td>
              </tr>
            </tbody>
          )
        })}
      </table>
    );
  }

  render() {
    this.sortBusTimes(this.state.busTimes);

    return (
      <div>
        <button onClick={this.fetchBusData.bind(this)}>Where's My Bus?</button>
        {this.renderArrivingBuses()}
      </div>
    );
  }
}

export default BusTimes;
