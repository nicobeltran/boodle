import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './BoodlesPage.css'
import { withRouter } from 'react-router';


class BoodleListItem extends Component {

    handleBoodleListItemClick = (event) => {
        const user = this.props.location.state.user
        const boodle = this.props.boodle

        this.props.history.push({
            pathname: `boodle/${boodle.restaurant_list_id}`,
            state: { user, boodle }})

    }

    render() {
        const boodle = this.props.boodle
        // todo: need to change how this data is coming through from database, doesn't make sense to have the data come through as first_name last_name 
        const madeByName = `${boodle.first_name} ${boodle.last_name}`
        const dateCreated = new Date(boodle.created_on)
        const dateCreatedFormatted = `${dateCreated.getMonth()}/${dateCreated.getDay()}/${dateCreated.getFullYear()}`
        
        return (
            <Col className="BoodlesListItem" onClick={this.handleBoodleListItemClick}>
                <Row>
                    <Col>
                        <h2>{boodle.list_name}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div>Made by {madeByName}</div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div>Created {dateCreatedFormatted}</div>
                    </Col>
                </Row>
            </Col>
        )
    }
}

export default withRouter(BoodleListItem);