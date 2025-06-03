import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProductsByShop } from "../actions/productActions";
import Header from "../components/Header";
import { Container } from "react-bootstrap";
import { useGetShop } from "../utils";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const shop = useGetShop();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProductsByShop(shop, keyword));
  }, [dispatch, shop, keyword]);

  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <>
            <h1>Derniers produits</h1>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <Row>
                {products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
            )}
          </>
        </Container>
      </main>
    </>
  );
};

export default HomeScreen;
