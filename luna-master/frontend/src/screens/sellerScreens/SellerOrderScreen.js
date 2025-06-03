import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import SellerHeader from "../../components/SellerHeader";
import {
  getSellerOrderDetails,
  deliverOrder,
  payOrder,
} from "../../actions/orderActions";
import { Container } from "react-bootstrap";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../../constants/orderConstants";

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { success: successDeliver } = orderDeliver;

  const sellerLogin = useSelector((state) => state.sellerLogin);
  const { sellerInfo } = sellerLogin;

  if (!loading && !!order) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getSellerOrderDetails(orderId));
    }
  }, [dispatch, orderId, successPay, successDeliver, order]);

  const payHandler = () => {
    dispatch(payOrder(order));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <SellerHeader />
      <main className="py-3">
        <Container>
          <>
            <h1>Commande {order._id}</h1>
            <Row>
              <Col md={8}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Livraison</h2>
                    <p>
                      <strong>Nom: </strong> {order.user.name}
                    </p>
                    <p>
                      <strong>Email: </strong>{" "}
                      <a href={`mailto:${order.user.email}`}>
                        {order.user.email}
                      </a>
                    </p>
                    <p>
                      <strong>Addresse:</strong>
                      {order.shippingAddress.address},{" "}
                      {order.shippingAddress.city}{" "}
                      {order.shippingAddress.postalCode},{" "}
                      {order.shippingAddress.country}
                    </p>
                    {order.isDelivered ? (
                      <Message variant="success">
                        Livré le {order.deliveredAt}
                      </Message>
                    ) : (
                      <Message variant="danger">Non livré</Message>
                    )}
                  </ListGroup.Item>
                  {loading && <Loader />}
                  {sellerInfo && !order.isPaid && (
                    <ListGroup.Item>
                      <Button
                        type="button"
                        className="btn btn-block"
                        onClick={deliverHandler}
                      >
                        {" "}
                        Marquer comme livré
                      </Button>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <h2>Mode de paiement</h2>
                    <p>
                      <strong>Méthode: </strong>
                      {order.paymentMethod}
                    </p>
                    {order.isPaid ? (
                      <Message variant="success">
                       Payé le {order.paidAt}
                      </Message>
                    ) : (
                      <Message variant="danger">Impayé</Message>
                    )}
                  </ListGroup.Item>
                  {loading && <Loader />}
                  {sellerInfo && !order.isPaid && (
                    <ListGroup.Item>
                      <Button
                        type="button"
                        className="btn btn-block"
                        onClick={payHandler}
                      >
                        {" "}
                        Marquer comme payé
                      </Button>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <h2>Articles commandés</h2>
                    {order.orderItems.length === 0 ? (
                      <Message>La commande est vide</Message>
                    ) : (
                      <ListGroup variant="flush">
                        {order.orderItems.map((item, index) => (
                          <ListGroup.Item key={index}>
                            <Row>
                              <Col md={1}>
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fluid
                                  rounded
                                />
                              </Col>
                              <Col>
                                <Link to={`/product/${item.product}`}>
                                  {item.name}
                                </Link>
                              </Col>
                              <Col md={4}>
                                {item.qty} x {item.price}da = 
                                {item.qty * item.price}da
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={4}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h2>Récapitulatif de la commande</h2>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Articles</Col>
                        <Col>{order.itemsPrice}da</Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Livraison</Col>
                        <Col>{order.shippingPrice}da</Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Tax</Col>
                        <Col>{order.taxPrice}da</Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Total</Col>
                        <Col>{order.totalPrice}da</Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </>
        </Container>
      </main>
    </>
  );
};

export default OrderScreen;
