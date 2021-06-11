import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './BoodlesPage.css'
import { withRouter } from 'react-router';


class RestaurantListItem extends Component {
    render() {        
        return (
            <Col className="BoodleRestaurantItem" >
                <Row>
                    <Col>
                        <h2>{this.props.restaurant.restaurant_name}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col className="CuisineText">
                        {this.props.restaurant.cuisines.join(', ')}
                    </Col>
                </Row>
            </Col>
        )
    }
}

export default withRouter(RestaurantListItem);