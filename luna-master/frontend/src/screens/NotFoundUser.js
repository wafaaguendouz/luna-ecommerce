
import {Button,Card  } from "react-bootstrap";
import React from "react";

const NotFoundScreen = ({ location,offer, history }) => {
  const openStoreHandler = () =>{
    history.push(`register?redirect=/seller`);
  }

  return (
    <>
       <Card
        className="my-3 p-3 rounded"
        style={{ width: "65rem", margin: "auto" }}
      >
        <Card.Img src="/images/404.png" variant="top" alt="image" />
        <Card.ImgOverlay>
          <Card.Title>
            <strong>
              <h2 className="store">404 Page non trouvée</h2>{" "}
            </strong>
          </Card.Title>
          <Card.Text className="storeText">
          La page que vous recherchez n'existe plus
          </Card.Text>
          <Card.Text className="storeText">
          <Button
                        type="button"
                        className="btn-block"
                        onClick={openStoreHandler}
                      >
            Accueil
            </Button>
          </Card.Text>
        </Card.ImgOverlay>
      </Card>
    </>
  );
};

export default NotFoundScreen
