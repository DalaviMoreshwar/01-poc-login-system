import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Navigate, Outlet } from "react-router-dom";
import { isLoggedUser } from "../../utils/browserDB";
import Logout from "./../auth/Logout";

const PrivateRoutes = () => {
  const loggedUser = isLoggedUser();
  return loggedUser.isAuthenticated ? (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/home">POC-01</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
          </Nav>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <strong>{loggedUser.user.shortId}</strong>
            </Navbar.Text>
            <Navbar.Text>
              <Logout />
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Outlet />
      </Container>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
