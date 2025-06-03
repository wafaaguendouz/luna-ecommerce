import React, { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";
import Header from "../components/Header";
import { Container } from "react-bootstrap";

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      history.push(`/shipping`);
    }
  }, [shippingAddress, history]);

  const [paymentMethod, setPaymentMethod] = useState("CIB");

  //useState(shippingAddress.address)

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push(`/placeorder`);
  };

  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Mode de paiement</h1>
            <Form onSubmit={submitHandler}>
              <Form.Group>
                <Form.Label as="legend">Sélectionnez une méthode</Form.Label>

                <Col>
                  <Form.Check
                    type="radio"
                    label="CIB"
                    id="CIB"
                    name="paymentMethod"
                    value="CIB"
                    checked={"CIB" === paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></Form.Check>

                  <Form.Check
                    type="radio"
                    label="EDAHABIA"
                    id="EDAHABIA"
                    name="paymentMethod"
                    value="EDAHABIA"
                    checked={"EDAHABIA" === paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></Form.Check>

                  <Form.Check
                    type="radio"
                    label="Paiement a la livraison"
                    id="paymentalalivraison"
                    name="paymentMethod"
                    value="paymentalalivraison"
                    checked={"paymentalalivraison" === paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></Form.Check>
                </Col>
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

export default PaymentScreen;
