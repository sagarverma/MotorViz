import React from 'react';

import {Quantity, TwoQuantities} from './signal.js';

class Simulated extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          speed: {},
          torque: {},
          current_d: {},
          current_q: {},
          voltage_d: {},
          voltage_q: {},
          statorPuls: {},

          time_domain: [],
          speed_domain: [], //Also statorPuls domain
          torque_domain: [],
          current_domain: [],
          voltage_domain: []
      }
  }
  static getDerivedStateFromProps(props, state) {
    return {
            speed: props.speed,
            torque: props.torque,
            current_d: props.current_d,
            current_q: props.current_q,
            voltage_d: props.voltage_d,
            voltage_q: props.voltage_q,
            statorPuls: props.statorPuls,

            time_domain: props.time_domain,
            speed_domain: props.speed_domain,
            torque_domain: props.torque_domain,
            current_domain: props.current_domain,
            voltage_domain: props.voltage_domain
          };
  }
  render() {
    return (
      <table>
        <tr>
            <td><Quantity label_x="Speed (Hz)" label_y="Time (s)"
                  domain_x={this.state.time_domain} domain_y={this.state.speed_domain}
                  data={this.state.speed}/>
            </td>
            <td><Quantity label_x="Torque (% Nominal)" label_y="Time (s)"
                 domain_x={this.state.time_domain} domain_y={this.state.torque_domain}
                 data={this.state.torque}/>
            </td>
            <td><TwoQuantities label_x="Current (A)" label_y="Time (s)"
                 domain_x={this.state.time_domain} domain_y={this.state.current_domain}
                 data_one={this.state.current_d} data_two={this.state.current_q}
                 legend_one="Current d" legend_two="Current q"/>
            </td>
            <td><TwoQuantities label_x="Voltage (V)" label_y="Time (s)"
                 domain_x={this.state.time_domain} domain_y={this.state.voltage_domain}
                 data_one={this.state.voltage_d} data_two={this.state.voltage_q}
                 legend_one="Voltge d" legend_two="Voltage q"/>
            </td>
            <td><Quantity label_x="StatorPuls (Hz)" label_y="Time (s)"
                 domain_x={this.state.time_domain} domain_y={this.state.speed_domain}
                 data={this.state.statorPuls}/>
            </td>
        </tr>
      </table>
    )
  }
}

export default Simulated;
