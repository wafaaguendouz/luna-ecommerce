import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useGetShop } from "../utils";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";
import Header from "../components/Header";
import { Container } from "react-bootstrap";

const RegisterScreen = ({ location, history }) => {
  const shop = useGetShop();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      //check is passwords match
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password, shop));
    }
  };

  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <FormContainer>
            <h1>S'inscrire</h1>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Entrez le nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Adresse e-mail</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Entrez l'e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Entrer le mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirmez le mot de passe</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirmez le mot de passe"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type="submit" variant="primary">
              S'inscrire
              </Button>
            </Form>

            <Row className="py-3">
              <Col>
              Vous avez déjà un compte?
                <Link to={`/login`}>Connexion</Link>
              </Col>
            </Row>
          </FormContainer>
        </Container>
      </main>
    </>
  );
};

export default RegisterScreen;
