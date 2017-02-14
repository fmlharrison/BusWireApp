import React from 'react';
import ajax from 'superagent';
import BusTimes from './BusTimes';
import StopDetails from './StopDetails';

const app_id = '1f750915';
const app_key = '272753ef1cbdfffca975fbbc1178b8ff';

class StopList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      busStops: [],
    };
  }

  fetchLocalStops(props) {
    console.log("ajax called");
    console.log(props);
    const baseUrl = `https://api.tfl.gov.uk/StopPoint?lat=${props.latitude}&lon=${props.longitude}&stoptypes=NaptanPublicBusCoachTram&app_id=${app_id}&app_key=${app_key}`;
    ajax.get(baseUrl)
        .end((error, response) => {
          if (!error && response) {
            this.setState({busStops: response.body.stopPoints});
          } else {
            console.log('There was an error fetching the data', error);
          }
        }
      );
      console.log("ajax finished");
  }

  componentWillMount() {
    this.fetchLocalStops(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchLocalStops(nextProps);
  }

  renderStopsList() {
    return (
      <ul>
        {this.state.busStops.map((stop, index) => {
          return (
            <li key={index}>
              <h4>{stop.commonName} - {stop.indicator}</h4>
              <StopDetails
                distance={stop.distance}
                lines={stop.lines}
              />
              <BusTimes stopId={stop.id} />
            </li>
          )
        })}
      </ul>
    );
  }

  render() {
    console.log(2);
    return (
      <div>
        {this.renderStopsList()}
      </div>
    )
  }
}

export default StopList;
