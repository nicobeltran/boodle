import './App.css';
import HomePage from './components/HomePage/HomePage'
import LoginPage from './components/Login/LoginPage';
import BoodlesPage from './components/BoodlePage/BoodlesPage';
import BoodleDetailsPage from './components/BoodlePage/BoodleDetailsPage';

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

            <Route path="/boodle/:id" component={BoodleDetailsPage}/>
            <Route path="/boodles" component={BoodlesPage}/>

            {/* Fall back route */}
            <Route exact path="/" component={HomePage} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
