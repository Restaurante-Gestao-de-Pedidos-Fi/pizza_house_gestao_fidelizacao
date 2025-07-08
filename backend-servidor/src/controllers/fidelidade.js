import { insert, select, update, remove } from "../models/database.js";

export function criar(req, res) {
  try {
    insert({ table: "fidelidade", items: req.body });
    res.status(201).json({ message: "Cardápio criado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export function listar(req, res) {
  try {
    const rows = select("SELECT * FROM fidelidade");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export function atualizar(req, res) {
  try {
    update({
      table: "fidelidade",
      items: req.body,
      where: { id: req.params.id }
    });
    res.json({ message: "Fidelidade atualizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export function remover(req, res) {
  try {
    remove({
      table: "fidelidade",
      where: { id: req.params.id }
    });
    res.json({ message: "Fidelidade removido com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}