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
		<div className="d-flex align-items-center bg-primary">
        <span className="ms-4 logo-name"> ProdFlow </span>
        <div className="cm-header-logo-separator bg-blue-gray-700 my-0 ms-4 d-block"></div>
			<Navbar expand="lg" >
      <Container className="ms-2">
          <Nav className="me-auto nav-item" >
            <Nav.Link className="fw-semibold navbar-item" as={Link} to="/">Home</Nav.Link>
            <NavDropdown className="fw-semibold" title="Customers" id="basic-nav-dropdown">
              <NavDropdown.Item className="dropdown" as={Link} to="/PostCustomer">Add a customer</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/customer-details">All customers</NavDropdown.Item>
              
            </NavDropdown>
            <NavDropdown className="fw-semibold" title="Orders" id="basic-nav-dropdown">
            <NavDropdown.Item className="dropdown" as={Link} to="/PostOrders">
                Add a order
              </NavDropdown.Item>
              <NavDropdown.Item href="/GetOrders">
              All Orders
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
      </Container>
    </Navbar>
    </div>
	);
}
export default Vamshi;






