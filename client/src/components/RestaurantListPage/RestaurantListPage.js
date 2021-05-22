import React, { Component } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Constants from '../../constants';
import { withRouter } from "react-router";

class RestaurantListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
        }

    }

    componentDidMount() {
        this.setState( { user: this.props.location.state.user})
    }

    render() {
        return (
        <div>
            <h1>Restaurant Lists</h1>
        </div>
        )
    }
}

export default withRouter(RestaurantListPage);
