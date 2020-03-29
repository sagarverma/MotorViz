import React from 'react';

import {MetricQuantities} from './signal.js';

class Metrics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      perc2_times: [],
      perc95_times: [],
      following_errs: [],

      torque: [],
      speed: [],
      reference_torque_interp: [],
      reference_speed_interp: [],
      time_domain: [],
      speed_domain: [],
      torque_domain: []
    }
  }
  static getDerivedStateFromProps(props, state) {
    return {
      torque: props.torque,
      speed: props.speed,
      reference_torque_interp: props.reference_torque_interp,
      reference_speed_interp: props.reference_speed_interp,
      time_domain: props.time_domain,
      speed_domain: props.speed_domain,
      torque_domain: props.torque_domain
          };
  }
  componentDidMount = (event) => {
    fetch('/computemetrics')
      .then(res => res.json())
      .then(data => this.setState({
          perc2_times: data.perc2_times,
          perc95_times: data.perc95_times,
          following_errs: data.following_errs
        })
      );
  }
  render() {
    let metrics = this.state.metrics;
    return (
        <table>
        <tr>
        <td><MetricQuantities label_y="Speed (Hz)" label_x="Time (s)"
             domain_x={this.state.time_domain} domain_y={this.state.speed_domain}
             data_one={this.state.reference_speed_interp} data_two={this.state.speed}
             perc2_times={this.state.perc2_times}
             legend_one="Reference" legend_two="Simulated"/>
        </td>
        <td><MetricQuantities label_y="Torque (% Nominal)" label_x="Time (s)"
             domain_x={this.state.time_domain} domain_y={this.state.torque_domain}
             data_one={this.state.reference_torque_interp} data_two={this.state.torque}
             legend_one="Reference" legend_two="Simulated"/>
        </td>
        </tr>
        </table>
    )
  }
}

export default Metrics;
