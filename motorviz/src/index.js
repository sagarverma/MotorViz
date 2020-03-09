import React from 'react';
import ReactDOM from 'react-dom';


class Football extends React.Component {
  shoot = (a, b) => {
    alert(b.type);
  }
  render() {
    return (
      <button onClick={(ev) => this.shoot("Goal", ev)}>Take the shot!</button>
    );
  }
}

ReactDOM.render(<Football />, document.getElementById('root'));
