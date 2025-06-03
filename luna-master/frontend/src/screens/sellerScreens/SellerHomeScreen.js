import React from "react";
import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import {Button, Row, Col } from "react-bootstrap";
import Offer from "../../components/Offer";
import SellerHeader from "../../components/SellerHeader";
import { Container } from "react-bootstrap";

const HomeScreen = ({ history }) => {

  const { sellerInfo } = useSelector((state) => state.sellerLogin); //bringing sellerLogin
  if (sellerInfo?.token) {
    history.push("/seller");
  }
const openStoreHandler = () =>{
  history.push(`register?redirect=/seller`);
}

  const offers = [
    {
      name: "5 Produits",
      image: "/images/5.jpg",
      description:
      " Une image par produit Thèmes personnalisables gratuits Vendez en ligne et en personne Statistiques en temps réel Utiliser un domaine personnalisé Offrir des remises et lancer des promotions Suivi des expéditions Groupes d'options de produits Pilote automatique de taxe de vente",
      price: "Free",
    },

    {
      name: "50 Produits",
      image: "/images/50.jpg",
      description:
      "Pas de frais d'inscription, Cinq images par produit ,Thèmes personnalisables gratuits,Vendez en ligne et en personne,Statistiques en temps réel,Utiliser un domaine personnalisé, Édition de code de thème, Google Analytics, Suivi des stocks,Offrez des remises et lancez des promotions,Suivi des expéditions,Groupes d'options de produits, Pilote automatique de taxe de vente",
      price: "1000DA",
    },

    { name: "250 Produits",
    image: "/images/250.jpg",
    description:
    " Une image par produit Thèmes personnalisables gratuits Vendez en ligne et en personne Statistiques en temps réel Utiliser un domaine personnalisé Offrir des remises et lancer des promotions Suivi des expéditions Groupes d'options de produits Pilote automatique de taxe de vente",
    price: "2000DA",
    },
    {name: "500 Produits",
    image: "/images/500.jpg",
    description:
    " Une image par produit Thèmes personnalisables gratuits Vendez en ligne et en personne Statistiques en temps réel Utiliser un domaine personnalisé Offrir des remises et lancer des promotions Suivi des expéditions Groupes d'options de produits Pilote automatique de taxe de vente",
    price: "3000DA",
    },
  ];
  return (
    <>
      <SellerHeader />
      <main className="py-3">
        <Container>
          <>
          <Card
        className="my-3 p-3 rounded"
        style={{ width: "65rem", margin: "auto" }}
      >
        <Card.Img src="/images/stor.jpg" variant="top" alt="image" />
        <Card.ImgOverlay>
          <Card.Title>
            <strong>
              <h2 className="store">Boutiques en ligne faciles pour les entreprises </h2>{" "}
            </strong>
          </Card.Title>
          <Card.Text className="storeText">
          Nous simplifions la création d'une boutique en ligne unique, la vente de votre travail et la gestion d'une entreprise créative.
          </Card.Text>
          <Card.Text className="storeText">
          <Button
                        type="button"
                        className="btn-block"
                        onClick={openStoreHandler}
                      >
            Ouvrez votre boutique maintenant! 
            </Button>
          </Card.Text>
        </Card.ImgOverlay>
      </Card>
            <Row>
              {offers.map((offer) => (
                <Col key={offer._id} sm={8} md={4} lg={3} xl={3}>
                  <Offer offer={offer} />
                </Col>
              ))}
            </Row>
          </>
        </Container>
      </main>
    </>
  );
};

export default HomeScreen;
