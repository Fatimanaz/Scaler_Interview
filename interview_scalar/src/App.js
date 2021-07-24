import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom' ;
import Interviews from './interviews' ;
import HomePage from './home' ;
import Edit from './edit' ;
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
    <Switch>
      <Route exact path='/view-schedule' component={Interviews} />
      <Route exact path='/' component={HomePage} />
      <Route exact path='/edit' component={Edit} />
    </Switch>
      </div>
    );
  }
}

export default App;