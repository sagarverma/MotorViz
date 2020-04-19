import React from 'react';

import {ThreeQuantities} from './signal.js';

class InferComputeMetrics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speed_mse: 0,
      torque_mse: 0,
      speed_smape: 0,
      torque_smape: 0,
      speed_r2: 0,
      torque_r2: 0,
      speed_rmse: 0,
      torque_rmse: 0,
      speed_mae: 0,
      torque_mae: 0,

      perc2_times: [],
      perc95_times: [],
      following_errs: [],
      following_times: [],
      overshoot_errs: [],
      overshoot_times: [],
      sse_errs: [],
      sse_times: [],
      max_trq_accs: [],
      max_trq_acc_times: [],

      torque: [],
      speed: [],
      reference_torque_interp: [],
      reference_speed_interp: [],
      model_speed: [],
      model_torque: [],
      time_domain: [],
      speed_domain: [],
      torque_domain: []
    }
  }
  static getDerivedStateFromProps(props, state) {
    return {
      torque: props.torque,
      speed: props.speed,
      reference_torque_interp: props.reference_torque_interp,
      reference_speed_interp: props.reference_speed_interp,
      time_domain: props.time_domain,
      speed_domain: props.speed_domain,
      torque_domain: props.torque_domain
          };
  }
  componentDidMount = (event) => {
    fetch('/infer')
      .then(res => res.json())
      .then(data => this.setState({
          perc2_times: data.perc2_times,
          perc95_times: data.perc95_times,
          following_errs: data.following_errs,
          following_times: data.following_times,
          overshoot_errs: data.overshoot_errs,
          overshoot_times: data.overshoot_times,
          ramp_start_times: data.ramp_start_times,
          sse_errs: data.sse_errs,
          sse_times: data.sse_times,
          max_trq_accs: data.max_trq_accs,
          max_trq_acc_times: data.max_trq_acc_times,

          model_speed: data.model_speed,
          model_torque: data.model_torque,

          speed_mse: data.speed_mse,
          torque_mse: data.torque_mse,
          speed_smape: data.speed_smape,
          torque_smape: data.torque_smape,
          speed_r2: data.speed_r2,
          torque_r2: data.torque_r2,
          speed_rmse: data.speed_rmse,
          torque_rmse: data.torque_rmse,
          speed_mae: data.speed_mae,
          torque_mae: data.torque_mae
        })
      );
  }
  render() {
    let metrics = []

    for (var i=0; i<this.state.perc2_times.length; i++){
      metrics.push(<div class="row"><h6>2&#37; response time 	&#58; <span class="label label-default">{this.state.perc2_times[i]}s</span></h6></div>);
      metrics.push(<div class="row"><h6>95&#37; response time &#58; <span class="label label-default">{this.state.perc95_times[i]}s</span></h6></div>);
      metrics.push(<div class="row"><h6>Following error &#58; <span class="label label-default">{this.state.following_errs[i]} Hz </span>&nbsp; at time <span class="label label-default">{this.state.following_times[i]}s</span> </h6></div>);
      metrics.push(<div class="row"><h6>Overshoot &#58; <span class="label label-default">{this.state.overshoot_errs[i]}</span> &#37; &nbsp; at time &#58; <span class="label label-default">{this.state.overshoot_times[i]}s</span> </h6></div>);
      metrics.push(<div class="row"><h6>Steady state error &#58; <span class="label label-default">{this.state.sse_errs[i]}</span> Hz &nbsp; at time &#58; <span class="label label-default">{this.state.sse_times[i]}s</span> </h6></div>);
      metrics.push(<div class="row"><h6>Max torque acceleration &#58; <span class="label label-default">{this.state.max_trq_accs[i]}</span> &#37; of Nominal Torque &nbsp; at time &#58; <span class="label label-default">{this.state.max_trq_acc_times[i]}s</span> </h6></div>);
      metrics.push(<div class="row"><h6></h6></div>);
    }
    metrics.push(<div class="row"><h6>Speed MSE &#58; <span class="label label-default">{this.state.speed_mse}</span></h6></div>);
    metrics.push(<div class="row"><h6>Torque MSE &#58; <span class="label label-default">{this.state.torque_mse}</span></h6></div>);
    metrics.push(<div class="row"><h6>Speed SMAPE &#58; <span class="label label-default">{this.state.speed_smape}</span></h6></div>);
    metrics.push(<div class="row"><h6>Torque SMAPE &#58; <span class="label label-default">{this.state.torque_smape}</span></h6></div>);
    metrics.push(<div class="row"><h6>Speed R-Squared &#58; <span class="label label-default">{this.state.speed_r2}</span></h6></div>);
    metrics.push(<div class="row"><h6>Torque R-Squared &#58; <span class="label label-default">{this.state.torque_r2}</span></h6></div>);
    metrics.push(<div class="row"><h6>Speed RMSE &#58; <span class="label label-default">{this.state.speed_rmse}</span></h6></div>);
    metrics.push(<div class="row"><h6>Torque RMSE &#58; <span class="label label-default">{this.state.torque_rmse}</span></h6></div>);
    metrics.push(<div class="row"><h6>Speed MAE &#58; <span class="label label-default">{this.state.speed_mae}</span></h6></div>);
    metrics.push(<div class="row"><h6>Torque MAE &#58; <span class="label label-default">{this.state.torque_mae}</span></h6></div>);

    return (
        <div class="row">
        <div class="col">
        <ThreeQuantities label_y="Speed (Hz)" label_x="Time (s)"
             domain_x={this.state.time_domain} domain_y={this.state.speed_domain}
             data_one={this.state.reference_speed_interp} data_two={this.state.speed}
             data_three={this.state.model_speed}
             legend_one="Reference" legend_two="Simulated" legend_three="Model"/>
        </div>
        <div class="col"><ThreeQuantities label_y="Torque (% Nominal)" label_x="Time (s)"
             domain_x={this.state.time_domain} domain_y={this.state.torque_domain}
             data_one={this.state.reference_torque_interp} data_two={this.state.torque}
             data_three={this.state.model_torque}
             legend_one="Reference" legend_two="Simulated" legend_three="Model"/>
        </div>
        <div class="col">
          {metrics}
        </div>
        </div>
    )
  }
}

export default InferComputeMetrics;
