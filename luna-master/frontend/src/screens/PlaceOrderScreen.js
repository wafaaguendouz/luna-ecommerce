import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";
import Header from "../components/Header";
import { Container } from "react-bootstrap";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 1000 ? 0 : 200);
  cart.taxPrice = addDecimals(Number((0.01 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/orders/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
              <Col md={8}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Livraison</h2>
                    <p>
                      <strong>Addresse:</strong>
                      {cart.shippingAddress.address},{" "}
                      {cart.shippingAddress.city}{" "}
                      {cart.shippingAddress.postalCode},{" "}
                      {cart.shippingAddress.country},
                      {cart.shippingAddress.phoneNumber}
                    </p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <h2>Mode de paiement</h2>
                    <strong>Méthode: </strong>
                    {cart.paymentMethod}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <h2>Articles commandés</h2>
                    {cart.cartItems.length === 0 ? (
                      <Message>Votre panier est vide</Message>
                    ) : (
                      <ListGroup variant="flush">
                        {cart.cartItems.map((item, index) => (
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
                        <Col>{cart.itemsPrice}da</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Livraison</Col>
                        <Col>{cart.shippingPrice}da</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Tax</Col>
                        <Col>{cart.taxPrice}da</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Totale</Col>
                        <Col>{cart.totalPrice}da</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {error && <Message variant="danger">{error}</Message>}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Button
                        type="button"
                        className="btn-block"
                        disabled={cart.cartItems === 0}
                        onClick={placeOrderHandler}
                      >
                        Passer la commande
                      </Button>
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

export default PlaceOrderScreen;
