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
      <table>
        <tr>
            <td><Quantity label_x="Speed (Hz)" label_y="Time (s)"
                domain_x={this.state.time_domain} domain_y={this.state.speed_domain}
                data={this.state.speed}/></td>
            <td><Quantity label_x="Torque (% Nominal)" label_y="Time (s)"
                 domain_x={this.state.time_domain} domain_y={this.state.torque_domain}
                 data={this.state.torque}/></td>
        </tr>
      </table>
    )
  }
}

export default Reference;
