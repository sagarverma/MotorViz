import React from 'react';
import { VictoryLine, VictoryChart, VictoryAxis,
         VictoryTheme, VictoryLabel, VictoryZoomContainer,
         VictoryCursorContainer, createContainer} from 'victory';

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
    static getDerivedStateFromProps(props, state) {
      return {
              label_x: props.label_x,
              label_y: props.label_y,
              domain_x: props.domain_x,
              domain_y: props.domain_y,
              data: props.data
            };
    }
    render() {
      const VictoryZoomCursorContainer = createContainer("zoom", "cursor");
        return (
            <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={20}
                containerComponent={<VictoryZoomContainer />}
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

class TwoQuantities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label_x: "",
            label_y: "",
            domain_x: [],
            domain_y: [],
            data_one: {},
            data_two: {},
            legend_one: "",
            legend_two: ""
        }
    }
    static getDerivedStateFromProps(props, state) {
      return {
              label_x: props.label_x,
              label_y: props.label_y,
              domain_x: props.domain_x,
              domain_y: props.domain_y,
              data_one: props.data_one,
              data_two: props.data_two,
              legend_one: props.legend_one,
              legend_two: props.legend_two
            };
    }
    getStyles() {
      const BLUE_COLOR = "#00a3de";
      const RED_COLOR = "#7c270b";

      return {
        parent: {
          background: "#ccdee8",
          boxSizing: "border-box",
          display: "inline",
          padding: 0,
          fontFamily: "'Fira Sans', sans-serif",
          maxWidth: "50%",
          height: "auto"
        },
        title: {
          textAnchor: "start",
          verticalAnchor: "end",
          fill: "#000000",
          fontFamily: "inherit",
          fontSize: "18px",
          fontWeight: "bold"
        },
        labelNumber: {
          textAnchor: "middle",
          fill: "#ffffff",
          fontFamily: "inherit",
          fontSize: "14px"
        },

        // INDEPENDENT AXIS
        axisYears: {
          axis: { stroke: "black", strokeWidth: 1},
          ticks: {
            size: ({ tick }) => {
              const tickSize =
                tick.getFullYear() % 5 === 0 ? 10 : 5;
              return tickSize;
            },
            stroke: "black",
            strokeWidth: 1
          },
          tickLabels: {
            fill: "black",
            fontFamily: "inherit",
            fontSize: 16
          }
        },

        // DATA SET ONE
        axisOne: {
          grid: {
            stroke: ({ tick }) =>
              tick === -10 ? "transparent" : "#ffffff",
            strokeWidth: 2
          },
          axis: { stroke: BLUE_COLOR, strokeWidth: 0 },
          ticks: { strokeWidth: 0 },
          tickLabels: {
            fill: BLUE_COLOR,
            fontFamily: "inherit",
            fontSize: 16
          }
        },
        labelOne: {
          fill: BLUE_COLOR,
          fontFamily: "inherit",
          fontSize: 12,
          fontStyle: "italic"
        },
        lineOne: {
          data: { stroke: BLUE_COLOR, strokeWidth: 4.5 }
        },
        axisOneCustomLabel: {
          fill: BLUE_COLOR,
          fontFamily: "inherit",
          fontWeight: 300,
          fontSize: 21
        },

        // DATA SET TWO
        axisTwo: {
          axis: { stroke: RED_COLOR, strokeWidth: 0 },
          tickLabels: {
            fill: RED_COLOR,
            fontFamily: "inherit",
            fontSize: 16
          }
        },
        labelTwo: {
          fill: RED_COLOR,
          fontFamily: "inherit",
          fontSize: 12,
          fontStyle: "italic"
        },
        lineTwo: {
          data: { stroke: RED_COLOR, strokeWidth: 4.5 }
        },
      };
    }
    render() {
        const styles = this.getStyles();
        const VictoryZoomCursorContainer = createContainer("zoom", "cursor");
        return (
            <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={20}
                containerComponent={<VictoryZoomContainer />}
            >
            <VictoryLabel x={200} y={20} style={styles.labelOne}
                text={this.state.legend_one}
            />
            <VictoryLabel x={200} y={40} style={styles.labelTwo}
                text={this.state.legend_two}
            />
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
                data={this.state.data_one}
                standalone={false}
                style={styles.lineOne}
            />
            <VictoryLine
                data={this.state.data_two}
                standalone={false}
                style={styles.lineTwo}
            />
            </VictoryChart>
        )
    }
}

class MetricQuantities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label_x: "",
            label_y: "",
            domain_x: [],
            domain_y: [],
            data_one: {},
            data_two: {},
            legend_one: "",
            legend_two: "",

            perc2_times: [],
            perc95_times: [],
            following_errs: []
        }
    }
    static getDerivedStateFromProps(props, state) {
      return {
              label_x: props.label_x,
              label_y: props.label_y,
              domain_x: props.domain_x,
              domain_y: props.domain_y,
              data_one: props.data_one,
              data_two: props.data_two,
              legend_one: props.legend_one,
              legend_two: props.legend_two,

              perc2_times: [],
              perc95_times: [],
              following_errs: []
            };
    }
    getStyles() {
      const BLUE_COLOR = "#00a3de";
      const RED_COLOR = "#7c270b";

      return {
        parent: {
          background: "#ccdee8",
          boxSizing: "border-box",
          display: "inline",
          padding: 0,
          fontFamily: "'Fira Sans', sans-serif",
          maxWidth: "50%",
          height: "auto"
        },
        title: {
          textAnchor: "start",
          verticalAnchor: "end",
          fill: "#000000",
          fontFamily: "inherit",
          fontSize: "18px",
          fontWeight: "bold"
        },
        labelNumber: {
          textAnchor: "middle",
          fill: "#ffffff",
          fontFamily: "inherit",
          fontSize: "14px"
        },

        // INDEPENDENT AXIS
        axisYears: {
          axis: { stroke: "black", strokeWidth: 1},
          ticks: {
            size: ({ tick }) => {
              const tickSize =
                tick.getFullYear() % 5 === 0 ? 10 : 5;
              return tickSize;
            },
            stroke: "black",
            strokeWidth: 1
          },
          tickLabels: {
            fill: "black",
            fontFamily: "inherit",
            fontSize: 16
          }
        },

        // DATA SET ONE
        axisOne: {
          grid: {
            stroke: ({ tick }) =>
              tick === -10 ? "transparent" : "#ffffff",
            strokeWidth: 2
          },
          axis: { stroke: BLUE_COLOR, strokeWidth: 0 },
          ticks: { strokeWidth: 0 },
          tickLabels: {
            fill: BLUE_COLOR,
            fontFamily: "inherit",
            fontSize: 16
          }
        },
        labelOne: {
          fill: BLUE_COLOR,
          fontFamily: "inherit",
          fontSize: 12,
          fontStyle: "italic"
        },
        lineOne: {
          data: { stroke: BLUE_COLOR, strokeWidth: 4.5 }
        },
        axisOneCustomLabel: {
          fill: BLUE_COLOR,
          fontFamily: "inherit",
          fontWeight: 300,
          fontSize: 21
        },

        // DATA SET TWO
        axisTwo: {
          axis: { stroke: RED_COLOR, strokeWidth: 0 },
          tickLabels: {
            fill: RED_COLOR,
            fontFamily: "inherit",
            fontSize: 16
          }
        },
        labelTwo: {
          fill: RED_COLOR,
          fontFamily: "inherit",
          fontSize: 12,
          fontStyle: "italic"
        },
        lineTwo: {
          data: { stroke: RED_COLOR, strokeWidth: 4.5 }
        },
      };
    }
    render() {
        const styles = this.getStyles();
        const VictoryZoomCursorContainer = createContainer("zoom", "cursor");
        return (
            <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={20}
                containerComponent={<VictoryZoomContainer />}
            >
            <VictoryLabel x={200} y={20} style={styles.labelOne}
                text={this.state.legend_one}
            />
            <VictoryLabel x={200} y={40} style={styles.labelTwo}
                text={this.state.legend_two}
            />
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
                data={this.state.data_one}
                standalone={false}
                style={styles.lineOne}
                labels={this.state.perc2_times}
                labelComponent={<VictoryLabel renderInPortal dy={-20}/>}
            />
            <VictoryLine
                data={this.state.data_two}
                standalone={false}
                style={styles.lineTwo}
            />
            </VictoryChart>
        )
    }
}
export {Quantity, TwoQuantities, MetricQuantities};
