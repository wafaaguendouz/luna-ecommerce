import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  getSellerDetails,
  updateSellerProfile,
} from "../../actions/sellerActions";
import { listMyOrders } from "../../actions/orderActions";
import SellerHeader from "../../components/SellerHeader";
import { Container } from "react-bootstrap";

const SellerProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const sellerDetails = useSelector((state) => state.sellerDetails);
  const { loading, error, seller } = sellerDetails;
  const sellerLogin = useSelector((state) => state.sellerLogin);
  const { sellerInfo } = sellerLogin;

  const sellerUpdateProfile = useSelector((state) => state.sellerUpdateProfile);
  const { success } = sellerUpdateProfile;

  useEffect(() => {
    if (!sellerInfo) {
      history.push("/login");
    } else {
      if (!sellerInfo.name) {
        dispatch(getSellerDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(sellerInfo.name);
        setEmail(sellerInfo.email);
      }
    }
  }, [dispatch, history, sellerInfo, seller]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateSellerProfile({ id: sellerInfo._id, name, email, password })
      );
    }
  };

  return (
    <>
      <SellerHeader />
      <main className="py-3">
        <Container>
          <Row>
            <Col md={8}>
              <h2>Profil du vendeur</h2>
              {message && <Message variant="danger">{message}</Message>}
              {error && <Message variant="danger">{error}</Message>}
              {success && <Message variant="success">Mise à jour du profil réussie</Message>}
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
                Mettre à jour
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
};

export default SellerProfileScreen;
