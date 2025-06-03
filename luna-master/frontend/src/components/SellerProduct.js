import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/seller/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" alt="image"/>
      </Link>

      <Card.Body>
        <Link to={`/seller/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} Commentaires`}
          />
        </Card.Text>

        <Card.Text as="h3">{product.price}da</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
