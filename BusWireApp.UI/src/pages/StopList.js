import React from 'react';
import ajax from 'superagent';
import BusTimes from './BusTimes';

const app_id = '1f750915';
const app_key = '272753ef1cbdfffca975fbbc1178b8ff';

class StopList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      busStops: [],
    };
  }

  fetchLocalStops() {
    const baseUrl = `https://api.tfl.gov.uk/StopPoint?lat=${this.props.latitude}&lon=${this.props.longitude}&stoptypes=NaptanPublicBusCoachTram&app_id=${app_id}&app_key=${app_key}`;
    ajax.get(baseUrl)
        .end((error, response) => {
          if (!error && response) {
            this.setState({busStops: response.body.stopPoints});
          } else {
            console.log('There was an error fetching the data', error);
          }
        }
      );
  }

  componentWillMount() {
    this.fetchLocalStops();
  }

  renderStopsList() {
    return (
      <ul>
        {this.state.busStops.map((stop, index) => {
          return (
            <li key={index}>
              {stop.commonName}
              <BusTimes stopId={stop.id} />
            </li>
          )
        })}
      </ul>
    );
  }

  render() {
    return (
      <div>
        {this.renderStopsList()}
      </div>
    )
  }
}

export default StopList;
