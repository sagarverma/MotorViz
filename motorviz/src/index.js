import React from 'react';
import ReactDOM from 'react-dom';
import Car from './App.js';

class Garage extends React.Component {
  render () {
    return (
      <div>
        <h1>Who lives in my Garage?</h1>
      <Car />
      </div>
    );
  }
}
ReactDOM.render(<Garage/>, document.getElementById('root'));
