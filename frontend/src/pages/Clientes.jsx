import React, { useState } from "react";
import { Button, Modal, Form, Table } from "react-bootstrap";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [clienteAtual, setClienteAtual] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    cpf: "",
  });
  const [editandoId, setEditandoId] = useState(null);

  const handleShow = (cliente = null) => {
    if (cliente) {
      setClienteAtual(cliente);
      setEditandoId(cliente.id);
    } else {
      setClienteAtual({ nome: "", sobrenome: "", email: "", cpf: "" });
      setEditandoId(null);
    }
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setClienteAtual({ nome: "", sobrenome: "", email: "", cpf: "" });
    setEditandoId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClienteAtual((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (editandoId !== null) {
      const atualizados = clientes.map((c) =>
        c.id === editandoId ? { ...clienteAtual, id: editandoId } : c
      );
      setClientes(atualizados);
    } else {
      const novo = { ...clienteAtual, id: Date.now() };
      setClientes([...clientes, novo]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    const confirm = window.confirm("Deseja excluir este cliente?");
    if (confirm) {
      setClientes(clientes.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-danger text-center mb-4">Cadastro de Clientes</h2>

      <div className="text-center mb-4">
        <Button variant="success" onClick={() => handleShow()}>
          + Novo Cliente
        </Button>
      </div>

      {clientes.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Sobrenome</th>
              <th>Email</th>
              <th>CPF</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.nome}</td>
                <td>{cliente.sobrenome}</td>
                <td>{cliente.email}</td>
                <td>{cliente.cpf}</td>
                <td>
                  <Button
                    size="sm"
                    variant="primary"
                    className="me-2"
                    onClick={() => handleShow(cliente)}
                  >
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(cliente.id)}
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-center text-muted">
          Nenhum cliente cadastrado ainda.
        </p>
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editandoId !== null ? "Editar Cliente" : "Novo Cliente"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={clienteAtual.nome}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Sobrenome</Form.Label>
              <Form.Control
                type="text"
                name="sobrenome"
                value={clienteAtual.sobrenome}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={clienteAtual.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>CPF</Form.Label>
              <Form.Control
                type="text"
                name="cpf"
                value={clienteAtual.cpf}
                onChange={handleChange}
                placeholder="000.000.000-00"
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

export default Clientes;
