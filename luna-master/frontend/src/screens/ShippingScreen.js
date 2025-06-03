import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../actions/cartActions";
import Header from "../components/Header";
import { Container } from "react-bootstrap";

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ address, city, postalCode, country, phoneNumber })
    );
    history.push(`/payment`);
  };

  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Livraison</h1>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="address">
                <Form.Label>Adresse</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entrer l'adresse"
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="city">
                <Form.Label>Ville</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entrez la ville"
                  value={city}
                  required
                  onChange={(e) => setCity(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="postalCode">
                <Form.Label>Code Postal</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entrez le code postal"
                  value={postalCode}
                  required
                  onChange={(e) => setPostalCode(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="Pays">
                <Form.Label> Country </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entrez le pays"
                  value={country}
                  required
                  onChange={(e) => setCountry(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="phoneNumber">
                <Form.Label>Numéro de téléphone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entrez le numéro de téléphone"
                  value={phoneNumber}
                  required
                  onChange={(e) => setPhoneNumber(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type="submit" variant="primary">
              Continuer
              </Button>
            </Form>
          </FormContainer>
        </Container>
      </main>
    </>
  );
};
export default ShippingScreen;
