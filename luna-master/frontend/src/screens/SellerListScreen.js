import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listSellers, deleteSeller } from "../actions/sellerActions";
import SuperAdminHeader from "../components/SuperAdminHeader";
import { Container } from "react-bootstrap";
import { Card } from "react-bootstrap";

const SellerListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const sellerList = useSelector((state) => state.sellerList);
  const { loading, error, sellers } = sellerList;

  const sellerLogin = useSelector((state) => state.sellerLogin);
  const { sellerInfo } = sellerLogin;

  const sellerDelete = useSelector((state) => state.sellerDelete);
  const { success: successDelete } = sellerDelete;

  useEffect(() => {
    if (sellerInfo) {
      dispatch(listSellers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, sellerInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteSeller(id));
    }
  };

  return (
    <>
      <SuperAdminHeader />
      <main className="py-3">
        <Container>
          {!sellers.length ? (
            <Row>
              <Col md={12}>
                <Card
                  className="my-3 p-3 rounded orders"
                  style={{ width: "50rem", margin: "auto" }}
                >
                  <Card.Img src="/images/no.jpg" variant="top" alt="image" />
                  <Card.ImgOverlay>
                    <Card.Title>
                      <strong>
                        <h2 className="orders">Aucun vendeur à afficher</h2>{" "}
                      </strong>
                    </Card.Title>
                  </Card.ImgOverlay>
                </Card>
              </Col>
            </Row>
          ) : (
            <>
              <h1>Vendeurs</h1>
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
                      <th>EMAIL</th>
                      <th>ADMIN</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {sellers.map((seller) => (
                      <tr key={seller._id}>
                        <td>{seller._id}</td>
                        <td>{seller.name}</td>
                        <td>
                          <a href={`mailto:${seller.email}`}>{seller.email}</a>
                        </td>
                        <td>
                          <LinkContainer to={`/seller/seller/${seller._id}/edit`}>
                            <Button variant="light" className="btn-sm">
                              <i className="fas fa-edit"></i>
                            </Button>
                          </LinkContainer>
                          <Button
                            variant="danger"
                            className="btn-sm"
                            onClick={() => deleteHandler(seller._id)}
                          >
                            <i className="fas fa-trash"></i>
                          </Button>
                        </td>
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
