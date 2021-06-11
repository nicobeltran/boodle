import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './BoodlesPage.css'


class BoodleHeader extends Component {
    render() {
        return (
            <Container fluid className="DashboardHeader">
                <Row>
                    <Col md={8}>
                        <h1 className="DashboardHeaderTitle">Boodle</h1>
                    </Col>
                    <Col className="DashboardDropdownButton" md={4}>
                        <DropdownButton id="dropdown-basic-button" title={this.props.name} variant="success">
                            <Dropdown.Item href="#/action-1">Settings</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Log out</Dropdown.Item>
                        </DropdownButton>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default BoodleHeader;