import React, { Component } from 'react'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { withRouter } from "react-router";
import RestaurantListItem from './RestaurantListItem'
import './BoodlesPage.css'

class RestaurantList extends Component {

    
    render() {
        const restaurantListItems = this.props.restaurants.map((restaurant) => {
            return <RestaurantListItem  restaurant={restaurant} key={restaurant.restaurant_id}/>
        })

        return (
        <Container fluid>
            {restaurantListItems}
        </Container>
        )
    }
}

export default withRouter(RestaurantList);
