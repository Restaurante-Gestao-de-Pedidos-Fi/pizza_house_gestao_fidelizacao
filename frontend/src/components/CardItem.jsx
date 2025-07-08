import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

const CardItem = ({ item, onDelete, showModalUpdate }) => {
  const handleDelete = () => {
    if (window.confirm("Tem certeza que deseja excluir este item?")) {
      onDelete(item.id);
    }
  };

  const handleUpdate = () => {
    showModalUpdate(item);
  };

  return (
    <>
      <Card className="shadow" style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={`http://localhost:3000/api/cardapio/imagem/${item.imagem}`}
          style={{ height: "200px" }}
        />
        <Card.Body>
          <Card.Title>{item.nome}</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>{item.descricao}</ListGroup.Item>
            <ListGroup.Item>
              <strong>Preço: </strong>
              {item.preco.toFixed(2)} R$
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Categoria: </strong> {item.categoria}
            </ListGroup.Item>
          </ListGroup>
          <div className="d-flex justify-content-between mt-2">
            <Button className="btn-danger shadow" onClick={handleDelete}>
              Excluir
            </Button>
            <Button className="shadow" onClick={handleUpdate}>
              Atualizar
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default CardItem;
