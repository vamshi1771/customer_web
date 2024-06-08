import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../App.css';
import { Link } from "react-router-dom";


const Vamshi=()=>
{
	return (
		<div>
			<Navbar  id="innernavbar" expand="lg" >
      <Container>
          <Nav className="me-auto" >
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <NavDropdown title="POST" id="basic-nav-dropdown">
              <NavDropdown.Item className="dropdown" as={Link} to="/PostCustomer">post customer details</NavDropdown.Item>
              <NavDropdown.Item className="dropdown" as={Link} to="/PostOrders">
                Post Orders details
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="GET" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/GetCustomers">GET customer details</NavDropdown.Item>
              <NavDropdown.Item href="/GetOrders">
              GET order details
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
      </Container>
    </Navbar>
    </div>
	);
}
export default Vamshi;






