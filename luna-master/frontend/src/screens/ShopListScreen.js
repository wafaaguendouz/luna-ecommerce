import React, { useEffect } from "react";
import { Table, Row, Col } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listShops} from "../actions/shopActions";
import SuperAdminHeader from "../components/SuperAdminHeader";
import { Container } from "react-bootstrap";
import { Card } from "react-bootstrap";

const SellerListScreen = ({ history }) => {
  const dispatch = useDispatch();


  const sellerList = useSelector((state) => state.sellerList);
  const { sellers } = sellerList;

  const shopList = useSelector((state) => state.shopList);
  const { loading, error, shops } = shopList;

  const sellerLogin = useSelector((state) => state.sellerLogin);
  const { sellerInfo } = sellerLogin;


  useEffect(() => {
    if (sellerInfo) {
      dispatch(listShops());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, sellerInfo]);


  return (
    <>
      <SuperAdminHeader />
      <main className="py-3">
        <Container>
          {!shops.length ? (
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
                        <h2 className="orders">Aucune boutique à afficher</h2>{" "}
                      </strong>
                    </Card.Title>
                  </Card.ImgOverlay>
                </Card>
              </Col>
            </Row>
          ) : (
            <>
              <h1>All Shops</h1>
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant="danger">{error}</Message>
              ) : (
                <Table striped bordered hover responsive className="table-sm">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>NOM</th>
                      <th>SLUG</th>
                      <th>OFFRE</th>
                      <th>VENDEUR</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    { shops.map((shop) => (
                      <tr key={shop._id}>
                        <td>{shop._id}</td>
                        <td>{shop.name}</td>
                        <td>{shop.slug}</td>
                        <td>{shop.offer}</td>
                        <td>{shop.seller}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </>
          )}
        </Container>
      </main>
    </>
  );
};

export default SellerListScreen;
