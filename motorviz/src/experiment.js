import React from 'react';
import ReactDOM from 'react-dom';

import ExperimentConfig from './experimentconfig.js';
import SimulatorConfig from './simulatorconfig.js';
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
        <div>
        <div class="row">
          <div class="col-sm">
            <ExperimentConfig />
            <form onSubmit={this.generateConfig}>
                <input type="submit" value="Generate"/>
                </form>
          </div>
          <div class="col">
          {generate &&
            <Reference speed={this.state.ref_speed} torque={this.state.ref_torque}
                     time_domain={this.state.time_domain} speed_domain={this.state.speed_domain}
                     torque_domain={this.state.torque_domain}/>
          }
          </div>
        </div>
        <div class="row">

        </div>




        </div>
      )
    }
}

export default Experiment;
