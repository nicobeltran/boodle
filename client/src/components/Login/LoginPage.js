import React, { Component } from 'react'
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import './LoginPage.css'
import axios from 'axios';
import Constants from '../../constants';
import { withRouter } from "react-router";

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            showInvalidLoginAlert: false
        }

    }

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value,
        })
    }

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value,
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const userPayload = {
            email: this.state.email,
            password: this.state.password
        };

        axios.post(Constants.BASE_URL + Constants.USERS_URL + Constants.USERS_AUTHENTICATE_URL, userPayload)
            .then(res => {
                try {
                    if (res.status === 200) {
                        const user = res.data.user
                        this.props.history.push({
                            pathname: "/boodles",
                            state: { user }})
                        // navigate to boodle list dashboard
                    }
                }
                catch (error) {
                    
                }
            })
            .catch((error) => {
                if (error.response) {
                    // Request made and server responded
                    if (error.response.status === 400) {
                        this.setState({ showInvalidLoginAlert: true})
                    };
                  } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                  } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                  }
            })
    }

    render() {
        return (
            <Form className="LoginPage" onSubmit={this.handleSubmit}>
                <h1>Login to Boodle</h1>
                <Form.Group controlId="formGridEmail">
                    <Row>
                        <Col />
                        <Col md={2}>
                            <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={this.handleEmailChange} />
                        </Col>
                        <Col />
                    </Row>
                </Form.Group>

                <Form.Group controlId="formGridPassword">
                    <Row>
                        <Col />
                        <Col md={2}>
                            <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} />
                        </Col>
                        <Col />
                    </Row>
                </Form.Group>

                <Row>
                    <Col></Col>
                    <Col md={2}>
                        <Alert key={0} variant="danger" show={this.state.showInvalidLoginAlert}>
                            Invalid login
                        </Alert>
                    </Col>
                    <Col></Col>
                </Row>

                <Row>
                    <Col>
                        <Button variant="success" type="submit">
                            Submit
                        </Button>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        {/* <Link to="/signup">Sign up for Boodle</Link> */}
                    </Col>
                </Row>

                

            </Form>
        )
    }
}

export default withRouter(LoginPage);
