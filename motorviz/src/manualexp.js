import React from 'react';
import ReactDOM from 'react-dom';

import Async from 'react-async';

import SimulatorConfig from './simulatorconfig.js';

import Reference from './reference.js';
import Simulated from './simulated.js';

import Metrics from './metrics.js';
import InferComputeMetrics from './infer.js';

import 'bootstrap/dist/css/bootstrap.min.css';

class ManualExperiment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plot: false,
      simulate: false,
      metrics: false,
      infer: true,

      ref_speed_inp: [],
      ref_speed_time_inp: [],
      ref_torque_inp: [],
      ref_torque_time_inp: [],

      ref_speed: [],
      ref_torque: [],
      time_domain: [],
      speed_domain: [],
      torque_domain: [],

      ref_speed_errmessage: '',
      ref_speed_time_errmessage: '',
      ref_torque_errmessage: '',
      ref_torque_time_errmessage: '',



    };
    this.simulateOnRef = this.simulateOnRef.bind(this);
  }
  isFloatsList(str) {
    if (/^(\s*-?\d+(\.\d+)?)(\s*,\s*-?\d+(\.\d+)?)*$/.test(str)) {
      return true;
    }
    return false;
  }
  parseFloatsList(str){
    if (!(typeof str == 'string')){
      return str
    }
    var split_str = str.split(",");
    var lst = [];
    for (var i=0; i<split_str.length; i++){
        lst.push(parseFloat(split_str[i]));
    }
    return lst;
  }
  setReference = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    let err = '';
    if (nam == 'ref_speed_time_inp'){
      if(!this.isFloatsList(val)){
        err = <strong>Reference speed time should be list of positive rational numbers</strong>;
        this.setState({ref_speed_time_errmessage: err});
      }
      this.setState({[nam]: val});
      if (this.isFloatsList(val)){
        this.setState({ref_speed_time_errmessage: ''});
      }
    }
    if (nam == 'ref_speed_inp'){
      if (!this.isFloatsList(val)) {
        err = <strong>Reference speed should be list of rational numbers</strong>;
        this.setState({ref_speed_errmessage: err});
      }
      this.setState({[nam]: val});
      if (this.isFloatsList(val)){
        this.setState({ref_speed_errmessage: ''});
        }
      }
      if (nam == 'ref_torque_time_inp'){
        if(!this.isFloatsList(val)){
          err = <strong>Reference torque time should be list of positive rational numbers</strong>;
          this.setState({ref_torque_time_errmessage: err});
        }
        this.setState({[nam]: val});
        if (this.isFloatsList(val)){
          this.setState({ref_torque_time_errmessage: ''});
        }
      }
      if (nam == 'ref_torque_inp'){
        if (!this.isFloatsList(val)) {
          err = <strong>Reference torque should be list of rational numbers</strong>;
          this.setState({ref_torque_errmessage: err});
        }
        this.setState({[nam]: val});
        if (this.isFloatsList(val)){
          this.setState({ref_torque_errmessage: ''});
          }
        }
    }

    plotRef = (event) => {
      event.preventDefault();
      const ref_speed_inp = this.parseFloatsList(this.state.ref_speed_inp);
      const ref_speed_time_inp = this.parseFloatsList(this.state.ref_speed_time_inp);
      const ref_torque_inp = this.parseFloatsList(this.state.ref_torque_inp);
      const ref_torque_time_inp = this.parseFloatsList(this.state.ref_torque_time_inp);

      var ref_speed_lst = [];
      for (var i = 0; i < ref_speed_inp.length; i+=1){
        ref_speed_lst.push({'x': ref_speed_time_inp[i],
                        'y': ref_speed_inp[i]});
      }


      var ref_torque = [];
      for (var i = 0; i < ref_torque_inp.length; i+=1){
        ref_torque.push({'x':ref_torque_time_inp[i],
                        'y': ref_torque_inp[i]});
      }

      this.setState({
        ref_speed_inp: ref_speed_inp,
        ref_speed_time_inp: ref_speed_time_inp,
        ref_torque_inp: ref_torque_inp,
        ref_torque_time_inp: ref_torque_time_inp,
        ref_speed: ref_speed_lst,
        ref_torque: ref_torque,

        time_domain: [ref_speed_time_inp[0], ref_speed_time_inp[ref_speed_time_inp.length - 1]],
        speed_domain: [Math.min(...ref_speed_inp) - 10, Math.max(...ref_speed_inp) + 10],
        torque_domain: [Math.min(...ref_torque_inp) - 10, Math.max(...ref_torque_inp) + 10],
        plot: true
      });
    }

     async simulateOnRef(event) {
      event.preventDefault();
      let reference = {
        reference_speed: this.state.ref_speed_inp,
        reference_torque: this.state.ref_torque_inp,
        speed_time: this.state.ref_speed_time_inp,
        torque_time: this.state.ref_torque_time_inp,
      }
      const response = await fetch('/manualsimulate', {
        method: 'POST',
        body: JSON.stringify(reference),
        headers: {'Content-Type': 'application/json'}
      });
      const data =  await response.json();
      this.setState({
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
            voltage_domain: data.voltage_domain,
            simulate: true
          });
    }
    computeMetrics = (event) => {
      this.setState({metrics: true});
    }
    inferComputeMetrics = (event) => {
      this.setState({infer: true});
    }
    render() {
      const plot = this.state.plot;
      const simulate = this.state.simulate;
      const metrics = this.state.metrics;
      const infer = this.state.infer;
      return (
        <div>
        <div class="row">
          <div class="col">
          <form onSubmit={this.plotRef}>
          <div class="form-group">
              <div class="row">
                <div class="col col-lg-4">
                  <label for="ref_speed_time_inp">Reference Speed Time</label>
                </div>
                <div class="col col-lg-4">
                  <input
                    type="text"
                    name="ref_speed_time_inp"
                    value={this.state.ref_speed_time_inp}
                    onChange={this.setReference}
                  />
                </div>
                <div class="col-md-auto">
                  <div class="form-control-feedback">
                    {this.state.ref_speed_time_errmessage}
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col col-lg-4">
                  <label for="ref_speed_inp">Reference Speed</label>
                </div>
                <div class="col col-lg-4">
                  <input
                    type="text"
                    name="ref_speed_inp"
                    value={this.state.ref_speed_inp}
                    onChange={this.setReference}
                  />
                </div>
                <div class="col-md-auto">
                  <div class="form-control-feedback">
                      {this.state.ref_speed_errmessage}
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col col-lg-4">
                  <label for="ref_torque_time_inp">Reference Torque Time</label>
                </div>
                <div class="col col-lg-4">
                  <input
                    type="text"
                    name="ref_torque_time_inp"
                    value={this.state.ref_torque_time_inp}
                    onChange={this.setReference}
                  />
                </div>
                <div class="col-md-auto">
                  <div class="form-control-feedback">
                      {this.state.ref_torque_time_errmessage}
                  </div>
                </div>
              </div>

            <div class="row">
              <div class="col col-lg-4">
                <label for="ref_torque_inp">Reference Load</label>
              </div>
              <div class="col col-lg-4">
                <input
                  type="text"
                  name="ref_torque_inp"
                  value={this.state.ref_torque_inp}
                  onChange={this.setReference}
                />
              </div>
              <div class="col-md-auto">
                <div class="form-control-feedback">
                    {this.state.ref_torque_errmessage}
                </div>
              </div>
            </div>

          </div>
          <button type="submit" class="btn btn-secondary" >Plot</button>
          </form>
          </div>
          <div class="col">
            {plot &&
              <Reference speed={this.state.ref_speed} torque={this.state.ref_torque}
                       time_domain={this.state.time_domain} speed_domain={this.state.speed_domain}
                       torque_domain={this.state.torque_domain}/>
            }
            {plot &&
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
          {simulate &&
            <button type="submit" class="btn btn-secondary" onClick={this.inferComputeMetrics}>Infer and Compute Metrics</button>}
        </div>

        <div>
          {metrics && <Metrics torque={this.state.torque} speed={this.state.speed}
                        reference_torque_interp={this.state.reference_torque_interp}
                        reference_speed_interp={this.state.reference_speed_interp}
                        time_domain={this.state.time_domain}
                        speed_domain={this.state.speed_domain}
                        torque_domain={this.state.torque_domain}/>}
          {infer && <InferComputeMetrics torque={this.state.torque} speed={this.state.speed}
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

export default ManualExperiment;
