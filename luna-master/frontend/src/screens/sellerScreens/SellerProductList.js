import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Card } from "react-bootstrap";

import {
  listProductsByShop,
  deleteProduct,
  createProduct,
} from "../../actions/productActions";
import SellerHeader from "../../components/SellerHeader";
import { Container } from "react-bootstrap";
import { PRODUCT_CREATE_RESET } from "../../constants/productConstants";

const SellerProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const sellerLogin = useSelector((state) => state.sellerLogin);
  const { sellerInfo } = sellerLogin;
  const shop = sellerInfo.shop.slug;
  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!sellerInfo) {
      history.push("/login");
    }
    if (successCreate) {
      history.push(`/seller/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProductsByShop(shop));
    }
  }, [
    dispatch,
    history,
    sellerInfo,
    successDelete,
    successCreate,
    createdProduct,
    shop,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <SellerHeader />
      <main className="py-3">
        <Container>
          {!products.length ? (
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
                        <h2 className="orders">Aucun produit à afficher</h2>{" "}
                      </strong>
                    </Card.Title>
                    <Card.Text className="ordersText">
                    Vous en créez un maintenant !{" "}
                    </Card.Text>
                    <Button className="my-3" onClick={createProductHandler}>
                      <i className="fas fa-plus"></i> Créer un produit
                    </Button>
                  </Card.ImgOverlay>
                </Card>
              </Col>
            </Row>
          ) : (
            <>
              <Row className="align-items-center">
                <Col>
                  <h1>Produits</h1>
                </Col>
                <Col className="text-right">
                  <Button className="my-3" onClick={createProductHandler}>
                    <i className="fas fa-plus"></i> Créer un produit
                  </Button>
                </Col>
              </Row>
              {loadingDelete && <Loader />}
              {errorDelete && <Message>{errorDelete}</Message>}
              {loadingCreate && <Loader />}
              {errorCreate && <Message>{errorCreate}</Message>}
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
                      <th>PRIX</th>
                      <th>CATEGORIE</th>
                      <th>MARQUE</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}da</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>
                          <LinkContainer
                            to={`/seller/product/${product._id}/edit`}
                          >
                            <Button variant="light" className="btn-sm">
                              <i className="fas fa-edit"></i>
                            </Button>
                          </LinkContainer>
                          <Button
                            variant="danger"
                            className="btn-sm"
                            onClick={() => deleteHandler(product._id)}
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

export default SellerProductListScreen;
