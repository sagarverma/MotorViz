import React from 'react';

import RandomExperiment from './randomexp.js';
import ManualExperiment from './manualexp.js';

class ExperimentType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      type: ""
    };
  }
  randomExperiment = (event) => {
    this.setState({selected: true});
    this.setState({type: <RandomExperiment />});
  }
  manualExperiment = (event) => {
    this.setState({selected: true});
    this.setState({type: <ManualExperiment />});
  }
  render() {
    const selected = this.state.selected;
    return (
      <div>
        <div>
        {!selected &&
          <button type="submit" class="btn btn-secondary" onClick={this.randomExperiment}>Random</button>}
        {!selected &&
          <button type="submit" class="btn btn-primary" onClick={this.manualExperiment}>Manual</button>}
        </div>

        <div>
        {selected && this.state.type}
        </div>

      </div>
    )
  }
}

export default ExperimentType;
