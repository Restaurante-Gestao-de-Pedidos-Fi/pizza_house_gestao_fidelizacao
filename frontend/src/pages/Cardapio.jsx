import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import ModalItemForm from "../components/ModalItemForm";
import CardItem from "../components/CardItem";
import ButtonFilterCardapio from "../components/ButtonFilterCardapio";
import item from "../api/item";

const Cardapio = () => {
  const [showModalForm, setShowModalForm] = useState(false);
  const [itens, setItens] = useState([]);
  const [targetItem, setTargetItem] = useState({});

  const handleShowModalForm = () => {
    setShowModalForm(true);
    setTargetItem({
      nome: "",
      descricao: "",
      preco: "",
      categoria: "",
    });
  };

  const createItem = async (data) => {
    const isAdded = await item.add(data);
    fetchItens();
    return isAdded;
  };

  const updateItem = async (id, data) => {
    const isUpdated = await item.update(id, data);
    fetchItens();
    return isUpdated;
  };

  const deleteItem = async (id) => {
    await item.delete(id);
    fetchItens();
  };

  const handleShowModalUpdate = (item) => {
    console.log(item);
    setTargetItem(item);
    setShowModalForm(true);
  };

  const fetchItens = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/cardapio");
      if (!response.ok) {
        throw new Error("Erro ao buscar itens do cardápio");
      }
      const data = await response.json();
      setItens(data);
    } catch (error) {
      console.error("Erro ao buscar itens:", error);
    }
  };

  useEffect(() => {
    console.log("El componente se ha cargado");
    fetchItens();
  }, []);
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between">
        <div>
          <h1>
            <i class="bi bi-fork-knife"></i> Cardápio
          </h1>
        </div>
        <ButtonFilterCardapio setItens={setItens} />
        <div>
          <Button
            variant="outline"
            className="btn-outline-warning shadow"
            onClick={handleShowModalForm}
          >
            Novo Item <i class="bi bi-plus-circle"></i>
          </Button>
        </div>
      </div>

      <ModalItemForm
        show={showModalForm}
        setShow={setShowModalForm}
        title={"Formulário do Item"}
        addItem={createItem}
        updateItem={updateItem}
        targetItem={targetItem}
      />

      <p className="mt-3">Itens do Cardápio:</p>
      {itens.length != 0 && (
        <div className="row mt-4">
          {itens.map((item) => (
            <div className="col-md-4 mb-4" key={item.id}>
              <CardItem
                item={item}
                onDelete={deleteItem}
                showModalUpdate={handleShowModalUpdate}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cardapio;
