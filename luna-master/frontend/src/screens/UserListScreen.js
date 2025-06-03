import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listUsers, deleteUser } from "../actions/userActions";
import SellerHeader from "../components/SellerHeader";
import { Container } from "react-bootstrap";
import { Card } from "react-bootstrap";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const sellerLogin = useSelector((state) => state.sellerLogin);
  const { sellerInfo } = sellerLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (sellerInfo) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, sellerInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Êtes-vous sûr")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <SellerHeader />
      <main className="py-3">
        <Container>
          {!users.length ? (
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
                        <h2 className="orders">Aucun utilisateur à afficher</h2>{" "}
                      </strong>
                    </Card.Title>
                  </Card.ImgOverlay>
                </Card>
              </Col>
            </Row>
          ) : (
            <>
              <h1>Utilisateurs</h1>
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
                      <th>EMAIL</th>
                      <th>ADMIN</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>
                          <a href={`mailto:${user.email}`}>{user.email}</a>
                        </td>
                        <td>
                          <LinkContainer to={`/seller/user/${user._id}/edit`}>
                            <Button variant="light" className="btn-sm">
                              <i className="fas fa-edit"></i>
                            </Button>
                          </LinkContainer>
                          <Button
                            variant="danger"
                            className="btn-sm"
                            onClick={() => deleteHandler(user._id)}
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

export default UserListScreen;
