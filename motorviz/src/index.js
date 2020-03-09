import React, {Component} from "react";
import {render} from "react-dom";
import {VictoryPie} from "victory";

class PieChart extends Component {
  render() {
    return <VictoryPie />;
  }
}

render(<PieChart />, document.getElementById("root"));
