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
      integral: true,

      step: 1,
      torque_steps: [],
      speed_steps: [],
      ramps: []
    };
  }
  configure = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }
  componentDidMount() {
    fetch('/config')
      .then(res => res.json())
      .then(data => this.setState({
          torque_range: data.torque_range[0],
          speed_range: data.speed_range[0],
          static_states: data.static_states[0],
          static_duration: data.static_duration[0],
          ramp_range: data.ramp_range[0],
          simulate: data.simulate,
          integral: data.integral
        })
      );
    }
    render() {
      return (
        <form>
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
            </table>
            <input type="submit" value="Configure"/>
        </form>
      )
    }
}

export default ExperimentConfig;
