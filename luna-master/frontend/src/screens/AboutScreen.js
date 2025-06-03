import { Card } from "react-bootstrap";
import SellerHeader from "../components/SellerHeader";
import React from "react";



const Offer = ({ location,offer, history }) => {

  return (
    <>
      <SellerHeader />
      <Card
        className="my-3 p-3 rounded"
        style={{ width: "65rem", margin: "auto" }}
      >
        <Card.Img src="/images/aboutus.jpg" variant="top" alt="image"/>
        <Card.ImgOverlay>
          <Card.Title>
            <strong>
              <h2 className="landing">À propos de nous</h2>{" "}
            </strong>
          </Card.Title>
          <Card.Text className="landingText">
          Nous sommes une petite équipe soudée qui s'efforce de rendre Luna autonomisant et facile à utiliser. Certains d'entre nous gèrent leurs propres magasins Luna, d'autres sont musiciens, illustrateurs et cinéastes. Nous avons travaillé dur pour bâtir une entreprise où nous faisons de grandes choses. Nous sommes là pour vous aider à faire de même.
          </Card.Text>
        </Card.ImgOverlay>
      </Card>
    </>
  );
};

export default Offer;
