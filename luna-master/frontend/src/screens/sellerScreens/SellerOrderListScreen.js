import React, { useEffect } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Card } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { listOrders } from "../../actions/orderActions";

import SellerHeader from "../../components/SellerHeader";
import { Container } from "react-bootstrap";

const SellerOrderScreen = ({ location, history }) => {
  const dispatch = useDispatch();

  const sellerLogin = useSelector((state) => state.sellerLogin);
  const { sellerInfo } = sellerLogin;

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  useEffect(() => {
    if (sellerInfo) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, sellerInfo]);

  return (
    <>
      <SellerHeader />
      <main className="py-3">
        <Container>
          {!orders.length ? (
            <Row>
              <Col md={12}>
                <Card
                  className="my-3 p-3 rounded orders"
                  style={{ width: "50rem", margin: "auto" }}
                >
                  <Card.Img src="/images/no.jpg" variant="top" alt="image"/>
                  <Card.ImgOverlay>
                    <Card.Title>
                      <strong>
                        <h2 className="orders">Aucune commande à afficher</h2>{" "}
                      </strong>
                    </Card.Title>
                  </Card.ImgOverlay>
                </Card>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col md={12}>
                <h2>Commandes</h2>
                {loading ? (
                  <Loader />
                ) : error ? (
                  <Message variant="danger">{error}</Message>
                ) : (
                  <Table striped bordered haver responsive className="table-sm">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>UTILISATEUR</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAYÉ</th>
                        <th>LIVRÉ</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>{order.user && order.user.name}</td>
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
                            <LinkContainer to={`/seller/orders/${order._id}`}>
                              <Button className="btn-sm" variant="light">
                                Details
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
          )}{" "}
        </Container>
      </main>
    </>
  );
};

export default SellerOrderScreen;
