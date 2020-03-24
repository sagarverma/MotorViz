import React from 'react';
import ReactDOM from 'react-dom';

import Async from 'react-async';

import ExperimentConfig from './experimentconfig.js';
import SimulatorConfig from './simulatorconfig.js';

import Reference from './reference.js';
import Simulated from './simulated.js';

import Metrics from './metrics.js';

class RandomExperiment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      experimentconfig: <ExperimentConfig />,
      generate: false,
      simulate: false,
      metrics: false,
      ref_speed: [],
      ref_torque: [],
      time_domain: [],
      speed_domain: [],
      torque_domain: [],
      voltage_d: [],
      voltage_q: [],
      current_d: [],
      current_q: [],
      torque: [],
      speed: [],
      statorPuls: [],
      reference_torque_interp: [],
      reference_speed_interp: [],
      current_domain: [],
      voltage_domain: [],

    };
    this.simulateOnRef = this.simulateOnRef.bind(this);
  }
  generateReference = (event) => {
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
  async simulateOnRef(event) {
    event.preventDefault();
    const response = await fetch('/simulate');
    const data = await response.json();
    this.setState({
          ref_speed: data.ref_speed,
          ref_torque: data.ref_torque,
          time_domain: data.time_domain,
          speed_domain: data.speed_domain,
          torque_domain: data.torque_domain,

          voltage_d: data.voltage_d,
          voltage_q: data.voltage_q,
          current_d: data.current_d,
          current_q: data.current_q,
          torque: data.torque,
          speed: data.speed,
          statorPuls: data.statorPuls,
          reference_torque_interp: data.reference_torque_interp,
          reference_speed_interp: data.reference_speed_interp,
          current_domain: data.current_domain,
          voltage_domain: data.voltage_domain
        });
      this.setState({simulate: true});
  }
  computeMetrics = (event) => {
    this.setState({metrics: true});
  }
  configure = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    let err = '';
  }
    render() {
      const generate = this.state.generate;
      const simulate = this.state.simulate;
      const metrics = this.state.metrics;
      return (
        <div>
        <div class="row">
          <div class="col-sm">
                {this.state.experimentconfig}
                <button type="submit" class="btn btn-secondary" onClick={this.generateReference}>Generate</button>
          </div>
          <div class="col">
          {generate &&
            <Reference speed={this.state.ref_speed} torque={this.state.ref_torque}
                     time_domain={this.state.time_domain} speed_domain={this.state.speed_domain}
                     torque_domain={this.state.torque_domain}/>
          }
          {generate &&
            <button type="submit" class="btn btn-secondary" onClick={this.simulateOnRef}>Simulate</button>
          }
          </div>
        </div>
        <div class="row">
        {simulate &&
          <Simulated speed={this.state.speed} torque={this.state.torque}
                                   current_d={this.state.current_d} current_q={this.state.current_q}
                                   voltage_d={this.state.voltage_d} voltage_q={this.state.voltage_q}
                                   statorPuls={this.state.statorPuls} time_domain={this.state.time_domain}
                                   speed_domain={this.state.speed_domain} torque_domain={this.state.torque_domain}
                                   current_domain={this.state.current_domain} voltage_domain={this.state.voltage_domain}/>
        }
        {simulate &&
          <button type="submit" class="btn btn-primary" onClick={this.computeMetrics}>Compute Metrics</button>}
        </div>


        <div>
          {metrics && <Metrics torque={this.state.torque} speed={this.state.speed}
                        reference_torque_interp={this.state.reference_torque_interp}
                        reference_speed_interp={this.state.reference_speed_interp}
                        time_domain={this.state.time_domain}
                        speed_domain={this.state.speed_domain}
                        torque_domain={this.state.torque_domain}/>}
        </div>

        </div>
      )
    }
}

export default RandomExperiment;
