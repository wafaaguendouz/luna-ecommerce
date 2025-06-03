import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { login } from "../../actions/sellerActions";
import SellerHeader from "../../components/SellerHeader";
import { Container } from "react-bootstrap";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const sellerLogin = useSelector((state) => state.sellerLogin);

  const { loading, error, sellerInfo } = sellerLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/seller";

  useEffect(() => {
    if (sellerInfo) {
      history.push(redirect); //if you are already logged in
    }
  }, [history, sellerInfo, redirect]);


 
  const submitHandler = (e) => {
    e.preventDefault(); //dispatch login
    dispatch(login(email, password)); //email,paswwword from the form
  };

  return (
    <>
      <SellerHeader />
      <main className="py-3">
        <Container>
          <FormContainer>
            <h1>S'identifier</h1>

            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}

            <Form onSubmit={submitHandler}>
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

              <Button type="submit" variant="primary">
              Se Connecter
              </Button>
            </Form>

            <Row className="py-3">
              <Col>
              Nouveau client?{" "}
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : "/register"}
                >
                  S'inscrire maintenant
                </Link>
              </Col>
            </Row>
          </FormContainer>
        </Container>
      </main>
    </>
  );
};

export default LoginScreen;
