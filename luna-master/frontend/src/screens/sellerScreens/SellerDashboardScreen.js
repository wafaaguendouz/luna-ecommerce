import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { listOrders } from "../../actions/orderActions";
import { listUsers } from "../../actions/userActions";

import SellerHeader from "../../components/SellerHeader";
import { Container } from "react-bootstrap";
import "../../App.js";

const SellerDashboardScreen = ({ location, history }) => {
  const dispatch = useDispatch();

  const sellerLogin = useSelector((state) => state.sellerLogin);
  const { sellerInfo } = sellerLogin;

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userList = useSelector((state) => state.userList);
  const { userLoading, userError, users } = userList;

  useEffect(() => {
    if (sellerInfo) {
      dispatch(listOrders());
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, sellerInfo]);

  return (
    <>
      <SellerHeader />
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
                        <strong>Commandes = {orders.length}</strong>
                      </Card.Title>
                    </Link>
                    <Card.Text as="h3">Commandes</Card.Text>
                  </Card.Body>
                </Card>
              )}
            </Col>

            <Col md={4}>
              {loading ? (
                <Loader />
              ) : (
                <Card className="my-3 p-3 rounded">
                  <Link to={"/seller/orderlist"}>
                    <Card.Img src={"/images/wallet.png"} variant="top" alt="image"/>
                  </Link>

                  <Card.Body>
                    <Link to={"/seller/orderlist"}>
                      <Card.Title as="div">
                        <strong>
                        Revenu ={" "}
                          {orders.reduce(
                            (totals, order) => totals + order.totalPrice,
                            0
                          )}{" "}
                          DA
                        </strong>
                      </Card.Title>
                    </Link>
                    <Card.Text as="h3">Revenu</Card.Text>
                  </Card.Body>
                </Card>
              )}
            </Col>

            <Col md={4}>
              {userLoading ? (
                <Loader />
              ) : userError ? (
                <Message variant="danger">{userError}</Message>
              ) : (
                <Card className="my-3 p-3 rounded">
                  <Link to={"/seller/userlist"}>
                    <Card.Img src={"/images/users.png"} variant="top" alt="utilisateurs" />
                  </Link>
                  <Card.Body>
                    <Link to={"/seller/userlist"}>
                      <Card.Title as="div">
                        <strong>utilisateurs = {users.length}</strong>
                      </Card.Title>
                    </Link>
                    <Card.Text as="h3">utilisateurs</Card.Text>
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
                    <Card.Img src={"/images/stat.jpg"} variant="top" alt="Traffic"/>
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

export default SellerDashboardScreen;
