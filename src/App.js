import React from 'react';
import {Route, Switch, Link, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/Home'
import Login from './components/Login'
import Dashboard from './components/Dashboard/Dashboard'
import { AuthProvider } from './context/auth'
import PrivateRoute from './PrivateRoute'

import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuth: false
    };

    this.login = this.login.bind(this);
  }

  login() {
    this.setState({isAuth: true});
  }

  render() {

    return (
      <div className="App">
        <AuthProvider value={this.state.isAuth}>
        <div>
          <Router>
          <div>
            <ul>
              <Link to="/">Home</Link>
              <br></br>
              <Link to="/dashboard">Dashboard</Link>
              <br></br>
              <Link to="/login">Login</Link>
            </ul>
          </div>
            <Switch>
              <Route path="/" exact component={Home} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <Route path="/login" component={Login} />
            </Switch>
          </Router>
        </div>
        </AuthProvider>
      </div>
    );
  };
}

export default App;
