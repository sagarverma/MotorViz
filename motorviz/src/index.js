import React from 'react';
import ReactDOM from 'react-dom';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

const data = [
  {x: 0, y: 0},
  {x: 1, y: 0},
  {x: 1.5, y: 50},
  {x: 3, y: 50}
];

class App extends React.Component {
  render() {
    return (
      <VictoryChart
      theme={VictoryTheme.material}
      domainPadding={20}
      >
      <VictoryAxis crossAxis
        domain={[0, 4]}
        theme={VictoryTheme.material}
        label="Speed (Hz)"
        style={{axisLabel: {fontSize: 10, padding: 30}}}
      />
      <VictoryAxis dependentAxis crossAxis
        domain={[0, 60]}
        theme={VictoryTheme.material}
        label="Time (s)"
        style={{axisLabel: {fontSize: 10, padding: 30}}}
      />
        <VictoryLine
          data={data}
          style={{
             data: { stroke: "#c43a31" },
             parent: { border: "1px solid #ccc"}
          }}
        />
      </VictoryChart>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
