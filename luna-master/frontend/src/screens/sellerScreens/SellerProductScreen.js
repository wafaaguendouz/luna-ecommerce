import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Row, Col, Image, ListGroup, Card } from "react-bootstrap";
import Rating from "../../components/Rating";
import { listProductsDetails } from "../../actions/productActions";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import SellerHeader from "../../components/SellerHeader";
import { Container } from "react-bootstrap";

const SellerProductScreen = ({ history, match }) => {
  //const [product,setProduct]  =useState({})
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductsDetails(match.params.id));
  }, [dispatch, match]);

  return (
    <>
      <SellerHeader />
      <main className="py-3">
        <Container>
          <>
            <Link className="btn btn-light my-3" to="/">
            Retourner
            </Link>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <Row>
                <Col md={6}>
                  <Image src={product.image} alt={product.name} fluid />
                </Col>

                <Col md={3}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h3>{product.name}</h3>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} Commentaires`}
                      />
                    </ListGroup.Item>

                    <ListGroup.Item>Prix: {product.price}da</ListGroup.Item>

                    <ListGroup.Item>
                      Description: {product.description}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>

                <Col md={3}>
                  <Card>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col>Prix:</Col>

                          <Col>
                            <strong>{product.price}da</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                          <Col>Statut:</Col>

                          <Col>
                            {product.countInStock > 0
                              ? "En Stock"
                              : "En rupture de stock"}
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      {product.countInStock > 0 && (
                        <ListGroup.Item>
                          <Row>
                            <Col>Qté</Col>
                            <Col>
                              <Form.Control
                                style={{ padding: " .75rem 1rem" }}
                                as="select"
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                              >
                                {[...Array(product.countInStock).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                )}
                              </Form.Control>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )}
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
            )}
          </>
        </Container>
      </main>
    </>
  );
};

export default SellerProductScreen;
