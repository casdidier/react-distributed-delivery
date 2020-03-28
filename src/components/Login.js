import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { AuthConsumer } from "../context/auth";

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      identifiant: '',
      password   : ''
    };
  }
  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }
  onSubmit = (event) => {

    event.preventDefault();
    fetch('http://wwww.localhost:3000/auth', {
      method : 'POST',
      body   : JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .then(data => { 
        sessionStorage.setItem("session_token", data.session_token)
        // this.props.history.push('/dashboard');
        })
    .then(() => this.setState(() => ({
        isAuth: true
      })))
    .catch(err => {
      console.error(err);
      alert('Error logging in please try again');
    });
  }
  render() {

    if (this.state.toDashboard === true) {
        return <Redirect to='/dashboard' />
      }

    return (
    <AuthConsumer>
        {({ isAuth }) => (
        <div>
            <h1>Login</h1>
            <form onSubmit={this.onSubmit}>
                <input
                name        = "identifiant"
                placeholder = "identifiant"
                value       = {this.state.identifiant}
                onChange    = {this.handleInputChange}
                required
                />
                <input
                type        = "password"
                name        = "password"
                placeholder = "Enter password"
                value       = {this.state.password}
                onChange    = {this.handleInputChange}
                required
                />
            <input type="submit" value="Submit"/>
            </form>
        </div>
        )}
    </AuthConsumer>
    )
    ;
  }
}