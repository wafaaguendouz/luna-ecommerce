import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const Offer = ({ offer }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`register?redirect=/seller`}>
        <Card.Img src={offer.image} variant="top" alt="offre" />
      </Link>

      <Card.Body>
        <Link to={`register?redirect=/seller`}>
          <Card.Title as="div">
            <strong>{offer.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="h2">{offer.price}</Card.Text>
        <Card.Text>{offer.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Offer;
