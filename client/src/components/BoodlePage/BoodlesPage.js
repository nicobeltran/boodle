import React, { Component } from 'react'
import axios from 'axios';
import Constants from '../../constants';
import { withRouter } from "react-router";
import BoodleHeader from './BoodleHeader'
import BoodleList from './BoodleList'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class BoodlesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boodleList: []
        }
    }

    componentDidMount() {
        let userId = this.props.location.state.user.user_id

        axios.get(Constants.BASE_URL + Constants.RESTAURANT_LIST_URL + userId)
            .then(res => {
                if (res.status === 200) {
                    this.setState( {boodleList: res.data.restaurant_lists})
                }
            })
            .catch((error) => {
                if (error.response) {
                    // Request made and server responded
                    if (error.response.status === 400) {
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
        const user = this.props.location.state.user
        return (
        <div >
            <BoodleHeader name={user.first_name + " " + user.last_name}/>
            <Container fluid>
                <Row>
                    <Col md={3}>
                    </Col>
                    <Col>
                        <h1 className="BoodlesListTitle">My Boodles</h1>
                    </Col>
                    <Col md={3}>
                    </Col>
                </Row>
                <Row noGutters={true}>
                    <Col md={3}>
                    </Col>
                    <Col>
                        <BoodleList boodleList={this.state.boodleList}/>
                    </Col>
                    <Col md={3}>
                    </Col>
                </Row>
            </Container>
        </div>  
        )
    }
}

export default withRouter(BoodlesPage);
