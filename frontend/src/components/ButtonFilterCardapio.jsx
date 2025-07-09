import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { useState } from "react";
import item from "../api/item";

function ButtonFilterCardapio({ setItens }) {
  const [categoriaValue, setCategoriaValue] = useState("todos");
  const categorias = [
    { name: "Todos", value: "todos" },
    { name: "Bebidas", value: "bebida" },
    { name: "Pizzas", value: "pizza" },
  ];

  const handleFilterCategory = async (e) => {
    const categoria = e.currentTarget.value;
    setCategoriaValue(categoria);

    if (categoria == "todos") {
      const allItens = await item.getAll();
      setItens(allItens);
    } else {
      const itensFiltered = await item.getByCategory(categoria);
      setItens(itensFiltered);
    }
  };

  return (
    <>
      <ButtonGroup>
        {categorias.map((categoria, idx) => (
          <ToggleButton
            key={idx}
            id={`categoria-${idx}`}
            type="radio"
            variant={idx % 2 ? "outline-success" : "outline-danger"}
            name="radio"
            value={categoria.value}
            checked={categoriaValue === categoria.value}
            onChange={handleFilterCategory}
          >
            {categoria.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </>
  );
}

export default ButtonFilterCardapio;
