import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

class ExperimentConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      torque_range: [],
      torque_range_errmessage: '',
      speed_range: [],
      speed_range_errmessage: '',
      static_states: [],
      statis_states_errmessage: '',
      static_duration: [],
      static_duration_errmessage: '',
      ramp_range: [],
      ramp_range_errmessage: '',
      simulate: false,
      simulate_errmessage: '',
      integral: false,
      integral_errmessage: '',
      step: 1,
      step_errmessage: '',
      torque_steps: [],
      torque_steps_errmessage: '',
      speed_steps: [],
      speed_steps_errmessage: '',
      ramps: [],
      ramps_errmessage: ''
    };
  }
  isTwoFloats(str) {
    var split_str = str.split(",");
    if (split_str.length == 2) {
      if (/^(\s*-?\d+(\.\d+)?)(\s*,\s*-?\d+(\.\d+)?)$/.test(str)) {
        return true;
      }
    }
    return false;
  }
  isTwoInts(str) {
    var split_str = str.split(",");
    if (split_str.length == 2) {
      if (split_str[0] == parseInt(split_str[0]) && split_str[1] == parseInt(split_str[1])){
        return true;
      }
    }
    return false;
  }
  isFloatsList(str) {
    if (/^(\s*-?\d+(\.\d+)?)(\s*,\s*-?\d+(\.\d+)?)*$/.test(str)) {
      return true;
    }
    return false;
  }
  getAllValues(range, step) {
    var values = [];
    for (var x = range[0]; x <= range[1]; x+=step){
      values.push(x);
    }
    return values
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
  parseIntsList(str){
    if (!(typeof str == 'string')){
      return str
    }
    var split_str = str.split(",");
    var lst = [];
    for (var i=0; i<split_str.length; i++){
        lst.push(parseInt(split_str[i]));
    }
    return lst;
  }
  submitConfig = (event) => {
    event.preventDefault();
    let data = {
      torque_range: this.parseFloatsList(this.state.torque_range),
      speed_range: this.parseFloatsList(this.state.speed_range),
      static_states: this.parseIntsList(this.state.static_states),
      static_duration: this.parseIntsList(this.state.static_duration),
      ramp_range: this.parseFloatsList(this.state.ramp_range),
      simulate: this.state.simulate,
      integral: this.state.integral,
    }
    if (this.state.integral == true) {
      data['step'] = parseInt(this.state.step);
      data['torque_steps'] = this.parseIntsList(this.state.torque_steps);
      data['speed_steps'] = this.parseIntsList(this.state.speed_steps);
      data['ramps'] = this.parseFloatsList(this.state.ramps);
    }
    fetch('/setconfig', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'}
    });
  }
  configure = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    let err = '';
    //validation and strong alert, also if correct parse it to proper format
    if (nam == 'torque_range'){
      if (!this.isTwoFloats(val)) {
        err = <strong>Troque range should be two rational numbers sperated by a comma</strong>;
        this.setState({torque_range_errmessage: err});
      }
      this.setState({[nam]: val});
      if (this.isTwoFloats(val)) {
        this.setState({torque_range_errmessage: ''});
      }
    }
    if (nam == 'speed_range'){
      if (!this.isTwoFloats(val)) {
        err = <strong>Speed range should be two rational numbers sperated by a comma</strong>;
        this.setState({speed_range_errmessage: err});
      }
      this.setState({[nam]: val});
      if (this.isTwoFloats(val)) {
        this.setState({speed_range_errmessage: ''});
      }
    }
    if (nam == 'static_states'){
      if (!this.isTwoInts(val)) {
        err = <strong>Static states should be two integers sperated by a comma</strong>;
        this.setState({static_states_errmessage: err});
      }
      this.setState({[nam]: val});
      if (this.isTwoInts(val)) {
        this.setState({static_states_errmessage: ''});
      }
    }
    if (nam == 'static_duration'){
      if (!this.isTwoFloats(val)) {
        err = <strong>Static duration should be two rational numbers sperated by a comma</strong>;
        this.setState({static_duration_errmessage: err});
      }
      this.setState({[nam]: val});
      if (this.isTwoInts(val)) {
        this.setState({static_duration_errmessage: ''});
      }
    }
    if (nam == 'ramp_range'){
      if (!this.isTwoFloats(val)) {
        err = <strong>Ramp range should be two rational numbers sperated by a comma</strong>;
        this.setState({ramp_range_errmessage: err});
      }
      this.setState({[nam]: val});
      if (this.isTwoFloats(val)) {
        this.setState({ramp_range_errmessage: ''});
      }
    }
    if (nam == 'step'){
      if (!(val == parseInt(val))) {
        err = <strong>Step should be a positive integer > 0 </strong>;
        this.setState({step_errmessage: err});
      }
      this.setState({[nam]: parseInt(val)});
      if (val == parseInt(val)) {
        this.setState({torque_steps: this.getAllValues(this.state.torque_range, parseInt(val))});
        this.setState({speed_steps: this.getAllValues(this.state.speed_range, parseInt(val))});
      }
      else {
        this.setState({[nam]: ''});
        this.setState({torque_steps: ''});
        this.setState({speed_steps: ''});
      }
    }
    if (nam == 'ramps'){
      if (!this.isFloatsList(val)) {
        err = <strong>Ramps should be a list of positive rational numbers</strong>;
        this.setState({ramps_errmessage: err});
      }
      this.setState({[nam]: val});
      if (this.isFloatsList(val)) {
        this.setState({ramps_errmessage: ''});
      }
    }
    if (nam == 'integral'){
        this.setState({integral: !this.state.integral});
    }
    if (nam == 'simulate'){
        this.setState({simulate: !this.state.simulate});
    }
  }
  componentDidMount() {
    fetch('/getconfig')
      .then(res => res.json())
      .then(data => this.setState({
          torque_range: data.torque_range,
          speed_range: data.speed_range,
          static_states: data.static_states,
          static_duration: data.static_duration,
          ramp_range: data.ramp_range,
          simulate: data.simulate,
          integral: data.integral,
          step: data.step,
          torque_steps: data.torque_steps,
          speed_steps: data.speed_steps,
          ramps: data.ramps
        })
      );
    }
    render() {
      let isIntegral = this.state.integral;
      let toSimulate = this.state.simulate;
      return (
        <form onSubmit={this.submitConfig}>
          <div class="form-group">
            <div class="row">
              <div class="col col-lg-4">
                <label for="torque_range">Torque range</label>
              </div>
              <div class="col col-lg-4">
                <input
                  type='text'
                  name='torque_range'
                  value={this.state.torque_range}
                  onChange={this.configure}
                />
              </div>
              <div class="col-md-auto">
                <div class="form-control-feedback">
                    {this.state.torque_range_errmessage}
                </div>
              </div>
            </div>

          <div class="row">
            <div class="col col-lg-4">
              <label for="speed_range">Speed range</label>
            </div>
            <div class="col col-lg-4">
              <input
                type='text'
                name='speed_range'
                value={this.state.speed_range}
                onChange={this.configure}
              />
            </div>
            <div class="col-md-auto">
              <div class="form-control-feedback">
                  {this.state.speed_range_errmessage}
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col col-lg-4">
              <label for="static_states">Static states</label>
            </div>
            <div class="col col-lg-4">
              <input
                type='text'
                name='static_states'
                value={this.state.static_states}
                onChange={this.configure}
              />
            </div>
            <div class="col-md-auto">
              <div class="form-control-feedback">
                  {this.state.static_states_errmessage}
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col col-lg-4">
              <label for="static_duration">Static duration</label>
            </div>
            <div class="col col-lg-4">
              <input
                type='text'
                name='static_duration'
                value={this.state.static_duration}
                onChange={this.configure}
              />
            </div>
            <div class="col-md-auto">
              <div class="form-control-feedback">
                  {this.state.static_duration_errmessage}
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col col-lg-4">
              <label for="ramp_range">Ramp range</label>
            </div>
            <div class="col col-lg-4">
              <input
                type='text'
                name='ramp_range'
                value={this.state.ramp_range}
                onChange={this.configure}
              />
            </div>
            <div class="col-md-auto">
              <div class="form-control-feedback">
                  {this.state.ramp_range_errmessage}
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col col-lg-4">
              <label for="integral">Integral</label>
            </div>
            <div class="col col-lg-4">
              <input
                type='checkbox'
                name='integral'
                checked={this.state.integral}
                onChange={this.configure}
              />
            </div>
            <div class="col-md-auto">
              <div class="form-control-feedback">
                {this.state.integral_errmessage}
              </div>
            </div>
          </div>

          {isIntegral &&
          <div class="row">
            <div class="col col-lg-4">
              <label for="step">Step</label>
            </div>
            <div class="col col-lg-4">
              <input
                type='text'
                name='step'
                value={this.state.step}
                onChange={this.configure}
              />
            </div>
            <div class="col-md-auto">
              <div class="form-control-feedback">
                  {this.state.step_errmessage}
              </div>
            </div>
          </div>}

          {isIntegral &&
          <div class="row">
            <div class="col col-lg-4">
              <label for="torque_steps">Torque steps</label>
            </div>
            <div class="col col-lg-4">
              <input
                type='text'
                name='torque_steps'
                value={this.state.torque_steps}
                onChange={this.configure}
              />
            </div>
            <div class="col-md-auto">
              <div class="form-control-feedback">
                  {this.state.torque_steps_errmessage}
              </div>
            </div>
          </div>}

          {isIntegral &&
          <div class="row">
            <div class="col col-lg-4">
              <label for="speed_steps">Speed steps</label>
            </div>
            <div class="col col-lg-4">
              <input
                type='text'
                name='speed_steps'
                value={this.state.speed_steps}
                onChange={this.configure}
              />
            </div>
            <div class="col-md-auto">
              <div class="form-control-feedback">
                  {this.state.speed_steps_errmessage}
              </div>
            </div>
          </div>}

          {isIntegral &&
          <div class="row">
            <div class="col col-lg-4">
              <label for="ramps">Ramps</label>
            </div>
            <div class="col col-lg-4">
              <input
                type='text'
                name='ramps'
                value={this.state.ramps}
                onChange={this.configure}
              />
            </div>
            <div class="col-md-auto">
              <div class="form-control-feedback">
                  {this.state.ramps_errmessage}
              </div>
            </div>
          </div>}



          </div>

            <button type="submit" class="btn btn-primary">Configure</button>

        </form>
      )
    }
}

export default ExperimentConfig;
