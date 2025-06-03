import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listOrders } from "../actions/orderActions";
import { listSellers } from "../actions/sellerActions";
import { listShops } from "../actions/shopActions";

import SuperAdminHeader from "../components/SuperAdminHeader";
import { Container } from "react-bootstrap";
import "../App.js";

const SuperAdminScreen = ({ location, history }) => {
  const dispatch = useDispatch();

  const sellerLogin = useSelector((state) => state.sellerLogin);
  const { sellerInfo } = sellerLogin;

  const orderList = useSelector((state) => state.orderList);
  const { loading, error} = orderList;

  const sellerList = useSelector((state) => state.sellerList);
  const { sellerLoading, sellerError, sellers } = sellerList;
  
  const shopList = useSelector((state) => state.shopList);
  const {shops } = shopList;
  console.log(shops)
  const sellerNumbers = sellers.length - 1;
  useEffect(() => {
    if (sellerInfo) {
      dispatch(listOrders());
      dispatch(listSellers());
      dispatch(listShops());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, sellerInfo]);

  return (
    <>
      <SuperAdminHeader/>
      <main className="py-3">
        <Container>
          <h2>Dashboard</h2>

          <Row>

            <Col md={4}>
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant="danger">{error}</Message>
              ) : (
                <Card className="my-3 p-3 rounded">
                  <Link to={"/seller/orderlist"}>
                    <Card.Img src={"/images/order.jpg"} variant="top" alt="image"/>
                  </Link>

                  <Card.Body>
                    <Link to={"/seller/orderlist"}>
                      <Card.Title as="div">
                        <strong>magasins = {shops.length}</strong>
                      </Card.Title>
                    </Link>
                    <Card.Text as="h3">magasins</Card.Text>
                  </Card.Body>
                </Card>
              )}
            </Col>

            <Col md={4}>
              {sellerLoading ? (
                <Loader />
              ) : sellerError ? (
                <Message variant="danger">{sellerError}</Message>
              ) : (
                <Card className="my-3 p-3 rounded">
                  <Link to={"/seller/userlist"}>
                    <Card.Img src={"/images/users.png"} variant="top" alt="image"/>
                  </Link>
                  <Card.Body>
                    <Link to={"/seller/userlist"}>
                      <Card.Title as="div">
                        <strong>les vendeurs = {sellers.length}</strong>
                      </Card.Title>
                    </Link>
                    <Card.Text as="h3">les vendeurs</Card.Text>
                  </Card.Body>
                </Card>
              )}
            </Col>

            <Col md={4}>
              {sellerLoading ? (
                <Loader />
              ) : sellerError ? (
                <Message variant="danger">{sellerError}</Message>
              ) : (
                <Card className="my-3 p-3 rounded">
                  <Link to={"/seller/userlist"}>
                    <Card.Img src={"/images/messages.png"} variant="top" alt="image"/>
                  </Link>
                  <Card.Body>
                    <Link to={"/seller/userlist"}>
                      <Card.Title as="div">
                        <strong>messages = {sellerNumbers}</strong>
                      </Card.Title>
                    </Link>
                    <Card.Text as="h3">Messages</Card.Text>
                  </Card.Body>
                </Card>
              )}
            </Col>

            <Col md={12}>
              {loading ? (
                <Loader />
              ) : (
                <Card className="my-3 p-3 rounded">
                  <Link to={"/seller/orderlist"}>
                    <Card.Img src={"/images/stat.jpg"} variant="top" alt="image"/>
                  </Link>

                  <Card.Body>
                    <Link to={"/seller/orderlist"}>
                      <Card.Title as="div">
                        <strong>0</strong>
                      </Card.Title>
                    </Link>
                    <Card.Text as="h3">Trafic du site Web</Card.Text>
                  </Card.Body>
                </Card>
              )}
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
};

export default SuperAdminScreen;
