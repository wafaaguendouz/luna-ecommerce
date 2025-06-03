import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/sellerActions";
import { useHistory } from "react-router-dom";

const SuperAdminScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sellerLogin = useSelector((state) => state.sellerLogin); //bringing sellerLogin
  const { sellerInfo } = sellerLogin; //bringing sellerInfo from the sellerLogin
  const redirect = "/";
  const logoutHandler = () => {
    dispatch(logout());
    history.push(redirect);
  };
  return (
    <header>
      <Navbar bg="light" variant="light" expand="lg" CollabseOnSelect>
        <Container>
          {!sellerInfo ? (
            <>
              <LinkContainer to="/">
                <Navbar.Brand>Luna shops</Navbar.Brand>
              </LinkContainer>
              <LinkContainer to="/about">
                <Nav.Link>
                  <i className="fas fa-seller"></i> About
                </Nav.Link>
              </LinkContainer>
            </>
          ) : (
            <LinkContainer to="/seller/superadmindashboard">
            <Nav.Link>Home</Nav.Link>
            </LinkContainer>
          )}

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {sellerInfo && (
                <>
                  <LinkContainer to="/seller/sellerlist">
                    <Nav.Link>Vendeurs</Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/seller/shoplist">
                    <Nav.Link>Magasins</Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/seller/messages">
                    <Nav.Link>Messages</Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/seller/superadmindashboard">
                    <Nav.Link>Tableau de bord</Nav.Link>
                  </LinkContainer>
                </>
              )}

              {sellerInfo ? (
                <NavDropdown title={sellerInfo.name} id="sellername">
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Container>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <i className="fas fa-seller"></i> Se Connecter
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register?redirect=/seller">
                    <Nav.Link>
                      <i className="fas fa-seller"></i> S'inscrire
                    </Nav.Link>
                  </LinkContainer>
                </Container>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default SuperAdminScreen;
