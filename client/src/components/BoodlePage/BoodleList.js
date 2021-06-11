import React, { Component } from 'react'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { withRouter } from "react-router";
import BoodleListItem from './BoodleListItem'
import './BoodlesPage.css'

class BoodleList extends Component {
    render() {
        const boodleListItems = this.props.boodleList.map((boodle) => {
            return <BoodleListItem  boodle={boodle} key={boodle.restaurant_list_id}/>
        })

        return (
        <Container fluid>
            {boodleListItems}
        </Container>
        )
    }
}

export default withRouter(BoodleList);
