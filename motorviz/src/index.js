import React from 'react';
import ReactDOM from 'react-dom';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';


class Quantity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label_x: "",
            label_y: "",
            domain_x: [],
            domain_y: [],
            data: {}
        }
    }
    render() {
        return (
            <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={20}
            >
            <VictoryAxis crossAxis
                domain={this.state.domain_x}
                theme={VictoryTheme.material}
                label={this.state.label_x}
                style={{axisLabel: {fontSize: 10, padding: 30}}}
            />
            <VictoryAxis dependentAxis crossAxis
                domain={this.state.domain_y}
                theme={VictoryTheme.material}
                label={this.state.label_y}
                style={{axisLabel: {fontSize: 10, padding: 30}}}
            />
            <VictoryLine
                data={this.state.data}
            />
            </VictoryChart>
        )
    }
}

const data = [
  {x: 0, y: 0},
  {x: 1, y: 0},
  {x: 1.5, y: 50},
  {x: 3, y: 50}
];

class App extends React.Component {
  render() {
    return (
      <table>
        <tr>
            <td><Quantity label_x="Speed (Hz)" label_y="Time (s)" domain_x={[0, 4]} domain_y={[0, 50]} data={data}/></td>
            <td> </td>
        </tr>
      </table>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
