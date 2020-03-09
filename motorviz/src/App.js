import React from 'react';
import ReactDOM from 'react-dom';

class Car extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "black",
      brand: 'maruti',
      model: 'alto 800',
      year: '2014'
    };
  }
  delHeader = () => {
    this.setState({show: false});
  }
  render () {
    return (
      <div>
        <h1>Hi, I am a {this.state.brand} Car!</h1>
        <p>
          It is a {this.state.color} &nbsp;
          {this.state.model} &nbsp;
          from {this.state.year}.
        </p>
        <button type="button" onClick={this.delHeader}>Delete Header</button>
      </div>
    );
  }
}

export default Car;