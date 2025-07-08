//import { insert, select, update, remove } from "../models/database.js";
import { openDb } from "../database/db.js";

export async function criarCliente(req, res) {
  try {
    
    const { nome, email, telefone } = req.body;
    const sql = "INSERT INTO clientes (nome, email, telefone) VALUES (?, ?, ?)";

    if (!nome || !email || !telefone) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    } else{
      
      const db = await openDb();
      await db.run(sql, [nome, email, telefone]);

      res.status(201).json({ message: "Cliente criado com sucesso!" });

      console.log("Cliente criado:", { nome, email, telefone });

    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function listarClientes(req, res) {
  try {
    console.log("Listando todos os clientes...");
    
    const db       = await openDb();
    const sql      = "SELECT * FROM clientes";
    const clientes = await db.all(sql);

    res.json(clientes);
  
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function atualizarCliente(req, res) {
  try {
    const { nome, email, telefone } = req.body;
    const id  = req.params.id;
    const sql = "UPDATE clientes SET nome=?, email=?, telefone=? WHERE id=?";
    const db  = await openDb();

    await db.run(sql,[nome, email, telefone, id]);
    
    res.json({ message: "Cliente atualizado com sucesso!" });
    
    console.log("Cliente atualizado:", { id,nome, email, telefone });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function removerCliente(req, res) {
  try {
    const id  = req.params.id;
    const db  = await openDb();
    const sql = "DELETE FROM clientes WHERE id = ?";

    await db.run(sql, [id]);
    
    res.json({ message: "Cliente removido com sucesso!" });

    console.log(`Cliente com ID ${id} removido com sucesso.`);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function buscarCliente(req, res) {
  try {
    const id  = req.params.id;
    const db  = await openDb();
    const sql = "SELECT * FROM clientes WHERE id = ?";
    
    const cliente = await db.get(sql, [id]);

    if (!cliente) {
      return res.status(404).json({ error: "Cliente não encontrado." });
    }

    res.json(cliente);
    console.log("Cliente encontrado:", cliente);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}