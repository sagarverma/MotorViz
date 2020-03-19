import React from 'react';
import ReactDOM from 'react-dom';

import ExperimentConfig from './experimentconfig.js';
import Reference from './reference.js';

class Experiment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      generate: false,
      ref_speed: [],
      ref_torque: [],
      time_domain: [],
      speed_domain: [],
      torque_domain: []
    };
  }
  generateConfig = (event) => {
    this.setState({generate: true});
    event.preventDefault();
    fetch('/generate')
      .then(res => res.json())
      .then(data => this.setState({
          ref_speed: data.ref_speed,
          ref_torque: data.ref_torque,
          time_domain: data.time_domain,
          speed_domain: data.speed_domain,
          torque_domain: data.torque_domain
        })
      );
  }
  configure = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    let err = '';
  }
    render() {
      const generate = this.state.generate;
      return (
        <table>
        <tr>
          <td><ExperimentConfig /></td>
        </tr>
        <tr>
          <td><form onSubmit={this.generateConfig}>
              <input type="submit" value="Generate"/>
              </form></td>
        </tr>
        {generate && <tr>
          <td><Reference speed={this.state.ref_speed} torque={this.state.ref_torque}
                   time_domain={this.state.time_domain} speed_domain={this.state.speed_domain}
                   torque_domain={this.state.torque_domain}/></td>
        </tr>}
        </table>

      )
    }
}

export default Experiment;
