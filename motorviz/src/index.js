import React from 'react';
import ReactDOM from 'react-dom';

import Reference from './reference.js';
import Simulated from './simulated.js';

import Experiment from './experiment.js';

const ref_speed = [
  {x: 0, y: 0},
  {x: 1, y: 0},
  {x: 1.5, y: 50},
  {x: 3, y: 50}
];

const ref_torque = [
  {x: 0, y: 100},
  {x: 1, y: 100},
  {x: 1.5, y: 100},
  {x: 3, y: 100}
];

const sim_speed = [
  {x: 0, y: 0},
  {x: 1, y: 0},
  {x: 1.5, y: 50},
  {x: 3, y: 50}
];

const sim_torque = [
  {x: 0, y: 100},
  {x: 1, y: 100},
  {x: 1.5, y: 100},
  {x: 3, y: 100}
];

const sim_current_d = [
  {x: 0, y: 100},
  {x: 1, y: 100},
  {x: 1.5, y: 100},
  {x: 3, y: 100}
];

const sim_current_q = [
  {x: 0, y: 0},
  {x: 1, y: 0},
  {x: 1.5, y: 50},
  {x: 3, y: 50}
];

const sim_voltage_d = [
  {x: 0, y: 100},
  {x: 1, y: 100},
  {x: 1.5, y: 100},
  {x: 3, y: 100}
];

const sim_voltage_q = [
  {x: 0, y: 0},
  {x: 1, y: 0},
  {x: 1.5, y: 50},
  {x: 3, y: 50}
];

const sim_statorpuls = [
  {x: 0, y: 100},
  {x: 1, y: 100},
  {x: 1.5, y: 100},
  {x: 3, y: 100}
];

// ReactDOM.render(<Reference speed={ref_speed} torque={ref_torque}
//                            time_domain={[0, 4]} speed_domain={[0 ,60]} torque_domain={[0, 120]}/>, document.getElementById("root"));
// ReactDOM.render(<Simulated speed={sim_speed} torque={sim_torque}
//                            current_d={sim_current_d} current_q={sim_current_q}
//                            voltage_d={sim_voltage_d} voltage_q={sim_voltage_q}
//                            statorPuls={sim_statorpuls} time_domain={[0, 4]}
//                            speed_domain={[0, 80]} torque_domain={[0, 120]}
//                            current_domain={[0, 100]} voltage_domain={[0, 100]}/>, document.getElementById("root"));

ReactDOM.render(<Experiment />, document.getElementById("root"));
