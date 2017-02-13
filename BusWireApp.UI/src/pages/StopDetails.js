import React from 'react';

class StopDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      distance: this.props.distance,
      lines: this.props.lines,
      directionHeaded: this.props.directionHeaded,
      isShown: false,
    };
  }

  showStopDetails() {
    return(
      <div>
        <p>Headed towards: {this.state.directionHeaded}</p>
        <p>Distance from you: {Math.floor(this.state.distance)} m</p>
        <p>Lines:
          {this.state.lines.map((line, index) => {
            return (
              <span key={index}> {line.name} </span>
            )
          })}
        </p>
      </div>
    )
  }

  setIsShown() {
    this.setState(prevState => ({
      isShown: !prevState.isShown
    }));
  }

  render() {
    const isShown = this.state.isShown;

    let details = null;
    if (isShown) {
      details = this.showStopDetails();
    }

    return(
      <div>
        <button onClick={this.setIsShown.bind(this)}>Stop Details</button>
        {details}
      </div>
    );
  }
}

export default StopDetails;
