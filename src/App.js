import React from 'react';
import {Route, Switch, Link, BrowserRouter as Router } from 'react-router-dom';

import Home from './components/Home'
import Dashboard from './components/Dashboard/Dashboard'
import LoginContainer from './components/LoginContainer'
import { AuthProvider } from './context/auth'
import PrivateRoute from './PrivateRoute'

import './App.css';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <AuthProvider>
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
              {/* <Route path="/login" component={Login} /> */}
              <Route path="/login" component={LoginContainer} />
            </Switch>
          </Router>
        </div>
        </AuthProvider>
      </div>
    );
  };
}

export default App;
