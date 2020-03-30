import React from 'react';

import {TwoQuantities} from './signal.js';

class Metrics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      perc2_times: [],
      perc95_times: [],
      following_errs: [],
      following_times: [],
      overshoot_errs: [],
      overshoot_times: [],

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
          following_errs: data.following_errs,
          following_times: data.following_times,
          overshoot_errs: data.overshoot_errs,
          overshoot_times: data.overshoot_times
        })
      );
  }
  render() {
    let metrics = this.state.metrics;
    return (
        <div class="row">
        <div class="col">
        <TwoQuantities label_y="Speed (Hz)" label_x="Time (s)"
             domain_x={this.state.time_domain} domain_y={this.state.speed_domain}
             data_one={this.state.reference_speed_interp} data_two={this.state.speed}
             legend_one="Reference" legend_two="Simulated"/>
        </div>
        <div class="col"><TwoQuantities label_y="Torque (% Nominal)" label_x="Time (s)"
             domain_x={this.state.time_domain} domain_y={this.state.torque_domain}
             data_one={this.state.reference_torque_interp} data_two={this.state.torque}
             legend_one="Reference" legend_two="Simulated"/>
        </div>
        <div class="col">
          <div class="row">
            <h6>2&#37; response time 	&#58; <span class="label label-default">{this.state.perc2_times[1]}s</span></h6>
          </div>
          <div class="row">
            <h6>95&#37; response time &#58; <span class="label label-default">{this.state.perc95_times[1]}s</span></h6>
          </div>
          <div class="row">
            <h6>Following error &#58; <span class="label label-default">{this.state.following_errs[1]}</span>
                &nbsp; at time &#58; <span class="label label-default">{this.state.following_times[1]}s</span> </h6>
          </div>
          <div class="row">
            <h6>Overshoot &#58; <span class="label label-default">{this.state.overshoot_errs[1]}</span>
                &nbsp; at time &#58; <span class="label label-default">{this.state.overshoot_times[1]}s</span> </h6>
          </div>
        </div>
        </div>
    )
  }
}

export default Metrics;
