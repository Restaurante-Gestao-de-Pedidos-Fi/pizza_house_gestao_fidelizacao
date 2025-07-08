import React, { useState } from "react";
import { Button, Modal, Form, Table } from "react-bootstrap";

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [pedidoAtual, setPedidoAtual] = useState({
    cliente: "",
    mesa: "",
    itens: "",
    total: 0,
  });
  const [editandoId, setEditandoId] = useState(null);

  const handleShow = (pedido = null) => {
    if (pedido) {
      setPedidoAtual(pedido);
      setEditandoId(pedido.id);
    } else {
      setPedidoAtual({ cliente: "", mesa: "", itens: "", total: 0 });
      setEditandoId(null);
    }
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setPedidoAtual({ cliente: "", mesa: "", itens: "", total: 0 });
    setEditandoId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPedidoAtual((prev) => ({
      ...prev,
      [name]: name === "total" ? parseFloat(value) : value,
    }));
  };

  const handleSave = () => {
    if (editandoId !== null) {
      const atualizados = pedidos.map((p) =>
        p.id === editandoId ? { ...pedidoAtual, id: editandoId } : p
      );
      setPedidos(atualizados);
    } else {
      const novo = { ...pedidoAtual, id: Date.now() };
      setPedidos([...pedidos, novo]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    const confirm = window.confirm("Deseja excluir este pedido?");
    if (confirm) {
      setPedidos(pedidos.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-danger text-center mb-4">Pedidos</h2>

      <div className="text-center mb-4">
        <Button variant="success" onClick={() => handleShow()}>
          + Novo Pedido
        </Button>
      </div>

      {pedidos.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Mesa</th>
              <th>Cliente</th>
              <th>Itens</th>
              <th>Total</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.mesa}</td>
                <td>{pedido.cliente}</td>
                <td>{pedido.itens}</td>
                <td>R$ {pedido.total.toFixed(2)}</td>
                <td>
                  <Button
                    size="sm"
                    variant="primary"
                    className="me-2"
                    onClick={() => handleShow(pedido)}
                  >
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(pedido.id)}
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
          Nenhum pedido cadastrado ainda.
        </p>
      )}

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editandoId !== null ? "Editar Pedido" : "Novo Pedido"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Mesa</Form.Label>
              <Form.Control
                type="text"
                name="mesa"
                value={pedidoAtual.mesa}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cliente</Form.Label>
              <Form.Control
                type="text"
                name="cliente"
                value={pedidoAtual.cliente}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Itens</Form.Label>
              <Form.Control
                as="textarea"
                name="itens"
                rows={3}
                value={pedidoAtual.itens}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Total (R$)</Form.Label>
              <Form.Control
                type="number"
                name="total"
                value={pedidoAtual.total}
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

export default Pedidos;
