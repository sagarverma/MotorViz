import React from 'react';
import ReactDOM from 'react-dom';

class Car extends React.Component {
  constructor() {
    super();
    this.state = {color: "red"};
  }
  render () {
    return <h1>Hi, I am a {this.props.color} Car!</h1>;
  }
}

export default Car;
