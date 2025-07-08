import { useState, useEffect } from "react";

const FormularioItem = ({ cancel, createItem, updateItem, targetItem }) => {
  const [updating, setUpdating] = useState(false);

  const criarItem = async () => {
    const form = document.querySelector("form");

    if (await createItem(form)) {
      alert("Item criado com sucesso!");
      cancel();
    } else {
      alert("Erro ao criar item no cardápio");
    }
  };

  const atualizarItem = async () => {
    const form = document.querySelector("form");
    if (await updateItem(targetItem.id, form)) {
      alert("Item atualizado com sucesso!");
      cancel();
    } else {
      alert("Erro ao atualizar no cardápio");
    }
  };

  useEffect(() => {
    if (targetItem.nome != "") setUpdating(true);
    console.log("El componente se ha cargado");
    document.getElementById("nome").value = targetItem.nome
      ? targetItem.nome
      : "";
    document.getElementById("categoria").value = targetItem.categoria
      ? targetItem.categoria
      : "";
    document.getElementById("descricao").value = targetItem.descricao
      ? targetItem.descricao
      : "";
    document.getElementById("preco").value = targetItem.preco
      ? targetItem.preco
      : "";
  }, []);

  return (
    <div className="container">
      <form>
        <div className="mb-3">
          <label htmlFor="imagem" className="form-label">
            Imagem do Item
          </label>
          {targetItem.imagem != null && (
            <img
              src={`http://localhost:3000/api/cardapio/imagem/${targetItem.imagem}`}
              className="rounded float-start img-thumbnail"
              alt={targetItem.nome}
            ></img>
          )}
          <input
            type="file"
            className="form-control"
            id="imagem"
            name="imagem"
            accept="image/*"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">
            Nome do Item
          </label>
          <input type="text" className="form-control" id="nome" name="nome" />
        </div>
        <div className="mb-3">
          <label htmlFor="descricao" className="form-label">
            Descrição
          </label>
          <textarea
            className="form-control"
            id="descricao"
            name="descricao"
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="preco" className="form-label">
            Preço
          </label>
          <input
            type="number"
            className="form-control"
            id="preco"
            name="preco"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="categoria" className="form-label">
            Categoria
          </label>
          <select className="form-select" id="categoria" name="categoria">
            <option value="">Selecione uma categoria</option>
            <option value="bebida">Bebidas</option>
            <option value="pizza">Pizzas</option>
          </select>
        </div>

        {/* <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="disponivel" />
          <label className="form-check-label" htmlFor="disponivel">
            Disponível
          </label>
        </div> */}
        <div className="d-flex gap-2 justify-content-end">
          {updating ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={atualizarItem}
            >
              Atualizar
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={criarItem}
            >
              Enviar
            </button>
          )}

          <button type="button" className="btn btn-danger" onClick={cancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioItem;
