import { Card } from "react-bootstrap";
import SellerHeader from "../../components/SellerHeader";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

const Offer = ({ location,offer, history }) => {
  const dispatch = useDispatch();

  const sellerLogin = useSelector((state) => state.sellerLogin);
  const { sellerInfo } = sellerLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/seller/superadmindashboard";

  useEffect(() => {
    if (!sellerInfo) {
      history.push("/login");
    }
  }, [dispatch, history, sellerInfo]);

  useEffect(() => {
    if (sellerInfo.isAdmin && sellerInfo.isAdmin === true ) {
      history.push(redirect); //if you are an admin
    }
  }, [history, sellerInfo, redirect]);
console.log(sellerInfo)
 

  return (
    <>
      <SellerHeader />
      <Card
        className="my-3 p-3 rounded"
        style={{ width: "65rem", margin: "auto" }}
      >
        <Card.Img src="/images/1.jpg" variant="top" alt="image"/>
        <Card.ImgOverlay>
          <Card.Title>
            <strong>
              <h2 className="landing">Bienvenue dans votre boutique</h2>{" "}
            </strong>
          </Card.Title>
          <Card.Text className="landingText">
          Vous avez fait le premier pas vers le partage de votre travail avec le monde !
             Grattez quelques autres choses de votre liste de choses à faire et gardez le rythme
             en haut.
          </Card.Text>
          <Card.Text className="landingText">
            <strong>
              <a href={`https://${sellerInfo.shop.slug}.lunacommerce.xyz`} class="landingText">
                {" "}
                Rendez-vous dans votre boutique maintenant
              </a>{" "}
            </strong>
          </Card.Text>
        </Card.ImgOverlay>
      </Card>
    </>
  );
};

export default Offer;
