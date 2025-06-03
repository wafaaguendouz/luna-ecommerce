import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { register } from "../../actions/sellerActions";
import SellerHeader from "../../components/SellerHeader";
import { Container } from "react-bootstrap";

const SellerRegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [shop, setShop] = useState("");
  const [offer, setOffer] = useState("5-products");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const sellerRegister = useSelector((state) => state.sellerRegister);
  const { loading, error, sellerInfo } = sellerRegister;

  const redirect = "/seller";

  useEffect(() => {
    if (sellerInfo) {
      history.push(redirect);
    }
  }, [history, sellerInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      //check is passwords match
      setMessage("Passwords do not match");
    } else {
      dispatch(register({ name, email, shop, password, offer }));
    }
  };

  return (
    <>
      <SellerHeader />
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

              <Form.Group controlId="shop">
                <Form.Label>Nom de la boutique</Form.Label>
                <Form.Control
                  type="shop"
                  placeholder="Entrez le nom de la boutique"
                  value={shop}
                  onChange={(e) => setShop(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="offer">
                <Form.Label>Offre</Form.Label>
                <Form.Control
                  type="offer"
                  placeholder="Entrez le type d'offre"
                  value={offer}
                  onChange={(e) => setOffer(e.target.value)}
                  as="select"
                >
                  <option value="5-products">5 produits</option>
                  <option value="50-products">50 produits</option>
                  <option value="250-products">250 produits</option>
                  <option value="500-products">500 produits</option>
                </Form.Control>
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
              Vous avez déjà un compte?{" "}
                <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                Connexion
                </Link>
              </Col>
            </Row>
          </FormContainer>
        </Container>
      </main>
    </>
  );
};

export default SellerRegisterScreen;
