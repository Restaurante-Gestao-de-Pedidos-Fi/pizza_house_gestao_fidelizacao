import React, { useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { mesasData as initialMesas } from "../api/Mesadata";

const Mesas = () => {
  const [mesas, setMesas] = useState(initialMesas);
  const [showModal, setShowModal] = useState(false);
  const [mesaEditando, setMesaEditando] = useState(null);
  const [formData, setFormData] = useState({ status: "disponível", valor: 0 });

  const handleClose = () => {
    setShowModal(false);
    setMesaEditando(null);
    setFormData({ status: "disponível", valor: 0 });
  };

  const handleShow = (mesa) => {
    setMesaEditando(mesa);
    setFormData({ status: mesa.status, valor: mesa.valor });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "valor" ? parseFloat(value) : value,
    }));
  };

  const handleSave = () => {
    const novasMesas = mesas.map((m) =>
      m.id === mesaEditando.id ? { ...m, ...formData } : m
    );
    setMesas(novasMesas);
    handleClose();
  };

  const getBgClass = (status) => {
    switch (status) {
      case "disponível":
        return "bg-success bg-opacity-25 border-success  text-success fw-bold rounded";
      case "ocupada":
        return "bg-danger bg-opacity-25 border-danger text-danger fw-bold";
      case "reservada":
      default:
        return "bg-warning bg-opacity-25 border-warning text-warning fw-bold";
    }
  };

  return (
    <div
      className="container py-5"
      bg="gradient"
      style={{ background: " #ffffff" }}
      expand="lg"
    >
      <h2
        className="text-center text-danger mb-4"
        style={{ background: " #ffffff", fontFamily: "ChunkFive Print" }}
      >
        Mesas do Restaurante
      </h2>
      <div className="row g-4">
        {mesas.map((mesa) => (
          <div className="col-md-4 " key={mesa.id}>
            <Card
              className={`text-center border-radio ${getBgClass(mesa.status)}`}
              onClick={() => handleShow(mesa)}
              style={{ cursor: "pointer" }}
            >
              <Card.Body>
                <Card.Title>
                  <strong>Mesa</strong>
                  {mesa.id}
                </Card.Title>
                <Card.Text>{mesa.status}</Card.Text>
                <Card.Text>R$ {mesa.valor.toFixed(2)}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Modal de Edição */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Mesa {mesaEditando?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="disponível">disponível</option>
                <option value="ocupada">ocupada</option>
                <option value="reservada">reservada</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Valor</Form.Label>
              <Form.Control
                type="number"
                name="valor"
                value={formData.valor}
                onChange={handleChange}
                min={0}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Mesas;
