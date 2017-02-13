import React from 'react';
import ajax from 'superagent';

class BusTimes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isShown: false,
      stopId: this.props.stopId,
      currentDate: new Date(),
      busTimes: [],
    };
  }

  fetchBusData() {
    const baseURL = `https://api.tfl.gov.uk/StopPoint/${this.state.stopId}/arrivals`;
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

  componentWillMount() {
    this.fetchBusData();
  }

  componentDidMount() {
    this.timeID = setInterval(
      () => this.arrivalCountdown(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timeID);
  }

  arrivalCountdown() {
    this.setState({
      currentDate: new Date()
    });
  }

  timeTillArrival(arrivalTime, currentTime) {
    var timeDifference = new Date(arrivalTime) - currentTime;
    return Math.floor(timeDifference/1000);
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
                <td>{this.timeTillArrival(bus.expectedArrival, this.state.currentDate) <= 15 ? "Due" : this.timeTillArrival(bus.expectedArrival, this.state.currentDate) + " s"}</td>
              </tr>
            </tbody>
          )
        })}
      </table>
    );
  }

  showComponent(isShown) {
    if (isShown) {
      this.renderArrivingBuses();
    } else {
      return null;
    }
  }

  render() {
    this.sortBusTimes(this.state.busTimes);
    const componentIsShow = this.state.isShown;

    return (
      <div>
        <button onClick={this.fetchBusData.bind(this)}>Update Arrival Times</button>
        {this.showComponent(componentIsShow)}
      </div>
    );
  }
}

export default BusTimes;
