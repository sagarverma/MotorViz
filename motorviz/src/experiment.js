import React from 'react';
import ReactDOM from 'react-dom';

class ExperimentConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      torque_range: [],
      speed_range: [],
      static_states: [],
      static_duration: [],
      ramp_range: [],
      simulate: false,
      integral: true,

      step: 1,
      torque_steps: [],
      speed_steps: [],
      ramps: []
    };
  }
  componentDidMount() {
    fetch('/config')
      .then(res => res.json())
      .then(data => this.setState({
          torque_range: data.torque_range,
          speed_range: data.speed_range,
          static_states: data.static_states,
          static_duration: data.static_duration,
          ramp_range: data.ramp_range
        })
      );
    }
    render() {
      return (
        <h2>{this.state.torque_range}</h2>
      )
    }
}

export default ExperimentConfig;
