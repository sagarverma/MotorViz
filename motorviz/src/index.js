import React from 'react';
import ReactDOM from 'react-dom';


class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: 'The content of a textarea goes in the value attribute',
      username: '',
      age: null,
      errormessage: ''
    };
  }
  mySubmitHandler = (event) => {
    event.preventDefault();
    let age = this.state.age;
      if (!Number(age)){
        alert("Your age must be a number");
      }

    alert("You are submitting " + this.state.username);
  }
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    let err = '';
    if (nam === "age"){
      if (val != "" && !Number(val)) {
        err = <strong>Your age must be a number</strong>;
      }
    }
    this.setState({errormessage: err});
    this.setState({[nam]: val});
  }
  render() {
    return (
        <form onSubmit={this.mySubmitHandler}>
        <h1>Hello {this.state.username} {this.state.age}</h1>
        <textarea value={this.state.description} />
        <p>Enter your name:</p>
        <input
          type='text'
          name='username'
          onChange={this.myChangeHandler}
        />
        <p>Enter you age:</p>
        <input
          type='text'
          name='age'
          onChange={this.myChangeHandler}
        />
        {this.state.errormessage}

        <input type='submit' />
        </form>
    );
  }
}

ReactDOM.render(<MyForm />, document.getElementById('root'));
