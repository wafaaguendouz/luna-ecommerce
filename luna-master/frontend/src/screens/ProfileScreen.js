import React, { useState, useEffect } from "react";
import { Form, Table, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import Header from "../components/Header";
import { Container } from "react-bootstrap";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push(`/login`);
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Row>
            <Col md={3}>
              <h2>Profil de l'utilisateur</h2>
              {message && <Message variant="danger">{message}</Message>}
              {error && <Message variant="danger">{error}</Message>}
              {success && <Message variant="success">Mise à jour du profil réussie</Message>}
              {loading && <Loader />}

              <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                  <Form.Label>NOM</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Entrez le nom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label>Email Address</Form.Label>
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
            <Col md={9}>
              <h2>Mes Commandes</h2>
              {loadingOrders ? (
                <Loader />
              ) : errorOrders ? (
                <Message variant="danger">{errorOrders}</Message>
              ) : (
                <Table striped bordered haver responsive className="table-sm">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>DATE</th>
                      <th>TOTALE</th>
                      <th>PAYE</th>
                      <th>LIVRE</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>{order.totalPrice}</td>
                        <td>
                          {order.isPaid ? (
                            order.paidAt.substring(0, 10)
                          ) : (
                            <i
                              className="fas fa-times"
                              style={{ color: "red" }}
                            ></i>
                          )}
                        </td>
                        <td>
                          {order.isDelivered ? (
                            order.deliveredAt.substring(0, 10)
                          ) : (
                            <i
                              className="fas fa-times"
                              style={{ color: "red" }}
                            ></i>
                          )}
                        </td>
                        <td>
                          <LinkContainer to={`/orders/${order._id}`}>
                            <Button className="btn-sm" variant="light">
                              Détails
                            </Button>
                          </LinkContainer>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
};

export default ProfileScreen;
