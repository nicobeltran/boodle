import {
  Link
} from "react-router-dom";
import React, { Component } from 'react'
import { withRouter } from "react-router";

class HomePage extends Component {
  render() {
    return (
      <div>
        <h1>Boodle</h1>
        <Link to="/login"><button>Log In</button></Link>
        <button>Sign Up</button>
      </div>
    )
  }
}

export default withRouter(HomePage);
