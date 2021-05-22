import './App.css';
import HomePage from './components/HomePage/HomePage'
import LoginPage from './components/Login/LoginPage';
import RestaurantListPage from './components/RestaurantListPage/RestaurantListPage';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import React, { Component } from 'react'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/myrestaurantlists" component={RestaurantListPage} />
            {/* <Route path="/signup" component={LoginPage}/> */}
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
