import React from 'react';

import {Quantity} from './signal.js';

class Reference extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          speed: {},
          torque: {},
          time_domain: [],
          speed_domain: [],
          torque_domain: []
      }
  }
  static getDerivedStateFromProps(props, state) {
    return {
            speed: props.speed,
            torque: props.torque,
            time_domain: props.time_domain,
            speed_domain: props.speed_domain,
            torque_domain: props.torque_domain
          };
  }
  render() {
    return (
        <div class="row">
          <div class="col">
              <Quantity label_y="Speed (Hz)" label_x="Time (s)"
                domain_x={this.state.time_domain} domain_y={this.state.speed_domain}
                data={this.state.speed}/>
          </div>
          <div class="col">
              <Quantity label_y="Torque (% Nominal)" label_x="Time (s)"
                 domain_x={this.state.time_domain} domain_y={this.state.torque_domain}
                 data={this.state.torque}/>
          </div>
        </div>
    )
  }
}

export default Reference;
