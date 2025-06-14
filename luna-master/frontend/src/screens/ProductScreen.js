import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Form,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
} from "react-bootstrap";
import Rating from "../components/Rating";
import {
  listProductsDetails,
  createProductReview,
} from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Header from "../components/Header";
import { Container } from "react-bootstrap";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

const ProductScreen = ({ history, match }) => {
  //const [product,setProduct]  =useState({})
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductsDetails(match.params.id));
  
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;
  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted!");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductsDetails(match.params.id));
  }, [dispatch, match, successProductReview]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <>
            <Link className="btn btn-light my-3" to={`/`}>
              Go Back
            </Link>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <>
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
                            <Col>Statut :</Col>
                            <Col>
                              {product.countInStock > 0
                                ? "En Stock"
                                : "En Rupture De Stock"}
                            </Col>
                          </Row>
                        </ListGroup.Item>

                        {product.countInStock > 0 && (
                          <ListGroup.Item>
                            <Row>
                              <Col>Qté</Col>
                              <Col>
                                <Form.Control
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

                        <ListGroup.Item>
                          <Button
                            onClick={addToCartHandler}
                            className="btn-block"
                            type="button"
                            disabled={product.countInStock === 0}
                          >
                            Ajouter au panier
                          </Button>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <h2>Commentaires</h2>

                    {product.reviews.length === 0 && (
                      <Message>Aucun avis</Message>
                    )}
                    <ListGroup variant="flush">
                      {product.reviews.map((review) => (
                        <ListGroup.Item key={review._id}>
                          <strong>{review.name}</strong>
                          <Rating value={review.rating} />
                          <p>{review.createdAt.substring(0, 10)}</p>
                          <p>{review.comment}</p>
                        </ListGroup.Item>
                      ))}
                      <ListGroup.Item>
                        <h2>Écrire un avis client</h2>

                        {errorProductReview && (
                          <Message variant="danger">
                            {errorProductReview}
                          </Message>
                        )}

                        {userInfo ? (
                          <Form onSubmit={submitHandler}>
                            <Form.Group controlId="rating">
                              <Form.Label>Notation</Form.Label>
                              <Form.Control
                                as="select"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                              >
                                <option value="">Select...</option>
                                <option value="1">1 - Faible</option>
                                <option value="2">2 - Passable</option>
                                <option value="3">3 - Bien</option>
                                <option value="4">4 - Très bien</option>
                                <option value="5">5 - Excellent</option>
                              </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="comment">
                              <Form.Label>Commentaire</Form.Label>
                              <Form.Control
                                as="textarea"
                                row="3"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                              ></Form.Control>
                            </Form.Group>
                            <Button type="submit" variant="primary">
                            Soumettre
                            </Button>
                          </Form>
                        ) : (
                          <Message>
                            Please <Link to={`/login`}>Connectez-vous </Link>pour écrire un avis{" "}
                          </Message>
                        )}
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
              </>
            )}
          </>
        </Container>
      </main>
    </>
  );
};

export default ProductScreen;
