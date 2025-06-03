import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Container,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { useGetShop } from "../utils";
import SearchBox from "./SearchBox";
import { Route } from "react-router-dom";

const Header = () => {
  const shop = useGetShop();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin); //bringing userLogin
  const { userInfo } = userLogin; //bringing userInfo from the userLogin

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="light" variant="light" expand="lg" CollabseOnSelect>
        <Container>
          <LinkContainer to={`/`}>
            <Navbar.Brand>{shop} Shop</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to={`/cart`}>
                <Nav.Link>Panier </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to={`/profile`}>
                    <NavDropdown.Item>Profil</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                  Se déconnecter
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to={`/login`}>
                  <Nav.Link>
                    <i className="fas fa-user"></i> Se Connecter
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>

            <Route render={({ history }) => <SearchBox history={history} />} />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
