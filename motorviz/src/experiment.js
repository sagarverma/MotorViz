import React from 'react';
import ReactDOM from 'react-dom';

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
      if (Number(split_str[0]) && Number(split_str[1])){
        return true;
      }
    }
    return false;
  }
  parseFloatList(str){
    var split_str = str.split(",");
    var lst = [];
    for (var i=0; i<split_str.length; i++){
        lst.push(parseFloat(split_str[i]));
    }
    return lst;
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
    var split_str = str.split(",");
    for (var i = 0; i < split_str.length; i++){
      if (!Number(split_str[i])){
        return false;
      }
    }
    return true;
  }
  submitConfig = (event) => {
    event.preventDefault();
    fetch('/setconfig', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {'Content-Type': 'application/json'}
    });
  }
  configure = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    let err = '';
    console.log(nam, val);
    //validation and strong alert, also if correct parse it to proper format
    if (nam == 'torque_range'){
      if (!this.isTwoFloats(val)) {
        err = <strong>Troque range should be two rational numbers sperated by a comma</strong>;
        this.setState({torque_range_errmessage: err});
      }
      else {
        this.setState({[nam]: this.parseFloatList(val)});
      }
    }
    if (nam == 'speed_range'){
      if (!this.isTwoFloats(val)) {
        err = <strong>Speed range should be two rational numbers sperated by a comma</strong>;
        this.setState({speed_range_errmessage: err});
      }
    }
    if (nam == 'static_states'){
      if (!this.isTwoInts(val)) {
        err = <strong>Static states should be two integers sperated by a comma</strong>;
        this.setState({static_states_errmessage: err});
      }
    }
    if (nam == 'static_duration'){
      if (!this.isTwoFloats(val)) {
        err = <strong>Static duration should be two rational numbers sperated by a comma</strong>;
        this.setState({static_duration_errmessage: err});
      }
    }
    if (nam == 'ramp_range'){
      if (!this.isTwoFloats(val)) {
        err = <strong>Ramp range should be two rational numbers sperated by a comma</strong>;
        this.setState({ramp_range_errmessage: err});
      }
    }
    if (nam == 'step'){
      if (!(val == parseInt(val))) {
        err = <strong>Step should be a positive integer > 0 </strong>;
        this.setState({step_errmessage: err});
      }
    }
    if (nam == 'ramps'){
      if (!(val == parseInt(val))) {
        err = <strong>Ramps should be a list of positive rational numbers</strong>;
        this.setState({ramps_errmessage: err});
      }
    }
    if (nam == 'integral'){
        this.setState({integral: !this.state.integral});
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
      const isIntegral = this.state.integral;
      return (
        <form onSubmit={this.submitConfig}>
          <table>
            <tr>
              <td><label>Torque range </label></td>
              <td><input
                type='text'
                name='torque_range'
                value={this.state.torque_range}
                onChange={this.configure}
              /> </td>
              <td>{this.state.torque_range_errmessage}</td>
            </tr>
            <tr>
              <td><label>Speed range </label></td>
              <td><input
                type='text'
                name='speed_range'
                value={this.state.speed_range}
                onChange={this.configure}
              /> </td>
              <td>{this.state.speed_range_errmessage}</td>
            </tr>
            <tr>
              <td><label>Static states </label></td>
              <td><input
                type='text'
                name='static_states'
                value={this.state.static_states}
                onChange={this.configure}
               /> </td>
               <td>{this.state.static_states_errmessage}</td>
            </tr>
            <tr>
              <td><label>Static duration </label></td>
              <td><input
                type='text'
                name='static_duration'
                value={this.state.static_duration}
                onChange={this.configure}
              /> </td>
              <td>{this.state.static_duration_errmessage}</td>
            </tr>
            <tr>
              <td><label>Ramp range </label></td>
              <td><input
                type='text'
                name='ramp_range'
                value={this.state.ramp_range}
                onChange={this.configure}
                /> </td>
                <td>{this.state.ramp_range_errmessage}</td>
             </tr>

             <tr>
              <td><label>Simulate </label></td>
              <td><input
                type='checkbox'
                name='simulate'
                checked={this.state.simulate}
                onChange={this.configure}
                /> </td>
              </tr>
              <tr>
                <td><label>Integral </label></td>
                <td><input
                  type='checkbox'
                  name='integral'
                  value={this.state.integral}
                  deafultChecked={this.state.integral}
                  onChange={this.configure}
                /></td>
              </tr>
              {isIntegral &&
              <tr>
                <td><label>Step </label></td>
                <td><input
                  type='text'
                  name='step'
                  value={this.state.step}
                  onChange={this.configure}
                /></td>
                <td>{this.state.step_errmessage}</td>
              </tr>}
              {isIntegral &&
              <tr>
                <td><label>Torque Steps </label></td>
                <td><input
                  type='text'
                  name='torque_steps'
                  value={this.state.torque_steps}
                  onChange={this.configure}
                /></td>
              </tr>}
              {isIntegral &&
              <tr>
                <td><label>Speed Steps </label></td>
                <td><input
                  type='text'
                  name='speed_steps'
                  value={this.state.speed_steps}
                  onChange={this.configure}
                /></td>
              </tr>}
              {isIntegral &&
              <tr>
                <td><label>Ramps </label></td>
                <td><input
                  type='text'
                  name='ramps'
                  value={this.state.ramps}
                  onChange={this.configure}
                /></td>
                <td>{this.state.ramps_errmessage}</td>
              </tr>}
            </table>
            <input type="submit" value="Configure"/>
        </form>
      )
    }
}

export default ExperimentConfig;
