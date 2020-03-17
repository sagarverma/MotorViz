import React from 'react';
import ReactDOM from 'react-dom';

class ExperimentConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      torque_range: [],
      speed_range: [],
      static_states: [],
      static_duration: [],
      ramp_range: [],
      simulate: false,
      integral: false,
      step: 1,
      torque_steps: [],
      speed_steps: [],
      ramps: []
    };
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
    console.log(nam, val);
    this.setState({[nam]: val});
    //validation and strong alert, also if correct parse it to proper format
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
            </tr>
            <tr>
              <td><label>Speed range </label></td>
              <td><input
                type='text'
                name='speed_range'
                value={this.state.speed_range}
                onChange={this.configure}
              /> </td>
            </tr>
            <tr>
              <td><label>Static states </label></td>
              <td><input
                type='text'
                name='static_states'
                value={this.state.static_states}
                onChange={this.configure}
               /> </td>
            </tr>
            <tr>
              <td><label>Static duration </label></td>
              <td><input
                type='text'
                name='static_duration'
                value={this.state.static_duration}
                onChange={this.configure}
              /> </td>
            </tr>
            <tr>
              <td><label>Ramp range </label></td>
              <td><input
                type='text'
                name='ramp_range'
                value={this.state.ramp_range}
                onChange={this.configure}
                /> </td>
             </tr>
             <tr>
              <td><label>Simulate </label></td>
              <td><input
                type='radio'
                name='simulate'
                value={this.state.simulate}
                onChange={this.configure}
                /> </td>
              </tr>
              <tr>
                <td><label>Integral </label></td>
                <td><input
                  type='radio'
                  name='integral'
                  value={this.state.integral}
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
              </tr>}
            </table>
            <input type="submit" value="Configure"/>
        </form>
      )
    }
}

export default ExperimentConfig;
