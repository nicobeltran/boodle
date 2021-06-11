import React, { Component } from 'react'
import axios from 'axios';
import Constants from '../../constants';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import BoodleHeader from './BoodleHeader'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import RestaurantList from './RestaurantList'
import { FaArrowLeft } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';

class BoodleDetailsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
            searchBarInput: ""
        }
    }

    componentDidMount() {
        let restaurantListId = this.props.location.state.boodle.restaurant_list_id

        axios.get(Constants.BASE_URL + Constants.RESTAURANTS_URL + `list/${restaurantListId}`)
            .then(res => {
                if (res.status === 200) {
                    this.setState( {restaurants: res.data.restaurants})
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

    handleSearchBarInputChange = (event) => {
        this.setState({
            searchBarInput: event.target.value,
        })
    }

    getRestaurants = () => {
        return this.state.restaurants.filter( restaurant => restaurant.restaurant_name.toLowerCase().includes(this.state.searchBarInput.toLowerCase()))
    }

    render() {
        const user = this.props.location.state.user
        const boodleDetails = this.props.location.state.boodle

        return (
        <div>
            <BoodleHeader name={user.first_name + " " + user.last_name}/>
            <Container fluid>

                <Row noGutters={true}>
                    <Col md={3}></Col>
                    {/* text decoration color not working in class */}
                    <Link style={{textDecorationColor: '#2BBF78'}} className="LinkBackButton" to={{pathname: "/boodles", state: { user: this.props.location.state.user } }} >
                        <Col>
                            <div className="BackButtonText"><FaArrowLeft className="BackButtonArrow"/> Back to Boodles</div>
                        </Col>
                    </Link>
                    <Col md={3}></Col>
                </Row>
                
                <Row noGutters={true}>
                    <Col md={3}>
                    </Col>

                    {/* Boodle title */}
                    <Col>
                        <h1 className="BoodleTitle">{boodleDetails.list_name}</h1>
                    </Col>

                    {/* Search */}
                    <Col>
                        <Button variant="success" className="AddRestaurantButton" title="Add New Restaurant">
                            <FaPlus className="AddRestaurantIcon"/>
                        </Button>
                    </Col>
                    <Col md={3}>
                    </Col>
                </Row>

                <Row noGutters={true}>
                    <Col md={3}>
                        <div>
                            <input id="restaurantSearchBar" type="text" className="RestaurantSearchBarInput" placeholder="Search..." value={this.state.searchBarInput} onChange={this.handleSearchBarInputChange}/>
                        </div>
                    </Col>

                    <Col >
                        <RestaurantList restaurants={this.getRestaurants()}/>
                    </Col>
                    <Col md={3}></Col>
                </Row>
            </Container>
        </div>  
        )
    }
}

export default withRouter(BoodleDetailsPage);
