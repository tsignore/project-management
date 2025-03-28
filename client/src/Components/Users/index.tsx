import { useEffect, useState } from "react";
import {
  Spinner,
  Alert,
  ListGroup,
  ListGroupItem,
  Container,
  Row,
  Col,
  Pagination,
  InputGroup,
  Form,
  Button,
} from "react-bootstrap";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

const Users = () => {
  const [clients, setClients] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const clientsPerPage = 5;

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/clients")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка при получении данных");
        }
        return response.json();
      })
      .then((data) => {
        setClients(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery)
  );

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(
    indexOfFirstClient,
    indexOfLastClient
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Container>
        <Row>
          <Col>
            <Alert variant="danger">
              <strong>Ошибка:</strong> {error}
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center mb-4">Список клиентов</h1>

          <InputGroup className="mb-4">
            <Form.Control
              type="text"
              placeholder="Поиск по имени, email или телефону"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Button
              variant="outline-secondary"
              onClick={() => setSearchQuery("")}
            >
              Очистить
            </Button>
          </InputGroup>

          <ListGroup>
            {currentClients.map((client) => (
              <ListGroupItem key={client.id} className="mb-3 shadow-sm">
                <h5>{client.name}</h5>
                <p>
                  <strong>Email:</strong> {client.email}
                </p>
                <p>
                  <strong>Телефон:</strong> {client.phone}
                </p>
              </ListGroupItem>
            ))}
          </ListGroup>

          <Pagination>
            {[...Array(Math.ceil(filteredClients.length / clientsPerPage))].map(
              (_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              )
            )}
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default Users;
