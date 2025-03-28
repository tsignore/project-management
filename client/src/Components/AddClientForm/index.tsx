import { useState } from "react";
import { Button, Form, Container, Row, Col, Alert } from "react-bootstrap";

const AddClientForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newClient = { name, email, phone };

    fetch("http://127.0.0.1:8000/api/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newClient),
    })
      .then((response) => response.json())
      .then(() => {
        // Handle success (например, обновить список клиентов)
      })
      .catch(() => {
        setError("Ошибка при добавлении клиента");
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Добавить нового клиента</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Имя</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Введите email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Телефон</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите телефон"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Добавить
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddClientForm;
